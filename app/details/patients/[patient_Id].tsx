import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import PatientDetail from "@comp/details/patient/PatientDetail";
interface Props {
    // Define your props here
}

const patientDetail = (props: Props) => {
    const { patient_Id } = useLocalSearchParams();
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <SafeAreaView style={style.container}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <PatientDetail patientId={patient_Id} />
        </SafeAreaView>
    );
};

export default patientDetail;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.bg.secondary,
            flex: 1
        }
    });
