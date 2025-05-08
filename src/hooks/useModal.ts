import { useEffect, useState } from 'react';

type UseModalProps = {
  defaultOpen?: boolean;
};

export const useModal = ({ defaultOpen = false }: UseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => setIsOpen(true);
  const modalClose = () => setIsOpen(false);

  useEffect(() => {
    if (defaultOpen) {
      modalOpen();
    }
  }, [defaultOpen]);

  return { isOpen, modalOpen, modalClose };
};
