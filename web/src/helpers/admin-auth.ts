import { IUser } from '@/interfaces';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import api from 'services/api';

export const handleAdminAuthentication = async (
  ctx: GetServerSidePropsContext,
  props: Record<string, unknown> = {}
) => {
  const { 'canvance.token': token } = parseCookies(ctx);

  if (!token) return { redirect: { destination: '/login', permanent: false } };

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  try {
    const { data: user } = await api.get<IUser>(`/user/profile`);

    if (user.permissionLevel != 1) {
      return { redirect: { statusCode: 303, destination: '/' }, props };
    }

    return { props };
  } catch (error: any) {
    return { redirect: { statusCode: 303, destination: '/' }, props };
  }
};
