import { DatePicker as AntDatePicker, DatePickerProps, FormItemProps } from 'antd';
import { FC, ReactNode } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';

interface CustomDatePickerProps extends DatePickerProps {
  label?: ReactNode;
  name: string;
  placeholder?: string;
  required?: boolean;
  formItemProps?: FormItemProps;
}

const DatePicker: FC<CustomDatePickerProps> = ({
  label,
  name,
  placeholder = 'YYYY-MM-DD',
  required = true,
  formItemProps = {},
  ...rest
}) => {
  return (
    <Form.Item
      label={label ? <span className="text-[#9C9C9C]">{label}</span> : null}
      name={name}
      rules={[{ required, message: `${typeof label === 'string' ? label : 'Date'} is required` }]}
      {...formItemProps}
      getValueFromEvent={(date) => (date ? date.format('YYYY-MM-DD') : null)}
      getValueProps={(value) => ({ value: value ? dayjs(value, 'YYYY-MM-DD') : null })}
    >
      <AntDatePicker
        format="YYYY-MM-DD"
        style={{ width: '100%', height: '43px' }}
        placeholder={placeholder}
        {...rest}
      />
    </Form.Item>
  );
};

export default DatePicker;
