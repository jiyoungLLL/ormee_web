export const MOCK_HOMEWORK = {
  status: 'success',
  code: 200,
  data: {
    openedAssignments: [
      {
        id: 11,
        title: '10/20 과제',
        description:
          '안녕하세요, 수업 열심히 따라와 주시는 우리 수강생 여러분! 강수이 강사입니다 😊 이번 주 수업 내용 복습 잘 하고 계시죠?',
        filePaths: 'VnZePvrqJ/test1.txt',
        openTime: '2024-06-01T00:00:00',
        dueTime: '2024-06-07T00:00:00',
      },
      {
        id: 10,
        title: '5/30 과제',
        description:
          '안녕하세요, 수업 열심히 따라와 주시는 우리 수강생 여러분! 강수이 강사입니다 😊 이번 주 수업 내용 복습 잘 하고 계시죠?',
        filePaths: null,
        openTime: '2024-06-02T00:00:00',
        dueTime: '2024-06-03T00:00:00',
      },
      {
        id: 9,
        title: '이번주 과제',
        description:
          '안녕하세요, 수업 열심히 따라와 주시는 우리 수강생 여러분! 강수이 강사입니다 😊 이번 주 수업 내용 복습 잘 하고 계시죠?',
        filePaths: null,
        openTime: '2024-06-08T00:00:00',
        dueTime: '2024-06-08T00:00:00',
      },
    ],
    closedAssignments: [
      {
        id: 12,
        title: '"10/29 과제"',
        description: null,
        filePaths: null,
        openTime: null,
        dueTime: null,
      },
      {
        id: 11,
        title: '"10/29 과제"',
        description: null,
        filePaths: null,
        openTime: null,
        dueTime: '2024-06-03T00:00:00',
      },
      {
        id: 10,
        title: '"10/29 과제"',
        description: null,
        filePaths: null,
        openTime: '2024-06-03T00:00:00',
        dueTime: '2024-06-03T00:00:00',
      },
    ],
  },
};

export const MOCK_HOMEWORK_STUDENT = {
  status: 'success',
  code: 200,
  data: [
    {
      assignmentSubmitId: 1,
      studentName: '홍길동',
      isSubmitted: true,
      isChecked: false,
      createdAt: '2025-05-25T01:01:08.045806',
    },
    {
      assignmentSubmitId: 2,
      studentName: '홍길동',
      isSubmitted: true,
      isChecked: false,
      createdAt: '2025-05-25T01:01:51.937216',
    },
    {
      assignmentSubmitId: 4,
      studentName: '홍길동',
      isSubmitted: true,
      isChecked: false,
      createdAt: '2025-05-25T01:04:28.487543',
    },
  ],
};
