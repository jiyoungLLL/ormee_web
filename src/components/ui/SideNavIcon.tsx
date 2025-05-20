import Image, { StaticImageData } from 'next/image';

import DropDownIcon from '/public/assets/icons/sidenav/dropdown.png';
import GuideIcon from '/public/assets/icons/sidenav/guide.png';
import HomeIcon from '/public/assets/icons/sidenav/home.png';
import HomeSelected from '/public/assets/icons/sidenav/home_selected.png';
import HomeworkIcon from '/public/assets/icons/sidenav/homework.png';
import HomeworkSelected from '/public/assets/icons/sidenav/homework_selected.png';
import NoteIcon from '/public/assets/icons/sidenav/note.png';
import NoteSelected from '/public/assets/icons/sidenav/note_selected.png';
import NoticeIcon from '/public/assets/icons/sidenav/notice.png';
import NoticeSelected from '/public/assets/icons/sidenav/notice_selected.png';
import PersonIcon from '/public/assets/icons/sidenav/person.png';
import QuestionIcon from '/public/assets/icons/sidenav/question.png';
import QuestionSelected from '/public/assets/icons/sidenav/question_selected.png';
import QuizIcon from '/public/assets/icons/sidenav/quiz.png';
import QuizSelected from '/public/assets/icons/sidenav/quiz_selected.png';
import SettingIcon from '/public/assets/icons/sidenav/setting.png';
import SettingSelected from '/public/assets/icons/sidenav/setting_selected.png';
import StudentIcon from '/public/assets/icons/sidenav/student.png';

const iconList: { [key: string]: { normal: StaticImageData; selected?: StaticImageData } } = {
  드롭다운: { normal: DropDownIcon },
  수강생: { normal: StudentIcon },
  강의홈: { normal: HomeIcon, selected: HomeSelected },
  퀴즈: { normal: QuizIcon, selected: QuizSelected },
  쪽지: { normal: NoteIcon, selected: NoteSelected },
  과제: { normal: HomeworkIcon, selected: HomeworkSelected },
  질문: { normal: QuestionIcon, selected: QuestionSelected },
  공지: { normal: NoticeIcon, selected: NoticeSelected },
  설정: { normal: SettingIcon, selected: SettingSelected },
  마이페이지설정: { normal: PersonIcon },
  마이페이지이용안내: { normal: GuideIcon },
};

interface SideNavIconProps {
  name: string;
  isFocus?: boolean;
}

export default function SideNavIcon({ name, isFocus }: SideNavIconProps) {
  const icon = iconList[name];
  const iconSrc = isFocus && icon?.selected ? icon.selected : icon?.normal;
  const iconSize = name === '드롭다운' ? '24' : name === '수강생' ? '18' : '22';

  if (!iconSrc) {
    return null;
  }

  return (
    <Image
      src={iconSrc}
      alt={name}
      width={iconSize}
      height={iconSize}
    />
  );
}
