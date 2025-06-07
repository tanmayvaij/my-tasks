import { StyleSheet, View } from "react-native";
import InputCard from "@/components/InputCard";
import TaskList from "@/components/TaskList";
import AppProvider from "@/context";

const Home = () => {
  return (
    <AppProvider>
      <View style={styles.screen}>
        <InputCard />
        <TaskList />
      </View>
    </AppProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
});
