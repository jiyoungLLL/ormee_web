'use client';

import { MOCK_HOMEWORK_STUDENT } from '@/mock/homework';
import { format } from 'date-fns';
import { useState } from 'react';
import Checkbox from '../ui/checkbox/Checkbox';

type DetailProps = {
  onCheckedStudentsChange: (ids: string[]) => void;
};

const LIST_LABELS = ['No.', '수강생', '제출여부', '확인여부', '제출일시'];
const LIST_WIDTHS = ['w-[40px]', 'w-[89px]', 'w-[89px]', 'w-[89px]', 'w-[185px]'];

const STUDENT_SUBMIT = MOCK_HOMEWORK_STUDENT.data;

export default function HomeworkDetail({ onCheckedStudentsChange }: DetailProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const studentIds = STUDENT_SUBMIT.map((student) => `${student.assignmentSubmitId}`);

  const handleCheckItem = (checkboxId: string, isChecked: boolean) => {
    setCheckedItems((prev) => {
      const newChecked = { ...prev, [checkboxId]: isChecked };
      const checkedIds = Object.entries(newChecked)
        .filter(([_, checked]) => checked)
        .map(([id]) => id);
      onCheckedStudentsChange(checkedIds);
      return newChecked;
    });
  };

  const allChecked = studentIds.length > 0 && studentIds.every((id) => checkedItems[id]);

  const handleCheckAll = (isChecked: boolean) => {
    const newState: { [key: string]: boolean } = {};
    studentIds.forEach((id) => {
      newState[id] = isChecked;
    });
    setCheckedItems(newState);
    onCheckedStudentsChange(isChecked ? studentIds : []);
  };

  return (
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
        {/* GET 요청 : 전체/미제출/미확인 filter로 요청 보냄 */}
        {STUDENT_SUBMIT.map((data) => {
          const id = `${data.assignmentSubmitId}`;
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
              <div className={`${LIST_WIDTHS[0]}`}>{data.assignmentSubmitId}</div>
              <div className={`${LIST_WIDTHS[1]} font-semibold`}>{data.studentName}</div>
              <div className={`${LIST_WIDTHS[2]} font-semibold`}>{data.isSubmitted ? 'O' : 'X'}</div>
              <div className={`${LIST_WIDTHS[3]} font-semibold`}>{data.isChecked ? 'O' : 'X'}</div>
              <div className={`${LIST_WIDTHS[4]}`}>{format(data.createdAt, 'yyyy/MM/dd HH:mm:ss')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
