import Avatar from './avatar';
import { Container, Title } from './styles';
import React from 'react';
import Notifications from './notifications';
import Breadcrumb from './breadcrumb';

interface IHeader {
  title: string;
  breadcrumb?: { label: string; href: string }[];
}

const Header: React.FC<IHeader> = ({ title, breadcrumb }) => {
  return (
    <Container>
      <div className="left-side">
        <Title>{title}</Title>

        {breadcrumb && <Breadcrumb items={breadcrumb} />}
      </div>

      <div className="right-side">
        <Notifications />
        <Avatar name="Gabriel Sampaio" />
      </div>
    </Container>
  );
};

export default Header;
