import { UserInfo } from './styles';
import Link from 'next/link';

interface IAvatar {
  name: string;
}

const getNameInitials = (userName: string) => {
  const names = userName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

const Avatar: React.FC<IAvatar> = ({ name }) => {
  // const avatar_colors = ['#ef476f', '#ffd166', '#06d6a0', '#f07167'];
  // const random_number = Math.floor(Math.random() * avatar_colors.length + 1);

  return (
    <Link href="/account">
      <a>
        <UserInfo color="#6E44FF">{getNameInitials(name)}</UserInfo>
      </a>
    </Link>
  );
};

export default Avatar;
