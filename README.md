

---

# 'My Tasks' App

## Description

This is a simple React Native task management app built using Expo. Users can:
- Add tasks
- Mark tasks as completed or incomplete
- Receive a notification reminder every 1 minute (until the task is marked completed)
- Delete tasks

The app uses the Expo Notifications API to remind users about incomplete tasks.

---

## Setup and Running the App

**Clone the Repository:**
```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
````

**Install Dependencies:**

```bash
yarn
```

**Start the Development Server:**

```bash
yarn start
```

**Run on Your Device:**

* Download the **Expo Go** app from the App Store or Google Play Store.
* Scan the QR code shown in your terminal or on your browser window after running `expo start`.

---

## Design Choices and Challenges

* **Manual Notification Rescheduling:**
  Expo’s repeating notifications with seconds-based triggers are inconsistent across iOS and Android. To overcome this, I opted to **manually reschedule notifications** each time a task is toggled incomplete, ensuring consistent reminders every 1 minute regardless of platform.

* **State Management:**
  Instead of using a complex state management library, I leveraged **React Context API** with `useState` to manage tasks globally, keeping the app lightweight and easy to maintain.

* **UX Considerations:**
  I added **strike-through styling** to completed tasks and included a **delete button** for easy task management.

---
