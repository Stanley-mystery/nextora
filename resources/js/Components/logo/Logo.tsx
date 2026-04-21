import { FC } from 'react';
import { LogoProps } from './types';
import { Link } from 'react-router';

const Logo: FC<LogoProps> = ({ to = '#', variant = 'logo', ...props }) => {
  let logoUrl = '/logo.png';

  if (variant === 'logomark') logoUrl = '/logomark.png';

  const { height: h = 45, width: w = 170, ...linkProps } = props;

  return (
    <Link to={to} {...linkProps} className={`inline-block ${props.className}`}>
      <img src={logoUrl} alt="Logo" height={h} width={w} />
    </Link>
  );
};

export default Logo;
