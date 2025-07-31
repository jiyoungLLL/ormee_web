'use client';

import { useGetStudentHomework } from '@/features/homework/hooks/useHomeworkApi';
import { MOCK_HOMEWORK_STUDENT } from '@/mock/homework';
import { format } from 'date-fns';
import { useState } from 'react';
import Button from '../ui/Button';
import Checkbox from '../ui/checkbox/Checkbox';
import Dropdown from '../ui/dropdown/Dropdown';

type DetailProps = {
  homeworkId: number;
};

const LIST_LABELS = ['No.', '수강생', '제출여부', '확인여부', '제출일시'];
const LIST_WIDTHS = ['w-[40px]', 'w-[89px]', 'w-[89px]', 'w-[89px]', 'w-[185px]'];

const STUDENT_SUBMIT = MOCK_HOMEWORK_STUDENT.data;

export default function HomeworkDetail({ homeworkId }: DetailProps) {
  const [selected, setSelected] = useState<Record<number, '전체' | '미제출' | '미확인'>>({});
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const menuList = (id: number) => [
    { id: 'hw-all', label: '전체', onClick: () => setSelected((prev) => ({ ...prev, [id]: '전체' })) },
    { id: 'hw-submit', label: '미제출', onClick: () => setSelected((prev) => ({ ...prev, [id]: '미제출' })) },
    { id: 'hw-check', label: '미확인', onClick: () => setSelected((prev) => ({ ...prev, [id]: '미확인' })) },
  ];

  const { data: submitData } = useGetStudentHomework(homeworkId, '전체');

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const studentIds = submitData?.map((student) => `${student.homeworkSubmitId}`);

  const handleCheckItem = (checkboxId: string, isChecked: boolean) => {
    setCheckedItems((prev) => {
      const newChecked = { ...prev, [checkboxId]: isChecked };
      const checkedIds = Object.entries(newChecked)
        .filter(([_, checked]) => checked)
        .map(([id]) => id);
      return newChecked;
    });
  };

  const allChecked = studentIds && studentIds.length > 0 && studentIds.every((id) => checkedItems[id]);

  const handleCheckAll = (isChecked: boolean) => {
    const newState: { [key: string]: boolean } = {};
    if (studentIds) {
      studentIds.forEach((id) => {
        newState[id] = isChecked;
      });
    }
    setCheckedItems(newState);
  };

  const handleHomeworkAlarm = () => {
    alert(selectedStudentIds);
  };

  return (
    <div className='px-[30px] py-[20px] mb-[20px] bg-gray-10 rounded-[15px] flex flex-col'>
      <div className='flex justify-end'>
        <div className='w-[227px] flex justify-between'>
          <Dropdown
            showTrigger={true}
            menuList={menuList(homeworkId)}
            selectedItem={selected[homeworkId] || '전체'}
            triggerAreaOnOpenStyle='bg-gray-10'
            triggerAreaOnCloseStyle='bg-gray-10'
          />
          <Button
            type='BUTTON_BASE_TYPE'
            size='h-[40px]'
            font='text-headline2 font-semibold leading-[4px]'
            title='과제 알림'
            isPurple={true}
            onClick={handleHomeworkAlarm}
          />
        </div>
      </div>

      <div className='w-full px-[10px] flex flex-col gap-[16px]'></div>
      <div className='flex flex-col gap-[16px]'>
        <div className='flex gap-[40px] text-label font-semibold text-gray-70'>
          <Checkbox
            id='hw-detail-index'
            checked={allChecked}
            checkItemHandler={(_, isChecked) => handleCheckAll(isChecked)}
          />
          {LIST_LABELS.map((label, index) => (
            <div
              key={`${label}-${index}`}
              className={`text-center ${LIST_WIDTHS[index]}`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-[16px]'>
          {submitData?.map((data, index) => {
            const id = `${data.homeworkSubmitId}`;
            return (
              <div
                key={`${id}-${data.studentName}`}
                className='flex gap-[40px] text-headline2 text-center'
              >
                <Checkbox
                  id={id}
                  checked={checkedItems[id] || false}
                  checkItemHandler={handleCheckItem}
                />
                <div className={`${LIST_WIDTHS[0]}`}>{index + 1}</div>
                <div className={`${LIST_WIDTHS[1]} font-semibold`}>{data.studentName}</div>
                <div className={`${LIST_WIDTHS[2]} font-semibold`}>{data.isSubmitted ? 'O' : 'X'}</div>
                <div className={`${LIST_WIDTHS[3]} font-semibold`}>{data.isChecked ? 'O' : 'X'}</div>
                <div className={`${LIST_WIDTHS[4]}`}>{format(data.createdAt, 'yyyy/MM/dd HH:mm:ss')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
