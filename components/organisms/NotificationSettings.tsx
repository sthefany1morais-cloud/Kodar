import React from "react";
import styled from "styled-components/native";
import { Switch, Text } from "react-native";
import { Button } from "../atoms/Button";
import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";

const SettingsCard = styled.View`
  background: white;
  padding: 20px;
  margin: 16px;
  border-radius: 16px;
  elevation: 2;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f5f9;
`;

export function NotificationSettings() {
  const { requestPermissions, sendTestNotification, getToken } =
    useNotifications();
  const [token, setToken] = useState("");
  const [enabled, setEnabled] = useState(false);

  const loadToken = async () => {
    const t = await getToken();
    setToken(t || "");
  };

  return (
    <SettingsCard>
      <SettingRow>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Notificações Push
        </Text>
        <Switch
          value={enabled}
          onValueChange={async (value) => {
            setEnabled(value);
            if (value) {
              await requestPermissions();
              await loadToken();
            }
          }}
        />
      </SettingRow>

      {token && (
        <SettingRow>
          <Text style={{ fontSize: 14, color: "#64748b" }}>
            Token: {token.slice(0, 20)}...
          </Text>
          <Button variant="secondary" size="sm" onPress={sendTestNotification}>
            Testar
          </Button>
        </SettingRow>
      )}
    </SettingsCard>
  );
}
