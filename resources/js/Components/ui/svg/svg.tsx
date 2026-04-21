import classNames from 'classnames';
import { FC, ComponentType, createElement } from 'react';

interface SvgComponentProps {
  height?: number | null;
  width?: number | null;
  className?: string;
}

export interface SvgProps {
  component: ComponentType<SvgComponentProps> | null | string;
  height?: number;
  width?: number;
  center?: boolean;
  className?: string;
}

const Svg: FC<SvgProps> = ({ component = null, height = null, width = null, center = null, className = '' }) => {
  const classes = classNames(center ? 'mx-auto' : '', className);

  if (!component) return null;

  const SvgComponent = createElement(component, { height, width, className: classes });

  return SvgComponent;
};

export default Svg;
