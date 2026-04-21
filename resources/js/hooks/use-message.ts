import { MessageContext } from '@/context/message-context';
import { useContext } from 'react';

const useMessage = () => {
  const messageApi = useContext(MessageContext);

  if (!messageApi) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return messageApi;
};

export default useMessage;
