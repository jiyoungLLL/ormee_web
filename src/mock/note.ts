import { ClosedNoteData, OpenNoteData } from '@/types/note.types';

export const MOCK_OPENNOTE: Record<string, OpenNoteData> = {
  '0': {
    noteKey: '5/15',
    title: '5/15 쪽지',
    date: '2025.05.15 15:00',
  },
};
export const MOCK_CLOSEDNOTE: Record<string, ClosedNoteData> = {
  '0': {
    noteKey: '10/29',
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    students: 21,
    data: [
      ['문항 4', '70%', 16],
      ['문항 4', '70%', 10],
      ['문항 4', '70%', 8],
      ['문항 4', '70%', 3],
    ],
  },
  '1': {
    noteKey: '10/29',
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    students: 21,
    data: [
      ['문항 4', '70%', 16],
      ['문항 4', '70%', 10],
      ['문항 4', '70%', 8],
      ['문항 4', '70%', 3],
    ],
  },
  '3': {
    noteKey: '10/29',
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    students: 21,
    data: [
      ['문항 4', '70%', 16],
      ['문항 4', '70%', 10],
      ['문항 4', '70%', 8],
      ['문항 4', '70%', 3],
    ],
  },
  '4': {
    noteKey: '10/29',
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    students: 21,
    data: [
      ['문항 4', '70%', 16],
      ['문항 4', '70%', 10],
      ['문항 4', '70%', 8],
      ['문항 4', '70%', 3],
    ],
  },
  '5': {
    noteKey: '10/29',
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    students: 21,
    data: [
      ['문항 4', '70%', 16],
      ['문항 4', '70%', 10],
      ['문항 4', '70%', 8],
      ['문항 4', '70%', 3],
    ],
  },
};
