import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import AgendarColumn from './AgendarColumn';
import HourMark from './HourMark';
import { day } from '../data/agendarData';
import CalendarClass from '@pack/calendar/core/Calendar';

const calendarClass = new CalendarClass();
calendarClass.initCalendar();

interface Props {
  // Define your props here
}

const AgendarNew: React.FC<Props> = () => {
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);

  const [data, setData] = useState<ItemData[]>([]);

  useEffect(() => {
    const generatedData = [];

    for (let i = 0; i < 20; i++) {
      generatedData.push({
        id: Math.random().toString(12).substring(0),
        title: 'lun',
        value: i,
        isActive: false,
      });
    }

    setData(generatedData);
  }, []);

  const getItem = (_data: unknown, index: number): ItemData => ({
    id: _data[index].id,
    title: _data[index].title,
    value: _data[index].value,
    isActive: _data[index].value,
  });

  const getItemCount = (_data: unknown) => _data.length;

  const renderHeaderItem = ({ item, index }: { item: ItemData; index: number }) => (
    <AgendarColumn
      index={index}
      data={item}
      width={70}
      height={40}
      isHeader={true}
    />
  );

  const renderBodyItem = ({ item, index }: { item: ItemData; index: number }) => (
    <AgendarColumn
      index={index}
      data={item}
      width={70}
      height={40}
      isHeader={false}
    />
  );

  const keyExtractor = (item: ItemData) => item.id;

  const scrollX = useRef(new Animated.Value(0)).current;

  const ListViewabilityConfig = {
    minimumViewTime: 0,
    itemVisiblePercentThreshold: 60,
  };

  const onVisibleChangedHandler = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems[0] === undefined) return;
  };

  return (
    <View style={style.agendarContainer}>
      <View style={style.agendarHeader}>
        <View style={style.agendarHeaderOneDay}></View>
        <View style={style.agendarHeaderDays}>
          <VirtualizedList
            data={data}
            initialNumToRender={4}
            renderItem={renderHeaderItem}
            keyExtractor={keyExtractor}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal
            onViewableItemsChanged={onVisibleChangedHandler}
            viewabilityConfig={ListViewabilityConfig}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <ScrollView>
        <View style={style.agendarBody}>
          <View style={style.agendarBodyLateral}>
            {day.map((item, index) => (
              <Pressable
                key={String(index)}
                style={style.hourCell}
              >
                <Text style={style.hourCellText}>{item.hour}</Text>
              </Pressable>
            ))}
          </View>
          <VirtualizedList
            data={data}
            initialNumToRender={4}
            renderItem={renderBodyItem}
            keyExtractor={keyExtractor}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal
            onViewableItemsChanged={onVisibleChangedHandler}
            viewabilityConfig={ListViewabilityConfig}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AgendarNew;

const styles = ({ colors, size }) =>
  StyleSheet.create({
    agendarContainer: {
      width: size.width,
      height: size.height * 0.8,
      backgroundColor: colors.bg.bg1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    agendarBody: {
      backgroundColor: colors.bg.bg2,
      width: size.width,
      // height: size.height * 0.9,
      flexDirection: 'row',
    },
    agendarBodyLateral: {
      width: size.width * 0.15,
      height: '100%',
      borderRightColor: colors.gray,
      borderRightWidth: size.s1 / 8,
    },
    agendarBodyGuide: {
      width: size.width * 0.85,
      height: '100%',
      backgroundColor: colors.bg.bg1,
      flexDirection: 'row',
    },
    hourCell: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    hourCellText: {
      color: colors.text.primary,
      position: 'absolute',
      bottom: -9,
    },
    agendarHeader: {
      height: size.s100 * 0.8,
      width: size.width,
      backgroundColor: colors.bg.bg2,
      flexDirection: 'row',
