import AccountMenu from './menu';

import { useRouter } from 'next/router';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

import { Container, SelectedPageContainer } from './styles';

export type MenuOptionsInterface = 'profile' | 'interface';

const AccountContent = () => {
  const [menuOption, setMenuOption] = useState<MenuOptionsInterface>('profile');
  const router = useRouter();
  const { user } = useAuth();

  function handleChangePassword() {
    const passwordConfirmation = window.confirm('Deseja mesmo alterar a sua senha?');

    if (!passwordConfirmation) return;

    router.push('/account/change-password');
  }

  console.log(user);

  return (
    <Container>
      <AccountMenu active={menuOption} switcher={setMenuOption} />

      <SelectedPageContainer>
        {/* PROFILE */}
        {menuOption === 'profile' && (
          <>
            <h3>Informações gerais da conta</h3>

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
        )}

        {/* INTERFACE */}
        {menuOption === 'interface' && (
          <>
            <h3>Interface</h3>

            <table>
              <tbody>
                <tr>
                  <td>Tema</td>
                  <td>
                    <select>
                      <option>Escuro</option>
                      <option>Claro</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Linguagem</td>
                  <td>
                    <select>
                      <option>Português</option>
                      <option>Inglês</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </SelectedPageContainer>
    </Container>
  );
};

export default AccountContent;
