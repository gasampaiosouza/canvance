import Link from 'next/link';

import {
  Assignment,
  PermIdentity,
  EmojiPeople,
  AdminPanelSettings,
} from '@styled-icons/material-rounded';
import SidebarItem from './sidebar-item';

import {
  Container,
  Logo,
  SidebarItems,
  LogoutContainer,
  SidebarSubItems,
} from './styles';

import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'hooks/useAuth';

const Sidebar: React.FC = () => {
  const { asPath } = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Logo>
        <Link href="/">
          <a>Canvance</a>
        </Link>
      </Logo>

      <SidebarItems>
        <SidebarItem href="/dashboard">
          <Assignment /> Meu progresso
        </SidebarItem>

        <SidebarItem href="/account">
          <PermIdentity /> Minha conta
        </SidebarItem>

        {user?.permissionLevel === 1 ? (
          <>
            <SidebarItem href="/admin">
              <AdminPanelSettings /> Painel de administração
            </SidebarItem>

            <SidebarSubItems>
              <Link href="/admin/users">
                <a className={asPath.includes('/admin/users') ? 'active' : ''}>
                  Gerenciar usuários
                </a>
              </Link>

              <Link href="/admin/tasks">
                <a className={asPath.includes('/admin/tasks') ? 'active' : ''}>
                  Gerenciar tarefas
                </a>
              </Link>

              <Link href="/admin/categories">
                <a className={asPath.includes('/admin/categories') ? 'active' : ''}>
                  Gerenciar categorias
                </a>
              </Link>

              <Link href="/admin/questions">
                <a className={asPath.includes('/admin/questions') ? 'active' : ''}>
                  Gerenciar perguntas
                </a>
              </Link>
            </SidebarSubItems>
          </>
        ) : null}
      </SidebarItems>

      <LogoutContainer>
        <EmojiPeople />

        <div className="user-details">
          <p>{user?.name}</p>
          <span onClick={signOut}>Sair</span>
        </div>
      </LogoutContainer>
    </Container>
  );
};

export default Sidebar;
