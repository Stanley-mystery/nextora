import { Form as AntForm } from 'antd';
import type { FormProps as AntFormProps } from 'antd';
import { FC, PropsWithChildren } from 'react';

const Form: FC<PropsWithChildren<AntFormProps>> & {
  useForm: typeof AntForm.useForm;
  useWatch: typeof AntForm.useWatch;
  List: typeof AntForm.List;
  Item: typeof AntForm.Item;
} = ({ children, layout = 'vertical', autoComplete = 'off', ...props }) => {
  return (
    <AntForm layout={layout} autoComplete={autoComplete} requiredMark={false} {...props}>
      {children}
    </AntForm>
  );
};

Form.useForm = AntForm.useForm;
Form.List = AntForm.List;
Form.Item = AntForm.Item;
Form.useWatch = AntForm.useWatch;

export default Form;
