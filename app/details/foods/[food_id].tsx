import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface Props {
    // Define your props here
}

const foodDetail = (props: Props) => {
    const { food_id } = useLocalSearchParams();
    return (
        <View>
            <Text>{food_id}</Text>
        </View>
    );
};

export default foodDetail;

const styles = StyleSheet.create({});
