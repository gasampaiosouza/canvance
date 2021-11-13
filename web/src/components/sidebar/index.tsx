import Link from 'next/link';

import { Assignment, PermIdentity, EmojiPeople } from '@styled-icons/material-rounded';
import SidebarItem from './sidebar-item';

import { Container, Logo, SidebarItems, LogoutContainer } from './styles';
import { useAuth } from 'hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Logo>
        <Link href="/">
          <a>Canvance</a>
        </Link>
      </Logo>

      <SidebarItems>
        <SidebarItem href="/">
          <Assignment /> Meu progresso
        </SidebarItem>

        <SidebarItem href="/account">
          <PermIdentity /> Minha conta
        </SidebarItem>
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
