import { cn } from '@/utils';
import { Form, Input as AntInput, FormItemProps } from 'antd';
import { FC, ChangeEvent, ReactNode } from 'react';

interface TextProps extends FormItemProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  withFormItem?: boolean;
  formItemClassName?: string;
  initialValue?: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  label?: string;
  alphanumeric?: boolean;
  charactersOnly?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Text: FC<TextProps> = ({
  required,
  placeholder = '',
  name,
  className,
  withFormItem = true,
  initialValue,
  formItemClassName,
  minLength,
  maxLength = 275,
  disabled = false,
  alphanumeric = false,
  charactersOnly = false,
  prefix,
  suffix,
  onChange,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (alphanumeric) {
      const filteredValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
      e.target.value = filteredValue;
    } else if (charactersOnly) {
      const filteredValue = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
      e.target.value = filteredValue;
    }
    onChange?.(e);
  };

  const normalize = (value: string) => {
    if (alphanumeric && value) {
      return value.replace(/[^a-zA-Z0-9-]/g, '');
    }
    if (charactersOnly && value) {
      return value.replace(/[^a-zA-Z\s'-]/g, '');
    }
    return value;
  };

  const input = (
    <AntInput
      allowClear={!suffix}
      placeholder={placeholder}
      maxLength={maxLength}
      minLength={minLength}
      prefix={prefix}
      suffix={suffix}
      className={cn('py-2.5', className, suffix && 'py-1.5 pr-1')}
      disabled={disabled}
      onChange={handleChange}
    />
  );

  if (!withFormItem) return input;

  return (
    <Form.Item
      name={name}
      layout="vertical"
      initialValue={initialValue}
      className={cn('mb-4', formItemClassName)}
      normalize={alphanumeric || charactersOnly ? normalize : undefined}
      rules={[
        {
          required: required ?? true,
          message: 'This field is required',
          whitespace: true,
        },
      ]}
      {...props}
      label={props?.label && <span className="text-gray-400 text-sm font-medium">{props?.label}</span>}
    >
      {input}
    </Form.Item>
  );
};

export default Text;
