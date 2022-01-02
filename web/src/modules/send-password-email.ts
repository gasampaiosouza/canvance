import { MailProps } from '@/pages/account/change-password';
import api from 'services/api';

export async function sendPasswordMail(email: string) {
  try {
    const response = await api.post<MailProps>('/auth/forgot_password', { email });

    return response.data;
  } catch (error) {
    return { success: false };
  }
}
