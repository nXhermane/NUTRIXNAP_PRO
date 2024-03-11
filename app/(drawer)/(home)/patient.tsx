import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { StatusBar } from "expo-status-bar";
import { router, Stack, Tabs } from "expo-router";
import HeaderPatientsScreen from "@comp/tabs/HeaderPatientsScreen";
import Top from "@comp/tabs/patient/Top";
import SearchPatient from "@comp/tabs/patient/SearchPatient";
import PatientsList from "@comp/tabs/patient/PatientsList";
interface Props {
    // Define your props here
}

const patient = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <SafeAreaView>
            <Tabs.Screen
                options={{
                    header: () => <HeaderPatientsScreen />
                }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    width: size.width,
                    height: size.height,
                    paddingTop: size.s50,
                    paddingBottom: size.s50 * 1.5
                }}
            >
                <Top />

                <PatientsList />
            </ScrollView>
        </SafeAreaView>
    );
};

export default patient;

const styles = ({ colors, size }) => StyleSheet.create({});
