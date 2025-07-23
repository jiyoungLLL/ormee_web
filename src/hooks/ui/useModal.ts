import { useEffect, useState } from 'react';

type UseModalProps = {
  defaultOpen?: boolean;
};

export const useModal = ({ defaultOpen = false }: UseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal: () => void = () => setIsOpen(true);
  const closeModal: () => void = () => setIsOpen(false);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);

  return { isOpen, openModal, closeModal };
};
