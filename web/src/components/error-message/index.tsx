import { Message } from './styles';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = '' }) => {
  return <Message className="error-message">{message}</Message>;
};
