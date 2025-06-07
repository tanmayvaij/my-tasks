import { View, StyleSheet, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const EmptyCard: React.FC<EmptyCardProps> = ({ text }) => {
  return (
    <View style={styles.card}>
      <FontAwesome5 name="box-open" size={40} color="gray" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    paddingTop: 10,
    color: "gray",
    fontWeight: "600",
    textAlign: "center"
  }
});
