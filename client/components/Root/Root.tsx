import { Route } from "wouter";
import { Layout } from "../Layout/Layout";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { usePubSub } from "create-pubsub/react";
import { settingsPubSub } from "../../modules/pubSub";
import { defaultSettings } from "../../modules/settings";
import { addLogEntry } from "../../modules/logEntries";
import { Notifications } from "@mantine/notifications";

export function Root() {
  useInitializeSettings();

  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <Route path="/" component={Layout} />
    </MantineProvider>
  );
}

/**
 * A custom React hook that initializes the application settings.
 *
 * @returns The initialized settings object.
 *
 * @remarks
 * This hook uses the `usePubSub` hook to access and update the settings state.
 * It initializes the settings by merging the default settings with any existing settings.
 * The initialization is performed once when the component mounts.
 */
function useInitializeSettings() {
  const [settings, setSettings] = usePubSub(settingsPubSub);

  useEffect(() => {
    setSettings({ ...defaultSettings, ...settings });
    addLogEntry("Settings initialized");
  }, []);

  return settings;
}
