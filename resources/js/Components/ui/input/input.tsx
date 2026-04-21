import { FC } from 'react';
import { Text, Email, Password, Number, Phone, Date, Amount } from './variants';

interface InputProps {
  type?: 'email' | 'tel' | 'phone' | 'number' | 'amount' | 'password' | 'date';
  [key: string]: unknown;
}

const Input: FC<InputProps & { name: string }> = ({ name, type, ...props }) => {
  switch (type) {
    case 'email':
      return <Email {...props} name={name} />;
    case 'tel':
    case 'phone':
      return <Phone {...props} name={name} />;
    case 'number':
      return <Number {...props} name={name} />;
    case 'amount':
      return <Amount {...props} name={name} />;
    case 'password':
      return <Password {...props} name={name} />;
    case 'date':
      return <Date {...props} name={name} />;
    default:
      return <Text {...props} name={name} />;
  }
};

export default Input;
