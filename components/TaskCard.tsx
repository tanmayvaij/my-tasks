import { Pressable, StyleSheet, Text, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalState } from "@/context";
import { cancelNotification } from "@/utils/cancelNotification";
import { scheduleNotification } from "@/utils/scheduleNotification";

const TaskCard: React.FC<Task> = ({ text, isCompleted, id }) => {
  const { setTasks, tasks } = useGlobalState();

  const deleteTask = async () => {
    const taskToDelete = tasks.find((task) => task.id === id);

    if (taskToDelete?.notificationId) {
      await cancelNotification(taskToDelete.notificationId);
    }

    setTasks((tasks: Task[]) => tasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = async () => {
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        if (task.id === id) {
          if (task.notificationId) {
            await cancelNotification(task.notificationId);
            return { ...task, isCompleted: true, notificationId: null };
          }
          const notificationId = await scheduleNotification(task.text, id);
          return { ...task, isCompleted: false, notificationId };
        }
        return task;
      })
    );
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.taskTextContainer}>
      <View style={styles.deleteAndTextContainer}>
        <Pressable onPress={deleteTask}>
          <AntDesign name="delete" size={20} color="red" />
        </Pressable>
        <Text
          style={[
            styles.taskText,
            isCompleted
              ? { textDecorationLine: "line-through", color: "gray" }
              : { textDecorationLine: "none" },
          ]}
        >
          {text}
        </Text>
      </View>
      <Fontisto
        name={`checkbox-${isCompleted ? "active" : "passive"}`}
        size={20}
        color={isCompleted ? "green" : "black"}
        onPress={updateTaskStatus}
      />
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskTextContainer: {
    borderRadius: 4,
    padding: 12,
    elevation: 3,
    backgroundColor: "white",
    marginHorizontal: 1,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    textDecorationLine: "line-through",
    fontWeight: "500",
    paddingLeft: 16,
    fontSize: 12,
  },
  deleteAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    paddingRight: 40,
  },
});
