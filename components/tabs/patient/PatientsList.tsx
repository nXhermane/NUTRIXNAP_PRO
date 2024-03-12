import { StyleSheet, Text, View, FlatList } from "react-native";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import PatientSection from "@comp/container/PatientSection";
import PatientItem from "@comp/tabs/patient/PatientItem"
;
import {dataPatientList} from "@/data"
import React ,{useState}from 'react'
interface Props {
    // Define your props here
}


const PatientsList = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [selectedPatient, setSelectedPatient] = useState([])
    return (
        <PatientSection title={"Liste des Patients"}
        body={"list"}
        >
            <View style={style.container}>
                <FlatList
                    data={dataPatientList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <PatientItem
                            statusCode={item.statusCode}
                            name={item.name}
                            occupation={item.occupation}
                            id={item.id}
                            lastActivity={item.lastActivity}
                            index={index}
                            setSelected={setSelectedPatient}
                            selected={selectedPatient}
                            sexe={item.sexe}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </PatientSection>
    );
};

export default PatientsList;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        container: {
            marginTop: size.s4,
            maxHeight:size.height*0.65
        }
    });
