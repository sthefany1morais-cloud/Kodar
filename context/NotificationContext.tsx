import React, { createContext, useContext, useEffect, ReactNode } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

interface NotificationContextType {
  requestPermissions: () => Promise<void>;
  getToken: () => Promise<string | null>;
  sendTestNotification: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("courses", {
        name: "Cursos Kodar",
        importance: Notifications.AndroidImportance.DEFAULT,
        lightColor: "#6366F1",
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permissão negada");
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;

    console.log("Token:", token.slice(0, 30) + "...");
  }

  const requestPermissions = async () => {
    await registerForPushNotificationsAsync();
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const tokenData = await Notifications.getExpoPushTokenAsync();
      return tokenData.data;
    } catch {
      return null;
    }
  };

  const sendTestNotification = async () => {
    try {
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: token,
          title: "Kodar",
          body: "Novo curso disponível!",
          data: {
            type: "new-course",
            courseId: "react-native",
          },
          channelId: "courses",
          priority: "default",
        }),
      });

      console.log("Notificação VISUAL enviada!");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    const sub1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Recebida:", notification);
      },
    );

    const sub2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Clique:", response);
        const data = response.notification.request.content.data as any;
        if (data.courseId) {
          console.log("Curso:", data.courseId);
        }
      },
    );

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        requestPermissions,
        getToken,
        sendTestNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve estar dentro de NotificationProvider",
    );
  }
  return context;
};
