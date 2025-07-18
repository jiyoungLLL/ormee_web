// import { useState } from 'react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';

// export default function Collaborator() {
//   const [coworkerId, setCoworkerId] = useState('');
//   const [collaborators, setCollaborators] = useState<string[]>(data?.collaborators || []); // 기존 목록 로딩용

//   return (
//     <div className='flex flex-col gap-[10px] text-headline2 font-semibold'>
//       공동작업자 관리
//       <div className='flex gap-[10px]'>
//         <Input
//           name='coworkerInput'
//           control={undefined} // RHF 연결 안 함
//           size='w-full h-[50px]'
//           placeholder='아이디 입력'
//           type='text'
//           value={coworkerId}
//           onChange={(e) => setCoworkerId(e.target.value)}
//         />
//         <Button
//           type='BUTTON_BASE_TYPE'
//           size='h-[50px]'
//           font='text-healine1 font-bold text-purple-50 text-[18px]'
//           title='추가'
//           isPurple={true}
//           isfilled={false}
//           htmlType='button'
//           onClick={handleAddCoworker}
//         />
//       </div>
//     </div>
//   );
// }
