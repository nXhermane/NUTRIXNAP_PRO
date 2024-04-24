import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Animated,
  useSharedValue,
  withSpring,
  interpolate
} from "react-native";
import useTheme from "@/theme/useTheme";
import { router, Link } from "expo-router";
import UpcomingEvents from "./UpcomingEvents";

const UpComingContainer = () => {
  const { colors, size } = useTheme();
  const style = StyleSheet.create({
    serviceInner: {
      paddingHorizontal: size.s4,
      paddingVertical: size.s3
    },
    container: {
      width: "90%",
      backgroundColor: colors.w,
      alignSelf: "center",
      borderRadius: size.s1,
      gap: size.s1,
      //borderWidth: size.s1 / 8,
      borderColor: colors.gray100,
      marginTop: size.s3
      // elevation: size.s1 / 2
    }
  });

  const upcomingEventsData = [
    {
      id: "1",
      title: "Consultation avec un Patient",
      dateTime: "02 mars 2024 à 12h 30",
      color: colors.green100,
      secondColor: colors.green300
    },
    {
      id: "2",
      title: "Consultation avec un Patient",
      dateTime: "02 mars 2024 à 12h 30",
      color: colors.purple100,
      secondColor: colors.purple300
    },
    {
      id: "3",
      title: "Consultation avec un Patient",
      dateTime: "02 mars 2024 à 12h 30",
      color: colors.yellow100,
      secondColor: colors.yellow300
    }
  ];

  return (
    <View style={style.serviceInner}>
      <View style={style.container}>
        <FlatList
          data={upcomingEventsData}
          renderItem={({ item }) => (
            <UpcomingEvents
              title={item.title}
              dateTime={item.dateTime}
              eventId={item.id}
              color={item.color}
              secondColor={item.secondColor}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ gap: size.s1 }}
        />
      </View>
    </View>
  );
};

export default UpComingContainer;

const UpcomingEvents = ({ title, dateTime, eventId, color, secondColor }) => {
  const { colors, size } = useTheme();
  const animatedValue = useSharedValue(1);
  const scale = interpolate(animatedValue.value, [0, 1], [1, 1.05]);
  const opacity = interpolate(animatedValue.value, [0, 1], [0.5, 1]);

  const handlePressIn = () => {
    animatedValue.value = withSpring(0, { duration: 300 });
  };

  const handlePressOut = () => {
    animatedValue.value = withSpring(1, { duration: 300 });
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale }],
          opacity
        }
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          {
            backgroundColor: colors.w,
            borderBottomColor: color,
            borderBottomWidth: 1,
            borderBottomLeftRadius: size.s4,
            borderBottomRightRadius: size.s4,
            paddingHorizontal: size.s2,
            paddingVertical: size.s2,
            flexDirection: "row",
            gap: size.s1,
            alignItems: "center",
            justifyContent: "space-between"
          },
          pressed && {
            backgroundColor: colors.gray100
          }
        ]}
      >
        <View
          style={[
            {
              height: size.s100 * 0.6,
              width: size.s100 * 0.6,
              backgroundColor: color,
              borderRadius: 600,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }
          ]}
        ></View>
        <View>
          <Text style={{ fontFamily: "inter_b", fontSize: size.s4 }}>
            {title}
          </Text>
          <Text style={{ fontFamily: "inter_sb", color: colors.gray200 }}>
            {dateTime}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};
