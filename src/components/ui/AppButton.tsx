import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

type AppButtonProps = {
  label: string;
  href?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  rounded?: string;
  target?: '_blank' | '_self';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const AppButton = ({
  label,
  href,
  icon,
  iconPosition = 'left',
  width = 'w-fit',
  height = 'h-12',
  bgColor = 'bg-secondary',
  textColor = 'text-primary-foreground',
  hoverBgColor = 'hover:bg-primary/90 hover:text-white',
  rounded = 'rounded-md',
  target = '_self',
  onClick,
  className,
  disabled,
}: AppButtonProps) => {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 px-3 md:px-6 text-sm font-semibold transition shadow',
    'disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    width,
    height,
    bgColor,
    textColor,
    hoverBgColor,
    rounded,
    className,
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="inline-flex items-center leading-none">{icon}</span>
      )}

      <span>{label}</span>

      {icon && iconPosition === 'right' && (
        <span className="inline-flex items-center leading-none">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      type="button">
      {content}
    </button>
  );
};

export default AppButton;
