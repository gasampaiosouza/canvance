import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

interface SidebarItemProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, children, ...rest }) => {
  const { asPath: path } = useRouter();

  let activeClass = path == href ? 'active' : '';

  if (path.includes('admin')) {
    activeClass = path.includes(href) ? 'active' : '';
  }

  return (
    <Link href={href}>
      <a className={`sidebar-item ${activeClass}`} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default SidebarItem;
