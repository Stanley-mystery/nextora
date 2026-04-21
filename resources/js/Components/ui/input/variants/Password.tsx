import { Form, FormItemProps, Input as AntInput, FormInstance } from 'antd';
import { ChangeEvent, FC, useMemo } from 'react';
import { cn, validateAtLeastOneCharacter, validatePassword } from '@/utils';
import { usePasswordStrengthValidator } from '@/hooks';

interface PasswordProps extends FormItemProps {
  name: string;
  form?: FormInstance | null;
  required?: boolean;
  placeholder?: string;
  className?: string;
  withFormItem?: boolean;
  confirmPassword?: boolean;
  noValidation?: boolean;
  formItemClassName?: string;
  autoComplete?: string;
}

const Password: FC<PasswordProps> = ({
  form = null,
  required,
  placeholder = '********',
  name,
  withFormItem = true,
  confirmPassword = false,
  noValidation = false,
  className,
  formItemClassName,
  autoComplete = 'off',
  ...props
}) => {
  const { passwordRulesCheck } = usePasswordStrengthValidator();

  const confirmPasswordValidator = (_: unknown, value: string) => {
    const passwordValue = form?.getFieldValue('password');
    const newPasswordValue = form?.getFieldValue('newPassword');

    if (value === passwordValue || value === newPasswordValue) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Passwords do not match'));
  };

  const rules = useMemo(() => {
    const baseRules = {
      required: required ?? true,
      validator: validatePassword.validate,
    };

    if (confirmPassword) return { required: true, validator: confirmPasswordValidator };

    if (noValidation)
      return {
        required: required ?? true,
        validator: validateAtLeastOneCharacter,
      };

    return baseRules;
  }, [noValidation, required]); // eslint-disable-line react-hooks/exhaustive-deps

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    passwordRulesCheck(value);
  };

  const input = (
    <AntInput.Password
      placeholder={placeholder}
      maxLength={100}
      className={cn('py-2.5', className)}
      onChange={passwordInputHandler}
      autoComplete={autoComplete}
    />
  );

  if (!withFormItem) return input;

  return (
    <>
      <Form.Item
        name={name}
        rules={[rules]}
        dependencies={confirmPassword ? ['password', 'newPassword'] : undefined}
        className={cn('mb-4', formItemClassName)}
        {...props}
        label={<span className="text-gray-400 text-sm font-medium">{props?.label}</span>}
      >
        {input}
      </Form.Item>
    </>
  );
};

export default Password;
