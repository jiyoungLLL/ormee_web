'use client';

import { MOCK_CLOSEDNOTE, MOCK_OPENNOTE } from '@/mock/note';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import ClosedNote from './ClosedNote';
import OpenNote from './OpenNote';

type NoteData = {
  noteKey: string;
  title: string;
  date: string;
  students?: number;
  data?: (string | number)[][];
};

export default function NoteContent() {
  const { control, getValues, reset } = useForm();
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [openNotes, setOpenNotes] = useState<Record<string, NoteData>>(MOCK_OPENNOTE);
  const [closedNotes, setClosedNotes] = useState<NoteData[]>(Object.values(MOCK_CLOSEDNOTE));
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null);

  const commonStyle = 'flex flex-col gap-[20px] text-heading2 font-semibold';

  // 생성 시간
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const handleNewNote = () => {
    setNewNoteModal(true);
    reset();
  };

  const onConfirm = () => {
    const noteTitle = getValues('noteTitle');

    const newNote: NoteData = {
      noteKey: `${Date.now()}`,
      title: noteTitle,
      date: formatDate(new Date()),
    };

    setOpenNotes((prev) => ({
      ...prev,
      [newNote.noteKey]: newNote,
    }));

    setNewNoteModal(false);
    reset();
  };

  const handleClosingNote = (noteKey: string) => {
    const closingNote = openNotes[noteKey];

    // 제출 인원, 데이터 받아와서 표시 -> 서버 연결 후 수정 필요
    setClosedNotes((prev) => [closingNote, ...prev]);
    const { [noteKey]: _, ...restOpenNotes } = openNotes;
    setOpenNotes(restOpenNotes);

    if (Object.entries(openNotes).length === 0) {
      setIsEmpty(true);
    }
  };

  return (
    <div className='absolute top-[125px] w-[1018px] bg-white rounded-[20px] px-[30px] py-[20px] flex flex-col'>
      <div className='w-full flex justify-end'>
        <Button
          type='BUTTON_CREATE_TYPE'
          size='h-[49px]'
          font='text-headline1 font-bold'
          title='쪽지 생성'
          isPurple={true}
          onClick={handleNewNote}
          htmlType='button'
        />
      </div>
      <div className='flex flex-col gap-[45px]'>
        <div className={commonStyle}>
          <div>진행 쪽지</div>
          {Object.keys(openNotes).length > 0 ? (
            Object.entries(openNotes).map(([key, note]) => (
              <OpenNote
                key={key}
                noteKey={note.noteKey}
                title={note.title}
                date={note.date}
                onClick={() => handleClosingNote(key)}
              />
            ))
          ) : (
            <div className='w-full rounded-[15px] flex justify-center px-[10px] py-[20px]'>
              <div className='text-heading2 font-semibold text-label-assistive'>현재 진행 중인 쪽지가 없어요</div>
            </div>
          )}
        </div>

        <div className={commonStyle}>
          <div>마감 쪽지</div>
          <div className='flex flex-col gap-[5px]'>
            {closedNotes.map((note, index) => {
              const lastNote = closedNotes.length - 1;

              return (
                <div key={`${note.noteKey}-${index}`}>
                  <ClosedNote
                    noteKey={note.noteKey}
                    title={note.title}
                    date={note.date}
                    students={note.students}
                    data={note.data}
                  />
                  {index !== lastNote && <div className='h-[1px] bg-gray-30 w-full'></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {newNoteModal && (
        <Modal
          isOpen={newNoteModal}
          onCancel={() => setNewNoteModal(false)}
          onConfirm={onConfirm}
          title='쪽지 생성'
          containerStyle='w-[491px]'
        >
          <div className='flex flex-col gap-[10px] pt-[10px] pb-[35px]'>
            <div className='text-headline2 font-semibold'>쪽지 제목</div>
            <Input
              name='noteTitle'
              control={control}
              size='w-full h-[55px]'
              placeholder='제목을 입력하세요'
              maxLength={20}
              showCharacterCount={true}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
