import { Form, FormItemProps, Input as AntInput } from 'antd';
import { FC } from 'react';
import { cn } from '@/utils';

interface EmailProps extends FormItemProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  withFormItem?: boolean;
  disabled?: boolean;
  formItemClassName?: string;
}

const Email: FC<EmailProps> = ({
  required,
  placeholder = 'Email',
  name,
  className,
  withFormItem = true,
  disabled,
  formItemClassName,
  ...props
}) => {
  const input = (
    <AntInput
      allowClear
      placeholder={placeholder}
      maxLength={275}
      className={cn('py-2.5', className)}
      disabled={disabled}
      inputMode="email"
    />
  );

  if (!withFormItem) return input;

  return (
    <Form.Item
      name={name}
      rules={[
        {
          type: 'email',
          required: required ?? true,
          message: 'Please provide a valid email',
          whitespace: true,
        },
      ]}
      className={cn('mb-4', formItemClassName)}
      {...props}
      label={props?.label && <span className="text-gray-400 text-sm font-medium">{props?.label}</span>}
    >
      {input}
    </Form.Item>
  );
};

export default Email;
