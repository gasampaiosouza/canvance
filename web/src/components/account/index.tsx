import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import AccountMenu from './menu';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container, SelectedPageContainer } from './styles';

export type MenuOptionsInterface = 'profile' | 'interface';

const AccountContent = () => {
  const [menuOption, setMenuOption] = useState<MenuOptionsInterface>('profile');
  const router = useRouter();
  const { user } = useAuth();

  function handleChangePassword() {
    const passwordConfirmation = window.confirm('Quer mesmo alterar a sua senha?');

    if (!passwordConfirmation) return;

    router.push('/account/change-password');
  }

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
                  <td>{user?.category.name}</td>
                </tr>
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
