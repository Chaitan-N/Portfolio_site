import clsx from 'clsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FiSend as SendIcon } from 'react-icons/fi';

import { ChatInputProps } from '@/common/types/chat';

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);

    try {
      await onSendMessage(message);
      setMessage('');
    } catch (error) {
      // console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form className='flex items-center gap-x-1 p-4'>
      <input
        type='text'
        value={message}
        onChange={handleChange}
        placeholder='Type a message...'
        className='flex-grow border dark:border-neutral-600 rounded-md p-2 focus:outline-none'
        disabled={isSending}
      />
      <button
        type='submit'
        onClick={handleSendMessage}
        className={clsx(
          'ml-2 bg-sky-600 text-white p-3 rounded-md',
          !message.trim() && '!bg-neutral-600 cursor-not-allowed'
        )}
        disabled={isSending || !message.trim()}
        data-umami-event='Chat Widget: Send Chat'
      >
        <SendIcon size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
