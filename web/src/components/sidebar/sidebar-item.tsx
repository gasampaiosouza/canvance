import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

interface SidebarItemProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, children, ...rest }) => {
  const { asPath: path } = useRouter();

  return (
    <Link href={href}>
      <a className={`sidebar-item ${path.includes(href) ? 'active' : ''}`} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default SidebarItem;
