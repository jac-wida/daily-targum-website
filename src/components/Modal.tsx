import React from 'react';
import { useScrollock } from '../utils';
import { IoMdClose } from 'react-icons/io';
import { ReactChildren } from '../types';
import styles from './Modal.module.scss';
import cn from 'classnames';
import FocusTrap from 'focus-trap-react';

export function Modal({
  open = false,
  handleClose,
  children,
  overflow = 'hidden'
}: {
  open: boolean
  handleClose: () => any
  children: ReactChildren
  overflow?: string
}) {
  const { toggleScrollock } = useScrollock();

  React.useEffect(() => {
    toggleScrollock(open)
  }, [open]);

  return (
    <FocusTrap active={open}>
      <div
        className={cn(
          styles.backdrop,
          {
            [styles.hide]: !open
          }
        )}
        onClick={handleClose}
      >
        <button
          onClick={handleClose}
          className={styles.closeIcon}
        >
          <IoMdClose size={30}/>
        </button>

        <div
          className={styles.modal}
          style={{
            overflow
          }}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}