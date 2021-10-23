import Link from 'next/link';

import { Assignment, PermIdentity } from '@styled-icons/material-rounded';
import SidebarItem from './sidebar-item';

import { Container, SidebarLogo, SidebarItems } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <SidebarLogo>
        <Link href="/">
          <a>Canvance</a>
        </Link>
      </SidebarLogo>

      <SidebarItems>
        <SidebarItem href="/dashboard">
          <Assignment /> Meu progresso
        </SidebarItem>

        <SidebarItem href="/account">
          <PermIdentity /> Minha conta
        </SidebarItem>

        <SidebarItem href="/another">
          <Assignment /> Algum item a mais
        </SidebarItem>
      </SidebarItems>
    </Container>
  );
};

export default Sidebar;
