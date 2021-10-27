import Avatar from './avatar';
import { Container, Title } from './styles';
import React from 'react';
import Notifications from './notifications';
import Breadcrumb from './breadcrumb';
import { useAuth } from 'hooks/useAuth';

interface IHeader {
  title: string;
  breadcrumb?: { label: string; href: string }[];
}

const Header: React.FC<IHeader> = ({ title, breadcrumb }) => {
  const { user } = useAuth();

  return (
    <Container>
      <div className="left-side">
        <Title>{title}</Title>

        {breadcrumb && <Breadcrumb items={breadcrumb} />}
      </div>

      <div className="right-side">
        <Notifications />
        <Avatar name={user?.name || ''} />
      </div>
    </Container>
  );
};

export default Header;
