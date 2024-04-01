import { StyleSheet, Text, View, ScrollView, PressEvent } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { StatusBar } from "expo-status-bar";
import { router, Stack, Tabs } from "expo-router";
import HeaderPatientsScreen from "@comp/tabs/HeaderPatientsScreen";
import Top from "@comp/tabs/patient/Top";
import SearchPatient from "@comp/tabs/patient/SearchPatient";
import PatientsList from "@comp/tabs/patient/PatientsList";
import PatientForm from "@comp/tabs/patient/PatientForm";
import { CoreContext } from "@/core/CoreProvider";
interface Props {
    // Define your props here
}

const patient = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [displayAddPatientForm, setDisplayAddPatientForm] =
        useState<boolean>(false);
    const [displayEditPtientForm, setDisplayEditPtientForm] =
        useState<boolean>(false);
    const [editPatientInfo, seteditPatientInfo] = useState<any>({});
    const [patientAnimatedData, setPatientAnimatedData] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });
    const core = useContext(CoreContext);
    return (
        <SafeAreaView>
            <Tabs.Screen
                options={{
                    header: () => (
                        <HeaderPatientsScreen
                            onPressAddBtn={(e: PressEvent) => {
                                setPatientAnimatedData({
                                    x: e.nativeEvent.pageX,
                                    y: e.nativeEvent.pageY
                                });
                                setDisplayAddPatientForm(true);
                            }}
                        />
                    )
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
                <View style={style.container}>
                    <Top />
                    <PatientsList
                        openPopup={displayAddPatientForm+displayEditPtientForm}
                        onPressAddBtn={(e: PressEvent) => {
                            setPatientAnimatedData({
                                x: e.nativeEvent.pageX,
                                y: e.nativeEvent.pageY
                            });
                            setDisplayAddPatientForm(true);
                        }}
                        onPressItemEdit={(e: PressEvent, id: number) => {
                            setPatientAnimatedData({
                                x: e.nativeEvent.pageX,
                                y: e.nativeEvent.pageY
                            });
                            core.patientS.getPatientById(id).then(patient => {
                                seteditPatientInfo(patient);
                                setDisplayEditPtientForm(true);
                            });
                            
                        }}
                    />
                    {displayAddPatientForm && (
                        <PatientForm
                            animatedData={patientAnimatedData}
                            popupIsOpen={(val: boolean) =>
                                setDisplayAddPatientForm(val)
                            }
                            title={"Enregistrez votre patient"}
                        />
                    )}
                    {displayEditPtientForm && (
                        <PatientForm
                            animatedData={patientAnimatedData}
                            popupIsOpen={(val: boolean) =>
                                setDisplayEditPtientForm(val)
                            }
                            isUpdate={true}
                            title={"Mettre à jour votre patient"}
                            patientInfo={editPatientInfo}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default patient;

const styles = ({ colors, size }) => StyleSheet.create({});
