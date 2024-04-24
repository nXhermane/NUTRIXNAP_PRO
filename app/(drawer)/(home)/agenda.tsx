import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Calendar from "@pack/calendar/components/Calendar";
import Agendar from "@pack/calendar/components/AgendarNew";
import { days } from "@pack/calendar/data/calendarData";
import CalendarHeader from "@pack/calendar/components/CalendarHeader"; // corrected import statement

interface Props {
  // Define your props here
}

const AgendaScreen = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CalendarHeader /> {/* added CalendarHeader component */}
        <Calendar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default AgendaScreen;
