import { IUser } from '@/interfaces';
import React from 'react';
import ReactModal from 'react-modal';
import { InactiveModalContent, OverlayStyle } from './styles';

interface Props {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

const InactiveUserModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="login-modal"
      overlayElement={(props, contentElement) => (
        <OverlayStyle {...props}>{contentElement}</OverlayStyle>
      )}
    >
      <InactiveModalContent>
        <h3>
          O usuário {user.name || ''} foi <strong>desativado</strong>
        </h3>

        <p>
          Se essa conta pertence a você, contate os Recursos Humanos. Atualmente essa
          conta está <strong>inativa</strong>
        </p>

        <button className="default-button" onClick={onClose}>
          Entendi
        </button>
      </InactiveModalContent>
    </ReactModal>
  );
};

export default InactiveUserModal;
