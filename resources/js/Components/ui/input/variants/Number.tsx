import { Spinner } from '@/components/loaders';
import { cn } from '@/utils';
import { Form, FormItemProps, Input as AntInput } from 'antd';
import { FC, useState } from 'react';

interface NumberProps extends FormItemProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  formItemClassName?: string;
  withFormItem?: boolean;
  noValidationMessage?: boolean;
  minLength?: number;
  maxLength?: number;
  allowDecimal?: boolean;
  max?: number;
  disabled?: boolean;
  loading?: boolean;
}

const Number: FC<NumberProps> = ({
  required = true,
  placeholder = '',
  name,
  className,
  formItemClassName,
  withFormItem = true,
  noValidationMessage = false,
  allowDecimal = false,
  minLength = 1,
  maxLength = 50,
  disabled = false,
  max,
  loading = false,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<string>('');

  const inputValidator = (_: unknown, value: string) => {
    const isEmpty = value === undefined || value === null || value === '';

    if (isEmpty && required) return Promise.reject('This field is required');
    if (isEmpty && !required) return Promise.resolve();

    if (max && parseFloat(value!) > max) {
      return Promise.reject(`Maximum value is ${max}`);
    }

    const pattern = allowDecimal ? /^\d+(\.\d{1,2})?$/ : /^\d+$/;
    if (!pattern.test(value!)) {
      return Promise.reject(
        allowDecimal ? 'Only numbers allowed (up to 2 decimal places, no letters)' : 'Please enter a valid number'
      );
    }

    if (minLength && value.length < minLength) {
      return Promise.reject(`Minimum length is ${minLength} digits`);
    }

    if (maxLength && value.length > maxLength) {
      return Promise.reject(`Maximum length is ${maxLength} digits`);
    }

    return Promise.resolve();
  };

  const sanitizeValue = (raw: string) => {
    const cleaned = raw.replace(/[^0-9.]/g, '');

    if (!allowDecimal) {
      return cleaned.replace(/\./g, '');
    }

    const parts = cleaned.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts[1];
    if (parts.length === 2) return parts[0] + '.' + parts[1].slice(0, 2);

    return cleaned;
  };

  const renderInput = (value: string, onChange: (val: string) => void) => (
    <AntInput
      placeholder={placeholder}
      className={cn('w-full py-2.5', className)}
      maxLength={maxLength}
      value={value}
      onChange={(e) => onChange(sanitizeValue(e.target.value))}
      minLength={minLength}
      disabled={disabled || loading}
      suffix={loading ? <Spinner size={16} /> : undefined}
    />
  );

  if (!withFormItem) return renderInput(localValue, setLocalValue);

  return (
    <Form.Item
      {...props}
      name={name}
      className={cn('mb-4 lg:mb-4', formItemClassName)}
      label={props?.label && <span className="text-gray-400 text-sm">{props?.label}</span>}
      help={noValidationMessage ? '' : null}
      rules={[{ validator: inputValidator }]}
    >
      {renderInput(undefined as unknown as string, () => {})}
    </Form.Item>
  );
};

export default Number;
