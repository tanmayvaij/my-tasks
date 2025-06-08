import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { cancelNotification } from "@/utils/cancelNotification";
import { scheduleNotification } from "@/utils/scheduleNotification";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalState } from "@/context";

const TaskEditModal: React.FC<{
  id: string;
  text: string;
  notificationId: string;
}> = ({ id, text, notificationId }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(text);

  const { setTasks } = useGlobalState();

  const updateTask = async () => {
    await cancelNotification(notificationId);
    const updatedNotificationId = await scheduleNotification(editedTask, id);
    setTasks((tasks: Task[]) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editedTask, notificationId: updatedNotificationId }
          : task
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <View>
      <Pressable
        style={styles.editBtnStyle}
        onPress={() => setIsEditModalOpen(true)}
      >
        <Feather name="edit" size={22} color="black" />
      </Pressable>
      {isEditModalOpen && (
        <Modal animationType="slide">
          <View style={styles.modalInnerContainer}>
            <Text style={styles.modalInputLabel}>Edit text:</Text>
            <TextInput
              onChangeText={setEditedTask}
              placeholder="Edit your text"
              style={styles.modalInputStyle}
              value={editedTask}
            />
            <Pressable onPress={updateTask} style={styles.editBtnContainer}>
              <Text style={styles.editBtnText}>Edit</Text>
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default TaskEditModal;

const styles = StyleSheet.create({
  modalInnerContainer: {
    backgroundColor: "white",
    padding: 10,
    paddingTop: 40,
  },
  modalInputLabel: {
    fontWeight: 500,
    paddingBottom: 5,
    fontSize: 18,
    marginBottom: 10,
  },
  modalInputStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  editBtnContainer: {
    backgroundColor: "#030712",
    padding: 12,
    borderRadius: 4,
  },
  editBtnText: {
    color: "white",
    textAlign: "center",
  },
  editBtnStyle: {
    marginRight: 10,
  },
});
