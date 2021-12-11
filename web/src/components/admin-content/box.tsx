import { Box } from './styles';
import Link from 'next/link';

interface AdminBoxProps {
  title: string;
  to: string;
}

const AdminBox: React.FC<AdminBoxProps> = ({ title, to }) => {
  return (
    <Link href={to}>
      <Box>
        <h2>{title}</h2>
      </Box>
    </Link>
  );
};

export default AdminBox;
