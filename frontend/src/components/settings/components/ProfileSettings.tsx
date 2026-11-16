
"use client";

import { ProfileData } from "../types";

type Props = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
};

export default function ProfileSettings({
  profile,
  setProfile,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal information.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-2xl font-bold text-violet-700">
          {profile.name.charAt(0).toUpperCase() || "U"}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {profile.name || "Your Name"}
          </p>
          <p className="text-sm text-gray-500">
            {profile.email || "Your email"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Write something about yourself..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-violet-200 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
