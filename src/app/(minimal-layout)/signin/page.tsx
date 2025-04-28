import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-[50px] w-[400px] h-fit'>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <Image
          src='/assets/images/brand/logo.png'
          alt='오르미 로고'
          width={160}
          height={29.79}
        />
        <h1 className='text-gray-70 text-heading2 font-semibold'>체계적인 수업 관리 서비스 오르미</h1>
      </div>
      <div className='flex flex-col justify-center items-center gap-[12px]'>
        {/* TODO: 공통 컴포넌트로 수정 Input, Button */}
        <input
          type='text'
          placeholder='아이디'
        />
        <input
          type='password'
          placeholder='비밀번호'
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-[30px]'>
        <button>로그인</button>
        <div className='flex flex-row justify-center items-center gap-[16px] text-gray-70 text-body1-normal'>
          <Link href='#'>아이디/비번 찾기</Link>
          <span className='text-gray-30'>|</span>
          <Link href='/signup'>회원가입</Link>
        </div>
      </div>
    </div>
  );
}
