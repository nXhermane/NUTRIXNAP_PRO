import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import { StatusBar } from 'expo-status-bar';
import { router, Stack, Tabs } from 'expo-router';
import HeaderFoodScreen from '@comp/tabs/HeaderFoodScreen';
import Top from '@comp/tabs/foods/Top';
import SearchPatient from '@comp/tabs/patient/SearchPatient';
import FoodsList from '@comp/tabs/foods/FoodsList';
interface Props {
   // Define your props here
}

const food = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   return (
      <SafeAreaView>
         <Tabs.Screen
            options={{
               header: () => <HeaderFoodScreen />,
               headerShown: true,
            }}
         />
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               width: size.width,
               height: size.height,
               paddingTop: size.s50,
               paddingBottom: size.s50 * 1.5,
            }}
         >
            <View style={style.container}>
               <Top />

               <FoodsList />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default food;

const styles = ({ colors, size }) => StyleSheet.create({});
