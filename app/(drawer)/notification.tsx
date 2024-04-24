import { StyleSheet, Text, View, Button } from 'react-native';

interface Props {
  onPress: () => void;
}

const Notification = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification</Text>
      <Button title="Dismiss" onPress={props.onPress} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
