
"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import SettingsSidebar from "./components/SettingsSidebar";
import ProfileSettings from "./components/ProfileSettings";
import AppearanceSettings from "./components/AppearanceSettings";
import NotificationSettings from "./components/NotificationSettings";
import EditorSettings from "./components/EditorSettings";
import PrivacySettings from "./components/PrivacySettings";
import DataSettings from "./components/DataSettings";
import AboutSettings from "./components/AboutSettings";

import {
  SettingsTab,
  ProfileData,
  AppearanceData,
  NotificationData,
  EditorData,
  PrivacyData,
} from "./types";
interface Props {
  userId: number;
}
const defaultProfile: ProfileData = {
  name: "",
  email: "",
  bio: "",
};

const defaultAppearance: AppearanceData = {
  theme: "Light",
  accent: "Violet",
  compactSidebar: false,
};

const defaultNotifications: NotificationData = {
  taskReminders: true,
  deadlineAlerts: true,
  dailySummary: false,
  emailNotifications: false,
};

const defaultEditor: EditorData = {
  autoSave: true,
  spellCheck: true,
  showWordCount: true,
  markdownSupport: false,
};

const defaultPrivacy: PrivacyData = {
  analytics: false,
  activityHistory: true,
  lockNotes: false,
};

export default function Settings({ userId }: Props) {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("Profile");

  const [profile, setProfile] =
    useState<ProfileData>(defaultProfile);

  const [appearance, setAppearance] =
    useState<AppearanceData>(defaultAppearance);

  const [notifications, setNotifications] =
    useState<NotificationData>(defaultNotifications);

  const [editor, setEditor] =
    useState<EditorData>(defaultEditor);

  const [privacy, setPrivacy] =
    useState<PrivacyData>(defaultPrivacy);

  const [saved, setSaved] = useState(false);

  // Load saved settings
  useEffect(() => {
    const savedData = localStorage.getItem("smartnote-settings");

    if (!savedData) return;

    try {
      const data = JSON.parse(savedData);

      setProfile({ ...defaultProfile, ...data.profile });
      setAppearance({ ...defaultAppearance, ...data.appearance });
      setNotifications({
        ...defaultNotifications,
        ...data.notifications,
      });
      setEditor({ ...defaultEditor, ...data.editor });
      setPrivacy({ ...defaultPrivacy, ...data.privacy });
    } catch {
      console.error("Unable to load saved settings.");
    }
  }, []);

  // Save all settings
  const handleSave = () => {
    const settings = {
      profile,
      appearance,
      notifications,
      editor,
      privacy,
    };

    localStorage.setItem(
      "smartnote-settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // Reset all settings
  const handleReset = () => {
    setProfile(defaultProfile);
    setAppearance(defaultAppearance);
    setNotifications(defaultNotifications);
    setEditor(defaultEditor);
    setPrivacy(defaultPrivacy);

    localStorage.removeItem("smartnote-settings");
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <SettingsSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Content */}
          <div className="flex-1 min-w-0 md:border-l md:pl-8 border-gray-100">

            {activeTab === "Profile" && (
              <ProfileSettings
                profile={profile}
                setProfile={setProfile}
              />
            )}

            {activeTab === "Appearance" && (
              <AppearanceSettings
                appearance={appearance}
                setAppearance={setAppearance}
              />
            )}

            {activeTab === "Notifications" && (
              <NotificationSettings
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}

            {activeTab === "Editor" && (
              <EditorSettings
                editor={editor}
                setEditor={setEditor}
              />
            )}

            {activeTab === "Privacy" && (
              <PrivacySettings
                privacy={privacy}
                setPrivacy={setPrivacy}
              />
            )}

            {activeTab === "Data" && (
              <DataSettings onReset={handleReset} />
            )}

            {activeTab === "About" && <AboutSettings />}

            {/* Save Button */}
            {activeTab !== "About" && activeTab !== "Data" && (
              <div className="border-t border-gray-100 mt-8 pt-5 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition"
                >
                  {saved && <Check size={17} />}
                  {saved ? "Saved Successfully" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
