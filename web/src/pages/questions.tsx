import { IQuestion, IUser } from '@/interfaces';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import api from 'services/api';

interface Props {
  questions: IQuestion;
}

const Questions: React.FC<Props> = ({ questions }) => {
  console.log(questions);

  return <div></div>;
};

export default Questions;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'canvance.token': userToken } = parseCookies(ctx);
  const headers = { Authorization: `Bearer ${userToken}` };

  if (!userToken) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  try {
    const { data: user } = await api.get<IUser>('/user/profile', { headers });

    const userCategories = user.category.map((cat) => cat._id).join(',');
    const { data: questions } = await api.get<IQuestion>(
      `/questions/category/${userCategories}`,
      { headers }
    );

    return { props: { questions } };
  } catch (error) {
    console.log(error);

    toast.error('Ocorreu um erro ao carregar as perguntas.');

    return { props: {}, redirect: { destination: '/dashboard' } };
  }

  return { props: {} };
};
