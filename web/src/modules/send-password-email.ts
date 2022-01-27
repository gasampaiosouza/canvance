import api from 'services/api';

export interface MailProps {
  success: boolean;
  message: string;
}

export async function sendPasswordMail(email: string) {
  try {
    const response = await api.post<MailProps>('/auth/forgot_password', { email });

    return response.data;
  } catch (error) {
    return { success: false };
  }
}
