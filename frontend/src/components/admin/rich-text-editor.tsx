"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Start writing...",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] rounded-b-2xl border border-t-0 border-borderSoft p-4 outline-none prose prose-sm max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && defaultValue && editor.getHTML() !== defaultValue) {
      editor.commands.setContent(defaultValue);
    }
  }, [defaultValue, editor]);

  return (
    <div className="rounded-2xl">
      <div className="flex flex-wrap gap-2 rounded-t-2xl border border-borderSoft bg-brand-50/40 p-3">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="rounded-lg border border-borderSoft px-3 py-1 text-sm"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="rounded-lg border border-borderSoft px-3 py-1 text-sm"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="rounded-lg border border-borderSoft px-3 py-1 text-sm"
        >
          List
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className="rounded-lg border border-borderSoft px-3 py-1 text-sm"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className="rounded-lg border border-borderSoft px-3 py-1 text-sm"
        >
          H3
        </button>
      </div>

      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={editor?.getHTML() || ""} />
    </div>
  );
}