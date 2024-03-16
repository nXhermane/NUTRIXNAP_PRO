import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormScreenHeader from "@comp/forms/formScreenHeader";
import PatientSection from "@comp/container/PatientSection";
import TextInput from "@comp/basic/TextInput";
interface Props {
    // Define your props here
}

const addPatientForm = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <SafeAreaView style={style.container}>
            <Stack.Screen
                options={{
                    header: () => (
                        <FormScreenHeader
                            title="Enregistrer un Patient"
                            onPressSave={() => {
                                alert("save Patient");
                            }}
                        />
                    )
                }}
            />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: size.s50,
                    width: size.width
                }}
            >
                <PatientSection>
                    <TextInput />
                </PatientSection>
            </ScrollView>
        </SafeAreaView>
    );
};

export default addPatientForm;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg.secondary
        }
    });
