import Link from 'next/link';

import { Assignment, PermIdentity } from '@styled-icons/material-rounded';
import SidebarItem from './sidebar-item';

import { Container, Logo, SidebarItems } from './styles';

const Sidebar: React.FC = () => {
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
    </Container>
  );
};

export default Sidebar;
