import { IQuestion, IUser } from '@/interfaces';
import QuestionsContent from 'components/questions/questions-content';
import { Container, Limiter, QuestionsContainer } from 'components/questions/styles';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from 'services/api';

import Head from 'next/head';

interface Props {
  questions: IQuestion[];
}

const Questions: React.FC<Props> = ({ questions }) => {
  const [goToQuestions, setGoToQuestions] = useState(false);

  return (
    <>
      <Head>
        <title>Canvance - Questionário</title>
      </Head>

      <Container>
        <Limiter>
          {!goToQuestions ? (
            <>
              <h1>
                Seja bem vindo a <strong>Econverse</strong>!
              </h1>

              <QuestionsContainer style={{ minHeight: 'auto' }}>
                <>
                  <p>
                    Para conhecermos você melhor, vamos precisar que você responda a{' '}
                    <strong>{questions.length} perguntas</strong> sobre você, ok?
                  </p>
                  <p>Então se ajeite na cadeira, pegue uma água e vamos lá!</p>

                  <button
                    className="default-button"
                    onClick={() => setGoToQuestions(true)}
                  >
                    Estou pronto!
                  </button>
                </>
              </QuestionsContainer>
            </>
          ) : (
            <QuestionsContent questions={questions} />
          )}
        </Limiter>
      </Container>
    </>
  );
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
