import React, { CSSProperties } from 'react';
import Theme from './Theme';
// import Truncate from 'react-truncate';
import styled from 'styled-components';
import { ReactChild } from '../types';

const Truncate = styled.span<{
  numberOfLines?: number
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.numberOfLines || 'initial'};
  -webkit-box-orient: vertical; 
  overflow: hidden;
`;

const Span = (props: any) => <span {...props}/>;

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
export const variants: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

export function Text({
  children,
  numberOfLines,
  className,
  variant = 'span',
  style,
  noPadding = false
}: {
  children: (string | ReactChild)[] | string | ReactChild
  numberOfLines?: number
  className?: string
  variant?: Variant
  style?: CSSProperties
  noPadding?: boolean
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const Component = variant === 'span' ? Span : Truncate;
  return (
    <Component
      className={[
        noPadding ? classes.noPadding : null,
        className, 
        classes[variant]].join(' ')
      }
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Component>
  );
}

export function Br() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={classes.br}/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  h1: {
    fontWeight: 700,
    fontSize: '3rem',
    marginBottom: theme.spacing(2)
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    marginBottom: theme.spacing(2)
  },
  h3: {
    fontWeight: 700,
    fontSize: '1.4rem',
    marginBottom: theme.spacing(2)
  },
  h4: {
    fontWeight: 700,
    fontSize: '1.2rem',
    marginBottom: theme.spacing(1)
  },
  h5: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: '1rem'
  },
  h6: {
    marginBottom: theme.spacing(1),
  },
  p: {
    marginBottom: theme.spacing(2),
    lineHeight: '1.8rem',
    fontSize: '1rem'
  },
  span: {
  },
  br: {
    height: theme.spacing(2),
  },
  noPadding: {
    marginBottom: 0
  }
}));

Text.Br = Br;
export default Text;