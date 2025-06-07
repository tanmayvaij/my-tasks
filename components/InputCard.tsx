import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { useGlobalState } from "@/context";
import { randomUUID } from "expo-crypto";
import { scheduleNotification } from "@/utils/scheduleNotification";

const InputCard = () => {
  const { setTasks } = useGlobalState();

  const [task, setTask] = useState("");

  const addTask = async () => {
    if (!task) Alert.alert("Task can't be empty");
    else {
      const id = randomUUID();

      const notificationId = await scheduleNotification(task, id)
      
      setTasks((tasks: Task[]) => [
        ...tasks,
        { id: randomUUID(), text: task, isCompleted: false, notificationId },
      ]);
      setTask("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={task}
        onChangeText={setTask}
        style={styles.inputStyle}
        placeholder="Enter Task"
      />
      <Pressable onPress={addTask} style={styles.addBtnContainer}>
        <Entypo style={styles.addBtnText} name="add-to-list" size={24} />
      </Pressable>
    </View>
  );
};

export default InputCard;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
  },
  inputStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderRadius: 4,
    padding: 12,
  },
  addBtnContainer: {
    backgroundColor: "#030712",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 5,
  },
  addBtnText: {
    color: "white",
  },
});
