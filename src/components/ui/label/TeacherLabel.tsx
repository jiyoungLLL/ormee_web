import Badge from '@/components/ui/Badge';
import { TeacherRole } from '@/types/teacher.types';

type TeacherLabelProps = {
  /** 이름 */
  name: string;
  /** 선생님 역할 (owner: 메인 선생님, partner: 공동 작업자) */
  role: TeacherRole;
};

const ROLE_LOGO_SRC: Record<TeacherRole, string> = {
  Owner: '/assets/icons/role/owner.png',
  Partner: '/assets/icons/role/partner.png',
} as const;

export default function TeacherLabel({ name, role }: TeacherLabelProps) {
  const roleLogoSrc = ROLE_LOGO_SRC[role];

  return (
    <Badge
      size='medium'
      color='lightGray'
      label={
        <div className='flex justify-center items-center gap-[2px]'>
          <img
            src={roleLogoSrc}
            alt={role}
            className='w-[12px] h-[12px]'
          />
          <span className='text-label2-normal font-semibold text-gray-60'>{name}</span>
          <span className='text-label2-normal font-normal text-gray-60'>선생님</span>
        </div>
      }
    />
  );
}
