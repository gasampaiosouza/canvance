import { Dispatch, SetStateAction } from 'react';

import { MenuOptionsInterface } from './';
import { MenuContainer } from './styles';

// icons
import { Settings, ViewQuilt } from '@styled-icons/material-rounded';

interface AccountMenuProps {
  active: MenuOptionsInterface;
  switcher: Dispatch<SetStateAction<MenuOptionsInterface>>;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ active, switcher }) => {
  return (
    <MenuContainer>
      <button
        className={active == 'profile' ? 'active' : ''}
        onClick={() => switcher('profile')}
      >
        <Settings />
        Geral
      </button>

      <button
        className={active == 'questions' ? 'active' : ''}
        onClick={() => switcher('questions')}
      >
        <ViewQuilt />
        Perguntas
      </button>
    </MenuContainer>
  );
};

export default AccountMenu;
