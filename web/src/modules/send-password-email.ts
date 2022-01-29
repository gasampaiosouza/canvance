import api from 'services/api';

export interface MailProps {
  success: boolean;
  message: string;
}

export async function sendPasswordMail(email: string) {
  if (!email) return { success: false };

  try {
    const response = await api.post<MailProps>('/auth/forgot_password', { email });

    return response.data;
  } catch (error) {
    return { success: false };
  }
}
