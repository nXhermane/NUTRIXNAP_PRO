import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    // Define your props here
}

const agenda = (props: Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
            </View>
        </SafeAreaView>
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
