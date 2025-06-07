import * as Notifications from "expo-notifications";

export const scheduleNotification = async (task: string, id: string) => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: `Time to complete: ${task}`,
      data: { id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60,
      repeats: true,
    },
  });

  return notificationId;
};
