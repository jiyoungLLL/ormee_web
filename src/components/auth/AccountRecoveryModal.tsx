'use client';

import Modal from '@/components/ui/Modal';

type AccountRecoveryModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AccountRecoveryModal({ isOpen, onConfirm, onCancel }: AccountRecoveryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title='아이디/비밀번호 찾기'
    />
  );
}
