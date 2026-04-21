import { Form, FormItemProps, Input as AntInput, Select, FormInstance } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { cn, validatePhoneNumber } from '@/utils';

// mock countries data.
const countries = [{ name: 'Nigeria', code: '+234', flag: '🇳🇬', dialCode: '234', maxLength: 10 }];

interface PhoneProps extends FormItemProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  withFormItem?: boolean;
  label?: string;
  withCountryCode?: boolean;
  defaultCountryCode?: string;
  countryCodeName?: string;
  onCountryChange?: (countryCode: string) => void;
}

const Phone: FC<PhoneProps> = ({
  required,
  placeholder = '',
  name,
  className,
  withFormItem = true,
  label,
  withCountryCode = false,
  defaultCountryCode = '+234',
  countryCodeName = 'phoneCountryCode',
  onCountryChange,
  ...props
}) => {
  const defaultCountry = countries.find((c) => c.code === defaultCountryCode);
  const [currentMaxLength, setCurrentMaxLength] = useState(defaultCountry?.maxLength || 11);

  const handleCountryChange = (value: string, form: FormInstance) => {
    const selectedCountry = countries.find((c) => c.code === value);
    if (selectedCountry) {
      setCurrentMaxLength(selectedCountry.maxLength);
      form.setFieldValue(name, '');
    }
    onCountryChange?.(value);
  };

  const regularInput = (
    <AntInput allowClear placeholder={placeholder} maxLength={11} className={cn('py-2.5', className)} />
  );

  const inputWithCountryCode = (
    <Form.Item noStyle shouldUpdate>
      {(form) => (
        <div className="flex gap-3">
          <Form.Item name={countryCodeName} noStyle initialValue={defaultCountryCode}>
            <Select
              onChange={(value) => handleCountryChange(value, form)}
              className="flex-shrink-0"
              style={{ width: 'auto', height: '43px' }}
              suffixIcon={<DownOutlined className="text-xs" />}
              styles={{
                popup: {
                  root: {
                    borderRadius: '8px',
                  },
                },
              }}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) => {
                const label = String(option?.label || '');
                return label.toLowerCase().includes(input.toLowerCase());
              }}
              options={countries.map((country, index) => ({
                key: `${country.code}-${country.name}-${index}`,
                value: country.code,
                label: (
                  <div className="flex items-center gap-2">
                    <span className="text-base">{country.flag}</span>
                    <span className="text-sm">{country.code}</span>
                  </div>
                ),
              }))}
            />
          </Form.Item>

          <Form.Item
            name={name}
            noStyle
            rules={[
              {
                required: required ?? true,
                message: 'A phone number is required',
                whitespace: true,
              },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  return validatePhoneNumber(_, value, currentMaxLength);
                },
              },
            ]}
          >
            <AntInput
              allowClear
              placeholder={placeholder}
              minLength={currentMaxLength}
              maxLength={currentMaxLength}
              className={cn('py-2.5 flex-1', className)}
            />
          </Form.Item>
        </div>
      )}
    </Form.Item>
  );

  const input = withCountryCode ? inputWithCountryCode : regularInput;

  if (!withFormItem) return input;

  if (withCountryCode) {
    return (
      <Form.Item
        label={
          label ? (
            <span className="text-gray-400 text-sm">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          ) : undefined
        }
        {...props}
      >
        {input}
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required ?? true,
          message: 'A phone number is required',
          whitespace: true,
        },
        {
          validator: (_, value) => {
            if (!value) return Promise.resolve();
            return validatePhoneNumber(_, value, 11);
          },
        },
      ]}
      {...props}
      label={
        label ? (
          <span className="text-gray-400 text-sm">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        ) : undefined
      }
    >
      {input}
    </Form.Item>
  );
};

export default Phone;
