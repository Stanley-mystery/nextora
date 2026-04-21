import { Form, Input } from 'antd';

const Textarea = ({
  rows = 10,
  name = '',
  placeholder = '',
  label = '',
  showCount = false,
  required = true,
  withFormItem = true,
  ...props
}) => {
  const { TextArea: AntTextArea } = Input;

  const input = <AntTextArea rows={rows} placeholder={placeholder} showCount={showCount} {...props} />;

  if (!withFormItem) return input;

  return (
    <Form.Item
      name={name}
      layout="vertical"
      rules={[
        {
          required: required ?? true,
          message: 'This field is required',
          whitespace: true,
        },
      ]}
      label={label ? <span className="text-gray-400 text-sm">{label}</span> : undefined}
    >
      <AntTextArea rows={rows} placeholder={placeholder} showCount={showCount} {...props} />
    </Form.Item>
  );
};

export default Textarea;
