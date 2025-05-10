'use client';

import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

type TipTapProps = {
  type: '공지' | '과제';
  contents: string;
  onChange: (text: string) => void;
};

export default function TiptapEditor({ type, contents, onChange }: TipTapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Underline,
      Image,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-body',
          levels: [2],
        },
      }),
      Placeholder.configure({
        placeholder: `${type}를 입력하세요`,
        emptyEditorClass:
          'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-[20px] before:left-[20px] before:text-mauve-11 before:opacity-50 before-pointer-events-none',
      }),
    ],
    content: contents,
    editorProps: {
      attributes: {
        class:
          'focus:border-purple-50 focus:outline-none min-h-[422px] p-[20px] border border-gray-300 rounded-md bg-white overflow-y-auto placeholder:text-gray-40',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = () => {};

  return (
    <div className='flex flex-col gap-[12px]'>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className='text-body-reading'
        style={{ height: '422px', borderRadius: '10px' }}
      />
    </div>
  );
}
