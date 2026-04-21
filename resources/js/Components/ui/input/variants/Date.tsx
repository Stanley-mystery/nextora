import { cn } from '@/utils';
import { Form, DatePicker, FormItemProps } from 'antd';
import { Dayjs } from 'dayjs';
import { FC } from 'react';

interface DateProps extends FormItemProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  withFormItem?: boolean;
  formItemClassName?: string;
  onChange?: (date: Dayjs | null) => void;
  disabledDate?: (currentDate: Dayjs) => boolean;
}

const Date: FC<DateProps> = ({
  required,
  name,
  className,
  withFormItem = true,
  initialValue,
  formItemClassName,
  onChange,
  disabledDate,
  ...props
}) => {
  const input = (
    <DatePicker className={cn('py-2.5 w-full', className)} onChange={onChange} disabledDate={disabledDate} />
  );

  if (!withFormItem) return input;

  return (
    <Form.Item
      name={name}
      layout="vertical"
      initialValue={initialValue}
      className={cn('mb-4', formItemClassName)}
      rules={[
        {
          required: required ?? true,
          message: 'This field is required',
        },
      ]}
      {...props}
      label={props?.label && <span className="text-gray-400 text-sm font-medium">{props?.label}</span>}
    >
      {input}
    </Form.Item>
  );
};

export default Date;
