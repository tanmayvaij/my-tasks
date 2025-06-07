import { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem } from "expo-secure-store";
import * as Notifications from "expo-notifications";

const Context = createContext<AppProviderContextProps>({
  tasks: [],
  setTasks: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    setTasks(JSON.parse(getItem("tasks")!));
    Notifications.requestPermissionsAsync();
  }, []);

  useEffect(() => {
    setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Context.Provider value={{ tasks, setTasks }}>{children}</Context.Provider>
  );
};

export const useGlobalState = () => useContext(Context);

export default AppProvider;
