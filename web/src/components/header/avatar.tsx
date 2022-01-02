import Link from 'next/link';
import { UserInfo } from './styles';

interface IAvatar {
  name: string;
}

function getNameInitials(userName: string) {
  const names = userName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}

const Avatar: React.FC<IAvatar> = ({ name }) => {
  const avatar_colors = ['#ef476f', '#ffd166', '#06d6a0', '#f07167'];
  const random_number = Math.floor(Math.random() * avatar_colors.length);

  return (
    <Link href="/account">
      <UserInfo color={avatar_colors[random_number]}>{getNameInitials(name)}</UserInfo>
    </Link>
  );
};

export default Avatar;
