import { useGlobalState } from "@/context";
import { ScrollView, StyleSheet } from "react-native";
import TaskCard from "./TaskCard";
import EmptyCard from "./EmptyCard";

const TaskList = () => {
  const { tasks } = useGlobalState();

  if (tasks.length === 0) return <EmptyCard text="Empty list" />;

  return (
    <ScrollView style={styles.taskListStyle}>
      {tasks.map((task, id) => (
        <TaskCard key={id} {...task} />
      ))}
    </ScrollView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  taskListStyle: {
    marginVertical: 16,
  },
});
