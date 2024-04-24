import { StyleSheet, Text, View } from "react-native";
import Calendar from "@pack/calendar/components/Calendar";
import Agendar from "@pack/calendar/components/AgendarNew";
import { days } from "@pack/calendar/data/calendarData";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarHeader from ""
interface Props {
    // Define your props here
}

const agenda = (props: Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Calendar  />
            </View>
        </SafeAreaView>
    );
};

export default agenda;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
    }
});
