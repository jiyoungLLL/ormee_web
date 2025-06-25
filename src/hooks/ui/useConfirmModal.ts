import { useRef } from 'react';
import { useModal } from '@/hooks/ui/useModal';

export const useConfirmModal = () => {
  const { isOpen, openModal, closeModal } = useModal({ defaultOpen: false });
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);

  const showConfirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      openModal();
    });
  };

  const handleConfirm = () => {
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }

    closeModal();
  };

  const handleCancel = () => {
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }

    closeModal();
  };

  return {
    isOpen,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};
