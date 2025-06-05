import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type TipTapFieldContentProps = {
  setEditor: (editor: Editor | null) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: string;
  fieldStyle?: string;
  textStyle?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholderStyle?: string;
};

export default function TipTapFieldContent({
  setEditor,
  value,
  onChange,
  placeholder,
  size = 'w-full h-full',
  fieldStyle,
  textStyle,
  onFocus,
  onBlur,
  placeholderStyle,
}: TipTapFieldContentProps) {
  const isVisuallyEmpty = (html: string) => {
    const cleaned = html
      .replace(/<p><\/p>/g, '')
      .replace(/<ul><li><p><\/p><\/li><\/ul>/g, '')
      .replace(/<ol><li><p><\/p><\/li><\/ol>/g, '')
      .trim();

    return cleaned === '';
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      BulletList,
      OrderedList,
      Underline,
      ListItem,
      Image,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-body',
          levels: [2],
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `${fieldStyle || 'relative p-[20px] rounded-[10px] border border-gray-20 focus:outline-none min-h-[50px]'} ${textStyle || 'text-body-reading text-gray-90 placeholder:text-gray-50'} w-full h-full`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      const editorDOM = editor.view.dom as HTMLElement;

      if (isVisuallyEmpty(html)) {
        editorDOM.setAttribute('data-placeholder-visible', 'true');
        editorDOM.setAttribute('data-placeholder', placeholder ?? '');
      } else {
        editorDOM.removeAttribute('data-placeholder-visible');
        editorDOM.removeAttribute('data-placeholder');
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    const html = editor.getHTML();
    const editorDOM = editor.view.dom as HTMLElement;

    if (isVisuallyEmpty(html)) {
      editorDOM.setAttribute('data-placeholder-visible', 'true');
      editorDOM.setAttribute('data-placeholder', placeholder ?? '');
    } else {
      editorDOM.removeAttribute('data-placeholder-visible');
      editorDOM.removeAttribute('data-placeholder');
    }
  }, [editor, placeholder]);

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);

      const editorDOM = editor.view.dom as HTMLElement;

      if (isVisuallyEmpty(value)) {
        editorDOM.setAttribute('data-placeholder-visible', 'true');
        editorDOM.setAttribute('data-placeholder', placeholder ?? '');
      } else {
        editorDOM.removeAttribute('data-placeholder-visible');
        editorDOM.removeAttribute('data-placeholder');
      }
    }
  }, [editor, value]);

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }

    return () => {
      setEditor(null);
    };
  }, [editor, setEditor]);

  const handleFocus = () => {
    onFocus?.();
    if (editor) {
      setEditor(editor);
    }
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <EditorContent
      editor={editor}
      className={`prose list-outside list-disc tiptap-field-editor ${placeholderStyle || ''} ${size}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
