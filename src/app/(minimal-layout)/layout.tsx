export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex-1 flex flex-col justify-center items-center w-full h-full min-h-screen'>{children}</main>
  );
}
