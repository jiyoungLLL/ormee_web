import Student from './Student';

type StudentProps = {
  numId: number;
  image: string;
  name: string;
  joinDate: string;
  memo?: string;
};

type StudentListProps = {
  studentData: StudentProps[];
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function StudentList({ studentData, checkedList, setCheckedList }: StudentListProps) {
  const isAllChecked = studentData.length > 0 && checkedList.length > 0 && checkedList.length === studentData.length;

  const handleCheck = (id: string, isChecked: boolean) => {
    setCheckedList((prev) => (isChecked ? [...prev, id] : prev.filter((item) => item !== id)));
  };

  const handleAllCheck = (id: string, isChecked: boolean) => {
    if (id !== 'all') return;

    if (isChecked) {
      const allIds = studentData.map((student) => `${student.numId}-${student.name}-${student.joinDate}`);
      setCheckedList(allIds);
    } else {
      setCheckedList([]);
    }
  };

  const renderStudentsList = () => {
    if (studentData.length > 0) {
      return studentData.map((data, index) => {
        const listId = `${data.numId}-${data.name}-${data.joinDate}`;

        return (
          <div key={`${index}-${data}`}>
            <Student
              type='student'
              studentData={data}
              isChecked={checkedList.includes(listId)}
              onCheck={handleCheck}
            />
          </div>
        );
      });
    } else {
      return <Student type='noSearch' />;
    }
  };

  return (
    <div className='absolute top-[196px] w-[1018px] h-[666px] overflow-y-auto px-[30px] py-[20px] bg-white flex flex-col gap-[10px] rounded-[10px]'>
      <Student
        type='title'
        isChecked={isAllChecked}
        onCheck={handleAllCheck}
      />
      <div className='w-full h-[1px] bg-gray-30'></div>
      <div className='w-full flex flex-col'>{renderStudentsList()}</div>
    </div>
  );
}
