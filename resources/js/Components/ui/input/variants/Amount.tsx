import { cn } from '@/utils';
import { Form, FormItemProps, InputNumber as AntInputNumber } from 'antd';
import { FC } from 'react';

interface NumberProps extends FormItemProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  formItemClassName?: string;
  withFormItem?: boolean;
  noValidationMessage?: boolean;
  min?: string;
  maxLength?: number;
  prefix?: string;
}

const Number: FC<NumberProps> = ({
  required = true,
  placeholder = '',
  name,
  className,
  formItemClassName,
  withFormItem = true,
  noValidationMessage = false,
  min = '1',
  maxLength = 22,
  prefix,
  ...props
}) => {
  const inputValidator = (_: unknown, value: string | number | null) => {
    const stringValue = value?.toString();
    const isEmpty = stringValue === undefined || stringValue === '';
    const numValue = parseFloat(stringValue!);

    if (isEmpty && required) return Promise.reject('This field is required');
    if (isEmpty && !required) return Promise.resolve();
    if (isNaN(numValue)) return Promise.reject('Please enter a valid number');
    if (numValue < 0) return Promise.reject('Value must be zero or a positive number');
    if (!/^\d+(\.\d{1,2})?$/.test(stringValue!)) return Promise.reject('Maximum of 2 decimal places allowed');

    return Promise.resolve();
  };

  const formatter = (value: string | undefined) => {
    if (value === null || value === undefined) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parser = (value: string | undefined) => {
    if (!value) return '';
    // clear out anything from the input after the first 2 decimal places
    return value.replace(/[^\d.]/g, '').replace(/^(\d*\.\d{0,2})\d*$/, '$1');
  };

  const input = (
    <AntInputNumber
      placeholder={placeholder}
      maxLength={maxLength}
      controls={false}
      className={cn('w-full py-1.5', className)}
      formatter={formatter}
      parser={parser}
      prefix={prefix}
      min={min}
    />
  );

  if (!withFormItem) return input;

  return (
    <Form.Item
      {...props}
      name={name}
      className={cn('mb-4 lg:mb-6', formItemClassName)}
      label={props?.label && <span className="text-gray-400 text-sm">{props?.label}</span>}
      help={noValidationMessage ? '' : null}
      rules={[
        {
          validator: inputValidator,
        },
      ]}
    >
      {input}
    </Form.Item>
  );
};

export default Number;
