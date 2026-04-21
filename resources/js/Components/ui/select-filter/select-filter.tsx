import { FC } from 'react';
import Select from '../select';
import { Form } from 'antd';

interface SelectFilterProps {
  name: string;
  label: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

const SelectFilter: FC<SelectFilterProps> = ({ name, onChange, options, disabled = false, required = true }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <div className="filter-select">
        <Select
          name={name}
          disabled={disabled}
          onChange={onChange}
          initialValues={options?.[0]?.value}
          options={options}
          required={required}
        />
      </div>
    </Form>
  );
};

export default SelectFilter;
