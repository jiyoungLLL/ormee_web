import SideNav from '../ui/SideNav';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  const ex = {
    title: ['오르미 토익 RC', '오르미 토익 LC'],
    student: 24,
    date: {
      days: ['월', '수'],
      times: ['15:30 - 16:00'],
    },
  };

  return (
    <div>
      <SideNav
        type='upper'
        title={ex.title}
        student={ex.student}
        date={ex.date}
      />
      <SideNav type='lower' />
      <main>{children}</main>
    </div>
  );
}
