import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated as ReactNativeAnimated,
  useWindowDimensions,
} from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Animated, {
  useSharedValue,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FoodData, NutrientType } from "./types";

type Props = {
  name: string;
  dbName: string;
  data: FoodData;
  id: number;
};

const FoodItem: React.FC<Props> = ({ name, dbName, data, id }) => {
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  //  Render the Right Action
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, width / 2, width],
      outputRange: [-width, 0, width],
    });

    return (
      <View style={style.rightAction}>
        <Animated.View
          style={[
            style.actionView,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Pressable
            style={style.deleteIcon}
            onPress={() => {
              alert("Delete  this food " + id);
            }}
          >
            <Ionicons
              name="trash"
              size={size.s5}
              color={colors.red300}
            />
          </Pressable>
          <Pressable
            style={style.deleteIcon}
            onPress={() => {
              alert("Copy to edit this food " + id);
            }}
          >
            <Ionicons
              name="copy"
              size={size.s5}
              color={colors.green200}
            />
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: isSelected ? colors.bg.secondary : colors.w,
    };
  });

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      containerStyle={{
        marginVertical: size.s2,
      }}
      childrenContainerStyle={{
        paddingHorizontal: size.s3,
      }}
    >
      <AnimatedPressable
        style={[
          style.foodItemContainer,
          { width: width - size.s6 },
          animatedStyles,
        ]}
        onPress={() => {
          router.navigate({
            pathname: "details/foods/[food_id]",
            params: {
              food_id: id,
            },
          });
        }}
        onLongPress={() => {
          setIsSelected(prev => !prev);
        }}
      >
        <View style={style.foodTextInfo}>
          <Text style={style.foodName}>{name}</Text>
          <Text style={style.foodDbName}>{dbName}</Text>
        </View>
        <View style={style.foodNutritionValue}>
          <View style={style.nutrientContainer}>
            <Text style={style.nutrientLabel(colors.yellow300)}>
              Energy
            </Text>
            <View style={style.nutrientValueConatiner}>
              <Text style={style.nutrientValue}>
                {data.energy.value}
              </Text>
              <Text style={style.nutrientUnit}>
                {data.energy.unit}
              </Text>
            </View>
          </View>
          <View style={style.nutrientContainer}>
            <Text style={style.nutrientLabel(colors.green200)}>
              Carbs
            </Text>
            <View style={style.nutrientValueConatiner}>
              <Text style={style.nutrientValue}>
                {data.carbs.value}
              </Text>
              <Text style={style.nutrientUnit}>
                {data.carbs.unit}
              </Text>
            </View>
          </View>
          <View style={style.nutrientContainer}>
            <Text style={style.nutrientLabel(colors.purple300)}>
              Fats
            </Text>
            <View style={style.nutrientValueConatiner}>
              <Text style={style.nutrientValue}>
                {data.fats.value}
              </Text>
              <Text style={style.nutrientUnit}>
                {data.fats.unit}
              </Text>
            </View>
          </View>
          <View style={style.nutrientContainer}>
            <Text style={style.nutrientLabel(colors.red300)}>
              Proteins
            </Text>
            <View style={style.nutrientValueConatiner}>
              <Text style={style.nutrientValue}>
                {data.proteins.value}
              </Text>
              <Text style={style.nutrientUnit}>
                {data.proteins.unit}
              </Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
      <AnimatedPressable
        style={style.addBtn}
        onPress={() => alert("add food " + id)}
      >
        <Ionicons
          name={"add-circle-outline"}
          color={colors.purple300}
          size={size.s
