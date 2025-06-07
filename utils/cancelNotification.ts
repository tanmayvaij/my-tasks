import * as Notifications from "expo-notifications";

export const cancelNotification = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
