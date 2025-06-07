interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  notificationId: string
}

interface AppProviderContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

interface EmptyCardProps {
  text: string
}
