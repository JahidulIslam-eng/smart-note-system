
"use client";

import { EditorData } from "../types";

type Props = {
  editor: EditorData;
  setEditor: (data: EditorData) => void;
};

const editorItems = [
  {
    key: "autoSave",
    title: "Auto Save",
    description: "Automatically save your notes while editing.",
  },
  {
    key: "spellCheck",
    title: "Spell Check",
    description: "Check spelling while writing notes.",
  },
  {
    key: "showWordCount",
    title: "Show Word Count",
    description: "Display the word count in the editor.",
  },
  {
    key: "markdownSupport",
    title: "Markdown Support",
    description: "Enable Markdown formatting in notes.",
  },
] as const;

export default function EditorSettings({
  editor,
  setEditor,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Editor Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Customize your note writing experience.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {editorItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="font-medium text-gray-800">
                {item.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {item.description}
              </p>
            </div>

            <input
              type="checkbox"
              checked={editor[item.key]}
              onChange={(e) =>
                setEditor({
                  ...editor,
                  [item.key]: e.target.checked,
                })
              }
              className="w-5 h-5 accent-violet-600 shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
