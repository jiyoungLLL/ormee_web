'use client';

import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Toolbar from './Toolbar';

type TipTapProps = {
  type: '공지' | '숙제';
  contents: string;
  onChange: (text: string) => void;
  value?: string;
};

export default function TiptapEditor({ type, contents, onChange, value }: TipTapProps) {
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
      ListItem,
      Underline,
      Image,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-body',
          levels: [2],
        },
      }),
    ],
    content: contents,
    editorProps: {
      attributes: {
        class:
          'relative focus:border-purple-50 focus:outline-none min-h-[422px] p-[20px] border border-gray-40 rounded-md bg-white overflow-y-auto placeholder:text-gray-40',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      const editorDOM = editor.view.dom as HTMLElement;

      if (isVisuallyEmpty(html)) {
        editorDOM.setAttribute('data-placeholder-visible', 'true');
        editorDOM.setAttribute('data-placeholder', `${type} 내용을 입력하세요`);
      } else {
        editorDOM.removeAttribute('data-placeholder-visible');
        editorDOM.removeAttribute('data-placeholder');
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor && value) {
      editor.commands.setContent(value);
    }
    const html = editor.getHTML();
    const editorDOM = editor.view.dom as HTMLElement;

    if (isVisuallyEmpty(html)) {
      editorDOM.setAttribute('data-placeholder-visible', 'true');
      editorDOM.setAttribute('data-placeholder', `${type} 내용을 입력해 주세요.`);
    } else {
      editorDOM.removeAttribute('data-placeholder-visible');
      editorDOM.removeAttribute('data-placeholder');
    }
  }, [editor]);

  return (
    <div className='flex flex-col gap-[12px]'>
      <Toolbar editor={editor} />
      <div className='rounded-[10px]'>
        <EditorContent
          editor={editor}
          className='text-body-reading prose list-outside list-disc'
          style={{ width: '100%', height: '422px', maxHeight: '422px', overflowY: 'auto' }}
        />
      </div>
    </div>
  );
}
