
export type SettingsTab =
  | "Profile"
  | "Appearance"
  | "Notifications"
  | "Editor"
  | "Privacy"
  | "Data"
  | "About";

export type ProfileData = {
  name: string;
  email: string;
  bio: string;
};

export type AppearanceData = {
  theme: "Light" | "Dark" | "System";
  accent: "Violet" | "Blue" | "Teal" | "Amber" | "Pink";
  compactSidebar: boolean;
};

export type NotificationData = {
  taskReminders: boolean;
  deadlineAlerts: boolean;
  dailySummary: boolean;
  emailNotifications: boolean;
};

export type EditorData = {
  autoSave: boolean;
  spellCheck: boolean;
  showWordCount: boolean;
  markdownSupport: boolean;
};

export type PrivacyData = {
  analytics: boolean;
  activityHistory: boolean;
  lockNotes: boolean;
};
