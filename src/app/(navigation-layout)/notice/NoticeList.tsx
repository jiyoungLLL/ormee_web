import Image from 'next/image';

export default function NoticeList() {
  // 임시 데이터
  const tempData: { [key: string]: { [innerKey: string]: string | number } } = {
    pin: {
      number: 1,
      title: '출석 체크 꼭 하세요',
      writer: '강수이',
      date: '2025.01.20',
      views: 11,
    },
    list: {
      number: 1,
      title: '지우개 훔친 사람 자수해요',
      writer: '강수이',
      date: '2025.01.20',
      views: 1321,
    },
  };

  // list title
  const titleList: [string, string][] = [
    ['No.', 'w-[34px]'],
    ['제목', 'w-[394px]'],
    ['작성자', 'w-[68px]'],
    ['등록일', 'w-[82px]'],
    ['조회수', 'w-[45px]'],
  ];

  const renderPin = (key: string) => {
    if (key === 'pin') {
      return (
        <Image
          src='/assets/icons/pin.png'
          width={24}
          height={24}
          alt='핀 아이콘'
        />
      );
    }
  };

  return (
    <div className='absolute top-[196px] w-[1018px] max-h-[700px] rounded-[10px] px-[30px] py-[20px] flex flex-col bg-white overflow-auto'>
      <div className='w-full h-[50px] flex justify-between items-center py-[10px] border-b border-gray-30'>
        {titleList.map(([text, width], index) => (
          <div
            key={`${index}-${text}`}
            className={`${width} text-headline2 font-semibold text-gray-70`}
          >
            {text}
          </div>
        ))}
      </div>
      {/* 임시 데이터 기준 -> 나중에 수정 필요 */}
      {Object.keys(tempData).map((key, index) => {
        const item = tempData[key];

        return (
          <div
            key={index}
            className='w-full h-[50px] flex justify-between py-[10px] items-center '
          >
            <div className='w-[34px] flex justify-center text-headline2 font-gray-70'>
              {key === 'pin' ? renderPin(key) : item.number}
            </div>
            <div className='w-[394px] text-headline2 font-semibold'>{item.title}</div>
            <div className='w-[68px]'>{item.writer}</div>
            <div className='w-[82px]'>{item.date}</div>
            <div className='w-[45px]'>{item.views}</div>
          </div>
        );
      })}
    </div>
  );
}
