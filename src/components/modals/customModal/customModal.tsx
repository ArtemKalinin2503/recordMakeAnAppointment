import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { CustomModalProps } from './types';
import { StyledBody, StyledCloseWrapper, StyledContent, StyledTitle, StyledWrapperPreloader } from './customModal.styled';
import CustomPreloader from '../../customPreloader';

const CustomModal = ({ title, children, open, setOpen }: CustomModalProps) => {

  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 576,
    background: '#FCFCFD',
    borderRadius: '15px',
    boxShadow: 24,
    p: 5,
    minHeight: '400px'
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <StyledContent>
          <StyledCloseWrapper>
            <CloseIcon onClick={handleClose} />
          </StyledCloseWrapper>
          <StyledTitle>
            {title}
          </StyledTitle>
          <StyledBody>
            {children 
            ? children 
            : <StyledWrapperPreloader>
                <CustomPreloader />
              </StyledWrapperPreloader>
            }
          </StyledBody>
        </StyledContent>
      </Box>
    </Modal>
  );
}

export default CustomModal;