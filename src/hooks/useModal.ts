import { useEffect, useState } from 'react';

type UseModalProps = {
  defaultOpen?: boolean;
};

export const useModal = ({ defaultOpen = false }: UseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (defaultOpen) {
      openModal();
    }
  }, [defaultOpen]);

  return { isOpen, openModal, closeModal };
};
