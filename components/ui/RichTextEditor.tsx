"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Underline as UnderlineIcon, 
  Link as LinkIcon, 
  Unlink,
  Undo,
  Redo
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Commencez à écrire...",
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="w-full rounded-[10px] border border-line bg-canvas overflow-hidden focus-within:border-gold transition-all duration-200">
      <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-line bg-bone/50">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          icon={<Bold className="w-4 h-4" />}
          title="Gras"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={<Italic className="w-4 h-4" />}
          title="Italique"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          icon={<UnderlineIcon className="w-4 h-4" />}
          title="Souligné"
        />
        <div className="w-px h-4 bg-line mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={<List className="w-4 h-4" />}
          title="Liste à puces"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          icon={<ListOrdered className="w-4 h-4" />}
          title="Liste ordonnée"
        />
        <div className="w-px h-4 bg-line mx-1" />
        <MenuButton
          onClick={setLink}
          active={editor.isActive("link")}
          icon={<LinkIcon className="w-4 h-4" />}
          title="Lien"
        />
        {editor.isActive("link") && (
          <MenuButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            icon={<Unlink className="w-4 h-4" />}
            title="Supprimer le lien"
          />
        )}
        <div className="flex-1" />
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo className="w-4 h-4" />}
          title="Annuler"
        />
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo className="w-4 h-4" />}
          title="Rétablir"
        />
      </div>
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-3.5 min-h-[150px] text-ink outline-none"
      />
      <style jsx global>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .tiptap {
          outline: none !important;
        }
        .tiptap p {
          margin: 0;
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}

function MenuButton({ 
  onClick, 
  active, 
  icon, 
  title 
}: { 
  onClick: () => void; 
  active?: boolean; 
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active 
          ? "bg-gold/15 text-gold" 
          : "text-ink-soft hover:bg-bone hover:text-ink"
      }`}
    >
      {icon}
    </button>
  );
}
