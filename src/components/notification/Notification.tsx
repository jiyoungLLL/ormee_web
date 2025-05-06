export default function Notification() {
  return (
    <button
      className='relative w-[28px] h-[28px] bg-no-repeat bg-center bg-contain'
      style={{
        backgroundImage: 'url(/assets/icons/header/bell-inactive.png)',
        backgroundSize: '19px 23px',
      }}
      aria-label='알림'
    />
  );
}
