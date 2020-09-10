import React from 'react';
import { ReactChildren } from '../types';
import styles from './Section.module.scss';
import cn from 'classnames';

export function Section({
  children,
  className,
  style,
  classNameInside,
  styleInside
}: {
  children: ReactChildren,
  className?: string,
  style?: React.CSSProperties,
  classNameInside?: string,
  styleInside?: React.CSSProperties,
}) {
  return (
    <div 
      className={cn(className, styles.section)}
      style={style} 
    >
      <div 
        style={styleInside} 
        className={cn(classNameInside, styles.inside)}
      >
        {children}
      </div>
    </div>
  );
}

Section.approximateInnerWidth = approximateInnerWidth;
function approximateInnerWidth() {
  if (typeof window === 'undefined') {
    return 1000;
  }

  const windowInnerWidth = window.innerWidth;
  const largeWidth = 1000 + (windowInnerWidth * 0.22);

  if (largeWidth > windowInnerWidth) {
    return windowInnerWidth;
  } else {
    return largeWidth;
  }
}

// width: 100%;
// max-width: calc(1000px + 22vw);

export default Section;