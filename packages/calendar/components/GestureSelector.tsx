import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  Animated,
  GestureDetector,
  Gesture
} from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { selectorTapPositionCalculator } from "./../utils";

interface Props {
  // Define your props here
}

const GestureSelector = (props: Props) => {
  const {
    selectorWidth,
    selectorOffset,
    selectorStart,
    selectorIsPressed,
    selectorHeight,
    selectorHeightStart,
    selectorTopDist,
    cellHeight,
    scrollViewVisibleContentWidth,
    format
  } = props;

  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);

  const animatedSelectorOffset = useRef(new Animated.ValueXY()).current;
  const animatedSelectorHeight = useRef(new Animated.Value(0)).current;
  const [selectorStartValue, setSelectorStartValue] = useState({
    x: selectorStart.x,
    y: selectorStart.y
  });
  const [selectorHeightStartValue, setSelectorHeightStartValue] = useState(
    selectorHeightStart
  );

  const gesture = Gesture.Pan()
    .onBegin(() => {
      selectorIsPressed.value = true;
    })
    .onUpdate(e => {
      const ecart = cellHeight / 4;
      const step = Math.floor((e.translationY + selectorStartValue.y) / ecart);
      const ecartX = selectorWidth;
      const stepX = Math.floor(
        (e.translationX + selectorStartValue.x + ecartX) / ecartX
      );

      const x = selectorTapPositionCalculator({
        tapValue: e.translationX + selectorStartValue.x,
        globSize: scrollViewVisibleContentWidth,
        format: format
      });

      if (
        animatedSelectorOffset.y._value >= 0 &&
        animatedSelectorOffset.y._value <=
          cellHeight * 24 - animatedSelectorHeight._value
      ) {
        animatedSelectorOffset.setValue({
          x: stepX * ecartX,
          y: step * ecart
        });
      } else {
        if (animatedSelectorOffset.y._value < 0) {
          animatedSelectorOffset.setValue({
            x: selectorStartValue.x + selectorWidth,
            y: -step * 10 - animatedSelectorHeight._value
          });
        } else
          animatedSelectorOffset.setValue({
            x: selectorStartValue.x,
            y: cellHeight * 24 - animatedSelectorHeight._value
          });
      }
    })
    .onEnd(() => {
      setSelectorStartValue({
        x: animatedSelectorOffset.x,
        y: animatedSelectorOffset.y
      });
      selectorIsPressed.value = false;
    });

  const pointTopGesture = Gesture.Pan()
    .onBegin(() => {
      selectorTopDist.value =
        selectorStartValue.y + animatedSelectorHeight._value;
    })
    .onUpdate(e => {
      const ecart = cellHeight / 4;
      const step = Math.floor(
        (-e.translationY + selectorHeightStartValue) / ecart
      );

      animatedSelectorHeight.setValue(step * ecart || -e.translationY + selectorHeightStartValue);
      animatedSelectorOffset.setValue({
        x: selectorStartValue.x,
        y: selectorTopDist.value - animatedSelectorHeight._value
      });
    })
    .onEnd(() => {
      setSelectorHeightStartValue(animatedSelectorHeight._value);
      setSelectorStartValue({
        x: animatedSelectorOffset.x,
        y: animatedSelectorOffset.y
      });
    });

  const pointBottomGesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate(e => {
      const ecart = cellHeight / 4;
      const step = Math.floor(
        (e.translationY + selectorHeightStartValue) / ecart
      );

      animatedSelectorHeight.setValue(step * ecart || e.translationY + selectorHeightStartValue);
    })
    .onEnd(() => {
      setSelectorHeightStartValue(animatedSelectorHeight._value);
    });

  useEffect(() => {
    selectorOffset.value = animatedSelectorOffset._value;
  }, [animatedSelectorOffset]);

  useEffect(() => {
    selectorHeight.value = animatedSelectorHeight._value;
  }, [animatedSelectorHeight]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          style.selector(selectorWidth),
          {
            transform: [
              { translateY: animatedSelectorOffset.y },
              { translateX: animatedSelectorOffset.x }
            ],
            height: animatedSelectorHeight,
            backgroundColor:
              selectorIsPressed.value ? colors.blue + "20" : "transparent"
          }
        ]}
        collapsable={false}
      >
        <GestureDetector gesture={pointTopGesture}>
          <AnimatedPressable
            style={style.selectorBtnTop}
          ></AnimatedPressable>
        </GestureDetector>
        <Text style={{color:'white',
                  alignSelf:'center',
                  paddingVertical:50
                }}> GestureSelector</Text>
        <GestureDetector gesture={pointBottomGesture}>
          <AnimatedPressable
            style={style.selectorBtnBottom}
          ></AnimatedPressable>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = ({ colors, size }) =>
  StyleSheet.create({
    selector: width => ({
      position: "absolute",
      // height: 200,
      width:
