import { Notification } from '@/types/notification.types';

export const MOCK_NOTIFICATION_LIST: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    createdAt: '오전 8시 40분',
    read: false,
    title: '미친토익 기본반 rc',
    description: '과제 마감까지 하루 남았습니다.',
  },
  {
    id: '2',
    type: 'question',
    createdAt: '오전 8시 40분',
    read: false,
    title: '미친토익 기본반 rc',
    description: '새로운 질문이 등록됐습니다.',
  },
  {
    id: '3',
    type: 'question',
    createdAt: '오후 3시 40분',
    read: true,
    title: '미친토익 기본반 rc',
    description: '새로운 질문이 등록됐습니다.',
  },
  {
    id: '4',
    type: 'question',
    createdAt: '오후 3시 40분',
    read: true,
    title: '미친토익 기본반 rc',
    description: '새로운 질문이 등록됐습니다.',
  },
];
