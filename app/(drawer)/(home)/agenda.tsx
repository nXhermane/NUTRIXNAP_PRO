import { StyleSheet, Text, View } from "react-native";
import Calendar from "@pack/calendar/components/Calendar";
import Agendar from "@pack/calendar/components/Agendar";
import { days } from "@pack/calendar/data/calendarData";
interface Props {
    // Define your props here
}

const agenda = (props: Props) => {
    return (
        <View style={styles.container}>
            <Agendar />
        </View>
    );
};

export default agenda;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});
