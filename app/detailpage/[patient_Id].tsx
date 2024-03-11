import { StyleSheet, Text, View } from 'react-native';
import {useLocalSearchParams} from "expo-router"

interface Props {
  // Define your props here
}

const patientDetail = (props: Props) => {
  const {patient_Id}=useLocalSearchParams()
  return (
    <View>
      <Text>{patient_Id}</Text>
    </View>
  );
};

export default patientDetail;

const styles = StyleSheet.create({});