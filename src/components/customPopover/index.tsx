import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import IconHelp from '../../icons/IconHelp';
import { CustomPopoverProps } from './types';
import { StyledBodyWrapper, StyledIconWrapper, StyledLabel, StyledWrapperPopover } from './customPopover.styled';

const CustomPopover = ({ label, body }: CustomPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <StyledWrapperPopover>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{width: '100%'}}
      > 
        <StyledLabel>
          <StyledIconWrapper>
            <IconHelp />
          </StyledIconWrapper>
        </StyledLabel>
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <StyledBodyWrapper>
          {body}
        </StyledBodyWrapper>
      </Popover>
    </StyledWrapperPopover>
  );
}

export default CustomPopover;