import AccountMenu from './menu';

import { useRouter } from 'next/router';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

import { Container, SelectedPageContainer } from './styles';
import UserQuestionSettings from './user-questions';

export type MenuOptionsInterface = 'profile' | 'questions';

const AccountContent = () => {
  const [menuOption, setMenuOption] = useState<MenuOptionsInterface>('profile');
  const router = useRouter();
  const { user } = useAuth();

  function handleChangePassword() {
    const passwordConfirmation = window.confirm('Deseja mesmo alterar a sua senha?');

    if (!passwordConfirmation) return;

    router.push('/account/change-password');
  }

  const UserGeneralSettings = () => (
    <>
      <table className="profile-data">
        <tbody>
          <tr>
            <td>Nome</td>
            <td>{user?.name}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>

          <tr>
            <td>Categoria</td>
            <td>{user?.category.map((cat) => cat.name).join(', ')}</td>
          </tr>

          {user?.manager?.name && (
            <tr>
              <td>Gerente</td>
              <td>{user?.manager?.name}</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleChangePassword} className="default-button">
        Redefinir senha
      </button>
    </>
  );

  return (
    <Container>
      <AccountMenu active={menuOption} switcher={setMenuOption} />

      <SelectedPageContainer>
        {/* PROFILE */}
        {menuOption === 'profile' && (
          <>
            <h3>Informações gerais da conta</h3>

            <UserGeneralSettings />
          </>
        )}

        {/* INTERFACE */}
        {menuOption === 'questions' && (
          <>
            <h3>Perguntas</h3>

            <UserQuestionSettings />
          </>
        )}
      </SelectedPageContainer>
    </Container>
  );
};

export default AccountContent;
