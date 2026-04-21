import { Button as AntButton, Form, ButtonProps as AntdButtonProps } from 'antd';
import { cn } from '@/utils';
import { FC, PropsWithChildren } from 'react';

interface ButtonProps extends AntdButtonProps {
  className?: string;
  withFormItem?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ className, children, withFormItem = false, ...props }) => {
  const _button = (
    <AntButton
      className={cn('py-5 font-medium', className, {
        'pt-5 pb-6': props.block,
      })}
      {...props}
    >
      {children}
    </AntButton>
  );

  if (!withFormItem) return _button;

  return <Form.Item>{_button}</Form.Item>;
};

export default Button;
