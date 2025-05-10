'use client';

import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type TipTapProps = {
  contents: string;
  onChange: (text: string) => void;
};

export default function TiptapEditor({ contents, onChange }: TipTapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [2],
        },
      }),
    ],
    content: contents,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] p-4 border border-gray-300 rounded-md bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = () => {};

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={addImage}
          className='text-sm text-purple-600 hover:underline'
        >
          이미지 추가
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
