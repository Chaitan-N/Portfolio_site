import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { BsArrowRightShort as ExternalLinkIcon } from 'react-icons/bs';

import { MenuContext } from '@/common/context/MenuContext';
import { MenuItemProps } from '@/common/types/menu';

const MenuItem = ({ title, href, icon, onClick }: MenuItemProps) => {
  const { hideNavbar } = useContext(MenuContext);
  const [isHovered, setIsHovered] = useState(false);
  const isExternalUrl = href?.includes('http');
  const isHashLink = href === '#';
  const router = useRouter();

  const activeClasses = `flex items-center gap-2 py-2 px-4 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 ${
    router.pathname === href
      ? 'bg-neutral-200 rounded-lg dark:bg-neutral-800 text-neutral-900 dark:!text-neutral-300'
      : 'hover:dark:bg-neutral-800 md:hover:bg-neutral-200 md:hover:rounded-lg md:hover:scale-105 lg:transition-all lg:duration-300'
  }`;

  const handleClick = () => {
    hideNavbar();
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const elementProps = {
    className: `${activeClasses}`,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const itemComponent = () => {
    return (
      <div {...elementProps}>
        <div>{icon}</div>
        <div className='flex-grow ml-0.5'>{title}</div>
        {isExternalUrl && isHovered && (
          <ExternalLinkIcon
            size={22}
            className='text-gray-500 -rotate-45 lg:transition-all lg:duration-300'
          />
        )}
      </div>
    );
  };

  return isHashLink ? (
    <div className='cursor-pointer'>{itemComponent()}</div>
  ) : (
    <Link
      href={href}
      target={isExternalUrl ? '_blank' : ''}
      onClick={handleClick}
    >
      {itemComponent()}
    </Link>
  );
};

export default MenuItem;
