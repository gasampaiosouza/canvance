import { Fragment } from 'react';
import { ArrowIcon, BreadcrumbContainer } from './styles';

import Link from 'next/link';

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => {
        const className = index == 0 ? 'highlight' : '';

        return (
          <Fragment key={`breadcrumb-${index}`}>
            <Link href={item.href}>
              <a className={className}>{item.label}</a>
            </Link>

            {index !== items.length - 1 && <ArrowIcon />}
          </Fragment>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
