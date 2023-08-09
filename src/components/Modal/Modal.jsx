import React, { useEffect, useCallback } from 'react';
import { Overlay, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ onClose, children }) => {
  const onEscapeClick = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const onBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEscapeClick);
    return () => {
      document.removeEventListener('keydown', onEscapeClick);
    };
  }, [onEscapeClick]);

  return (
    <Overlay onClick={onBackDropClick}>
      <StyledModal>{children}</StyledModal>
    </Overlay>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
