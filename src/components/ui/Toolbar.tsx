import { Editor } from '@tiptap/react';
import Image from 'next/image';

type ToolbarProps = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: ToolbarProps) {
  const textToolList = ['bold', 'italic', 'underlined'];
  const phraseToolList = ['list', 'list_numbered'];

  const handleClick = (tool: string) => {
    if (!editor) return;

    editor.chain().focus();

    switch (tool) {
      case 'bold':
        editor.chain().toggleBold().run();
        break;
      case 'italic':
        editor.chain().toggleItalic().run();
        break;
      case 'underlined':
        editor.chain().toggleUnderline().run();
        break;
      case 'list':
        editor.chain().toggleBulletList().run();
        break;
      case 'list_numbered':
        editor.chain().toggleOrderedList().run();
        break;
      default:
        break;
    }
  };

  const renderToolBar = (list: string[]) => {
    return (
      <div className='flex gap-[20px]'>
        {list.map((tool, index) => (
          <button
            key={`${tool}-${index}`}
            onClick={() => handleClick(tool)}
            type='button'
          >
            <Image
              src={`/assets/icons/tiptapTools/${tool}.png`}
              width={28}
              height={28}
              alt={`${tool} 아이콘`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='w-[262px] h-[48px] py-[10px] flex gap-[31px] items-center'>
      {renderToolBar(textToolList)}
      <div className='bg-gray-30 h-[20px] w-[1px]'></div>
      {renderToolBar(phraseToolList)}
    </div>
  );
}
