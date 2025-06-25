'use client';

import { noteSchema } from '@/features/note/note.schema';
import { PostNote } from '@/features/note/note.types';
import { useGetNotes, usePostNotes, usePutNotes } from '@/features/note/useNoteApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import ClosedNote from './ClosedNote';
import OpenNote from './OpenNote';

export default function NoteContent() {
  const lectureId = useLectureId();
  // GET
  const { data } = useGetNotes(lectureId);
  const openNotes = data?.openMemos ?? [];
  const closedNotes = data?.closeMemos ?? [];
  // POST
  const { mutate: postNote } = usePostNotes(lectureId);
  // PUT
  const { mutate: putNote } = usePutNotes(lectureId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostNote>({
    resolver: zodResolver(noteSchema),
    mode: 'onSubmit',
  });
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [openClosedNoteId, setOpenClosedNoteId] = useState<number | null>(null);

  const { addToast } = useToastStore();

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
    if (openNotes.length === 1) {
      addToast({ message: '쪽지는 최대 1개까지 생성 가능해요.', type: 'error', duration: 2500 });
      return;
    }
    setNewNoteModal(true);
    reset();
  };

  const onConfirm = handleSubmit(
    (data) => {
      postNote(
        { title: data.title },
        {
          onSuccess: () => {
            setNewNoteModal(false);
            reset();
          },
        },
      );
    },
    (errors) => {
      if (errors.title) addToast({ message: errors.title.message || '', type: 'error', duration: 2500 });
    },
  );

  const handleClosingNote = (noteId: number) => {
    putNote(noteId.toString());
  };

  return (
    <div className='absolute top-[125px] w-[1018px] h-[730px] bg-white rounded-[20px] px-[30px] py-[20px] flex flex-col'>
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
          {openNotes.length > 0 ? (
            openNotes.map((note, key) => (
              <OpenNote
                key={key}
                title={note.title}
                date={formatDate(new Date(note.dueTime))}
                totalCount={note.totalCount}
                submitCount={note.submitCount}
                onClick={() => handleClosingNote(note.id)}
              />
            ))
          ) : (
            <div className='w-full rounded-[15px] flex justify-center px-[10px] py-[20px]'>
              <div className='text-heading2 font-semibold text-label-assistive'>진행 중인 쪽지가 없어요</div>
            </div>
          )}
        </div>
        {closedNotes.length > 0 && (
          <div className={commonStyle}>
            <div>마감 쪽지</div>
            <div className='flex flex-col gap-[5px]'>
              {closedNotes.map((note, index) => {
                const isLast = index === closedNotes.length - 1;
                const isOpen = openClosedNoteId === note.id;

                return (
                  <div key={`${note.id}-${index}`}>
                    <ClosedNote
                      noteId={note.id}
                      title={note.title}
                      date={formatDate(new Date(note.dueTime))}
                      totalCount={note.totalCount}
                      submitCount={note.submitCount}
                      isOpen={isOpen}
                      onClick={() => setOpenClosedNoteId((prev) => (prev === note.id ? null : note.id))}
                    />
                    {!isLast && <div className='h-[1px] bg-gray-30 w-full'></div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {newNoteModal && (
        <Modal
          isOpen={newNoteModal}
          onCancel={() => setNewNoteModal(false)}
          onConfirm={onConfirm}
          title='쪽지 생성'
          containerStyle='w-[491px] bg-white rounded-[15px] px-[30px] py-[20px] flex flex-col'
          titleContainerStyle='flex flex-col w-full gap-[13px] mb-[10px]'
        >
          <div className='flex flex-col gap-[10px] pt-[10px] pb-[35px]'>
            <div className='text-headline2 font-semibold'>쪽지 제목</div>
            <Input
              name='title'
              control={control}
              size='w-full h-[50px]'
              placeholder='제목을 입력해 주세요'
              maxLength={20}
              showCharacterCount={true}
              textStyle='text-headline1 font-semibold'
              inputStyle='rounded-[10px] border border-gray-20 px-[20px] py-[15px] focus:border-[1px] focus:border-purple-50 focus:outline-none'
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
