import { Modal as AntModal } from 'antd';
import { Base, Confirm, Success } from './templates';
import { FC, memo, ReactElement, ReactNode } from 'react';
import { X } from 'react-feather';

export interface ModalProps {
  open: boolean;
  children?: ReactElement;
  title: string;
  subTitle?: ReactNode;
  type?: 'success' | 'confirm' | 'warning' | null;
  onCancel?: () => void;
  closeIcon?: boolean;
  loading?: boolean;
  width?: number;
  destroyOnHidden?: boolean;
}

const Modal: FC<ModalProps> = ({
  open = false,
  children,
  type = null,
  onCancel,
  closeIcon,
  width,
  destroyOnHidden,
  ...props
}) => {
  const getTemplate = () => {
    switch (type) {
      case 'success':
        return <Success {...props}>{children}</Success>;
      // case 'warning':
      //   return <Warning {...props}>{children}</Warning>;
      case 'confirm':
        return <Confirm {...props}>{children}</Confirm>;
      default:
        return <Base {...props}> {children}</Base>;
    }
  };

  let maxWidthClass = 'auto';
  let minWidthClass = 'auto';

  switch (type) {
    case 'success':
    case 'warning':
      maxWidthClass = 'max-w-xl';
      break;
    case 'confirm':
      minWidthClass = 'min-w-[600px]';
      break;
  }

  return (
    <AntModal
      open={open}
      destroyOnHidden={destroyOnHidden}
      onCancel={onCancel}
      footer={false}
      centered
      closeIcon={closeIcon === false ? null : <X size={16} strokeWidth={2.5} className="text-zinc-300" />}
      className={`${maxWidthClass} ${minWidthClass} my-6`}
      width={width}
      styles={{
        mask: {
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      {getTemplate()}
    </AntModal>
  );
};

export default memo(Modal);
