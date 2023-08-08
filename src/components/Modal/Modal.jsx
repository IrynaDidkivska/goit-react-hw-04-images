import React, { useEffect } from 'react';
import { Overlay, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ onClose, isOpen, children }) => {
  const onEscapeClick = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const onBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onEscapeClick);
    } else {
      document.removeEventListener('keydown', onEscapeClick);
    }

    return () => {
      document.removeEventListener('keydown', onEscapeClick);
    };
  }, [isOpen, onEscapeClick]);

  return (
    isOpen && (
      <Overlay onClick={onBackDropClick}>
        <StyledModal>{children}</StyledModal>
      </Overlay>
    )
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
