import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import { ServicesData } from "../../../data";
import DashBoardSection from "@comp/container/DashBoardSection";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";

interface Props {
  // Define your props here
}

const ServiceContainer = (props: Props) => {
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);
  const { width } = useWindowDimensions();

  return (
    <DashBoardSection title={"Outils"} linkPath="./" linkTitle="Voir plus">
      <FlatList
        data={ServicesData}
        renderItem={({ item, index }) => (
          <ServiceItem data={item} index={index} width={width} />
        )}
        horizontal
        keyExtractor={(_, index) => _.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: size.s3,
          paddingBottom: size.s3,
        }}
      />
    </DashBoardSection>
  );
};

const ServiceItem = React.memo(({ data, index, width }: Props) => {
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);
  const s = useSharedValue(0);
  const scale = useSharedValue(1);
  const animPressableRef = useRef<Animated.Component<any, any>>(null);

  const animStyle = useAnimatedStyle(() => ({
    width: interpolate(s.value, [0, 1], [width * 0.25, width * 0.3]),
    opacity: interpolate(s.value, [0, 1], [0.4, 1]),
    height: interpolate(s.value, [0, 1], [width * 0.3, width * 0.35]),
    transform: [{ scale }],
  }));

  useEffect(() => {
    s.value = withSpring(1, { duration: index * 1000 });
    scale.value = withSpring(1, { duration: index * 1000 });
  }, [index]);

  const handlePressIn = () => {
    s.value = withSpring(0.5, { duration: 500 });
    scale.value = withSpring(1.1, { duration: 500 });
  };

  const handlePressOut = () => {
    s.value = withSpring(1, { duration: 500 });
    scale.value = withSpring(1, { duration: 500 });
  };

  return (
    <AnimPressable
      ref={animPressableRef}
      style={[style.serviceItemConatiner(data.color), animStyle]}
      onPress={() => alert(data.name)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {({ pressed }) => (
        <>
          <View
            style={[
              style.pressableIcon(data.color, data.textColor),
              {
                width: "80%",
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: bg,
                borderRadius: size.s100 * 2,
                borderColor: color,
                borderWidth: size.s1 / 3,
                borderStyle: "solid",
              },
            ]}
          >
            <Image
              source={data.image}
              style={{ width: size.s50, height: size.s50 }}
            />
          </View>

          <Text style={style.serviceText(data.textColor)}>
            {data.name}
          </Text>
        </>
      )}
    </AnimPressable>
  );
});

export default ServiceContainer;

const styles = ({ colors, size }: any) =>
  StyleSheet.create({
    serviceItemConatiner: pressed => ({
      width: size.s100 * 1.3,
      height: size.s100 * 1.3,
      borderRadius: size.s3,
      backgroundColor: "transparent",
      alignItems: "center",
      gap: size.s1,
      marginHorizontal: size.s3,
    }),
    serviceText: color => ({
      fontFamily: "inter",
      fontWeight: "700",
      color,
      fontSize: size.s2 * 1.2,
      textAlign: "center",
    }),
    pressableIcon: (bg, color) => ({
      width: "80%",
      height: "80%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bg,
      borderRadius: 600,
      borderColor: color,
      borderWidth: size.s1 / 3,
      borderStyle: "solid",
    }),
    serviceContainer: {
      width: size.width * 0.9,
      height: size.s100 * 2,
      backgroundColor: colors.white,
      alignSelf: "center",
      paddingVertical: size.s5,
      elevation: size.s1 / 4,
      borderRadius: size.s1,
      marginTop: size.s10,
    },

    serviceHeaderTitle: {
      //  color:colors.black300,
      fontSize: size.s4,
