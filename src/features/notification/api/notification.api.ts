'use server';

export const putNotificationAsRead = async (notificationId: number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/teachers/notifications/${notificationId}`, {
    method: 'PUT',
    credentials: 'include',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 읽음 처리 실패------------');
      console.error('API URL: ', `${process.env.API_BASE_URL}/teachers/notifications/${notificationId}`);
      console.error('에러 메세지: ', response.statusText);
      console.error('응답: ', response.status);
    }

    throw new Error('메세지 읽음 요청 실패');
  }

  const json = await response.json();

  if (json.status === 'fail') {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 읽음 처리 실패------------');
      console.error('에러 메세지: ', json.data);
      console.error('응답: ', response);
    }

    throw new Error(json.data);
  }

  return json;
};

export const deleteNotification = async (notificationId: number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/teachers/notifications/${notificationId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 삭제 실패------------');
      console.error('API URL: ', `${process.env.API_BASE_URL}/teachers/notifications/${notificationId}`);
      console.error('에러 메세지: ', response.statusText);
      console.error('응답: ', response.status);
    }

    throw new Error('알림 삭제 요청 실패');
  }

  const json = await response.json();

  if (json.status === 'fail') {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 삭제 실패------------');
      console.error('에러 메세지: ', json.data);
      console.error('응답: ', response);
    }

    throw new Error(json.data);
  }

  return json;
};

export const putAllNotificationsAsRead = async (lectureId: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/teachers/${lectureId}/notifications`, {
    method: 'PUT',
    credentials: 'include',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 모두 읽음 처리 실패------------');
      console.error('API URL: ', `${process.env.API_BASE_URL}/teachers/${lectureId}/notifications`);
      console.error('에러 메세지: ', response.statusText);
      console.error('응답: ', response.status);
    }

    throw new Error('알림 모두 읽음 처리 실패');
  }

  const json = await response.json();

  if (json.status === 'fail') {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 모두 읽음 처리 실패------------');
      console.error('에러 메세지: ', json.data);
      console.error('응답: ', response);
    }

    throw new Error(json.data);
  }

  return json;
};

export const deleteAllNotifications = async (lectureId: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/teachers/${lectureId}/notifications`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 모두 삭제 실패------------');
      console.error('API URL: ', `${process.env.API_BASE_URL}/teachers/${lectureId}/notifications`);
      console.error('에러 메세지: ', response.statusText);
      console.error('응답: ', response.status);
    }

    throw new Error('알림 모두 삭제 요청 실패');
  }

  const json = await response.json();

  if (json.status === 'fail') {
    if (process.env.NODE_ENV === 'development') {
      console.error('------------알림 모두 삭제 실패------------');
      console.error('에러 메세지: ', json.data);
      console.error('응답: ', response);
    }

    throw new Error(json.data);
  }

  return json;
};
