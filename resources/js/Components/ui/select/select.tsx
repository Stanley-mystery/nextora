'use client';

import React from 'react';
import { Select as AntSelect, Form } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd/es/select';
import { cn } from '@/utils';

interface OptionType {
  label: string;
  value: string | number;
}

interface CustomSelectProps extends Omit<AntSelectProps, 'name' | 'options'> {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  labelClassName?: string;
  formItemClassName?: string;
  suffixIcon?: React.ReactNode;
  options?: OptionType[];
  className?: string;
  initialValues?: null | string;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  name,
  required = true,
  labelClassName,
  formItemClassName,
  className = [],
  suffixIcon,
  options = [],
  placeholder,
  initialValues = null,
  ...rest
}) => {
  return (
    <Form.Item
      label={label ? <span className={labelClassName ?? 'text-gray-400 text-sm'}>{label}</span> : undefined}
      name={name}
      rules={required ? [{ required: true, message: `Please Select ${label}` }] : []}
      className={cn('mb-4', formItemClassName)}
      initialValue={initialValues}
    >
      <AntSelect
        placeholder={placeholder}
        className={`w-full h-[42px] ${className}`}
        suffixIcon={suffixIcon}
        options={options}
        {...rest}
      />
    </Form.Item>
  );
};

export default Select;
