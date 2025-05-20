import { Editor } from '@tiptap/react';
import Image from 'next/image';

type ToolbarProps = {
  editor: Editor | null;
  enableList?: boolean;
  enableImage?: boolean;
  containerStyle?: string;
};

const DEFAULT_CONTAINER_STYLE = 'w-[262px] h-[48px] py-[10px] flex gap-[31px] items-center';

export default function Toolbar({ editor, enableImage = false, enableList = true, containerStyle }: ToolbarProps) {
  const textToolList = ['bold', 'italic', 'underlined'];
  const phraseToolList = ['list', 'list_numbered'];
  const imageToolList = ['image'];

  const handleClick = (tool: string) => {
    if (!editor) return;

    const chain = editor.chain().focus();

    switch (tool) {
      case 'bold':
        chain.toggleBold().run();
        break;
      case 'italic':
        chain.toggleItalic().run();
        break;
      case 'underlined':
        chain.toggleUnderline().run();
        break;
      case 'list':
        if (enableList) {
          chain.toggleBulletList().run();
        }
        break;
      case 'list_numbered':
        if (enableList) {
          chain.toggleOrderedList().run();
        }
        break;
      case 'image':
        if (enableImage) {
          // TODO: 이미지 처리 추가
        }
        break;
      default:
        break;
    }
  };

  const handleInsertImage = () => {
    // TODO: 이미지 처리 추가
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
    <div className={containerStyle || DEFAULT_CONTAINER_STYLE}>
      {renderToolBar(textToolList)}
      {enableList && (
        <>
          <div className='bg-gray-30 h-[20px] w-[1px]'></div>
          {renderToolBar(phraseToolList)}
        </>
      )}
      {enableImage && (
        <>
          <div className='bg-gray-30 h-[20px] w-[1px]'></div>
          {renderToolBar(imageToolList)}
        </>
      )}
    </div>
  );
}
