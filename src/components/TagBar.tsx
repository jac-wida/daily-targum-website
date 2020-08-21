import React from 'react';
import Theme from './Theme';
import { styleHelpers } from '../utils';
import Text from './Text';

export function TagBar({
  tags,
  onChange,
  value,
  style
}: {
  tags: string[]
  onChange: (val: string) => any
  value: string
  style?: React.CSSProperties
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div style={{ ...styles.tagBar, ...style }}>
      {tags.map(tag => (
        <Text 
          style={{
            ...styles.tag,
            ...(tag === value ? styles.tagSelected : null)
          }}
          key={tag}
          onClick={() => {
            onChange(tag);
          }}
        >
          {tag}
        </Text>
      ))}
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  tagBar: {
    ...styleHelpers.flex('row')
  },
  tag: {
    color: '#fff',
    backgroundColor: '#999',
    padding: theme.spacing(1, 2),
    marginRight: theme.spacing(1),
    borderRadius: theme.roundness(1),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.3rem',
    userSelect: 'none',
    textTransform: 'capitalize'
  },
  tagSelected: {
    backgroundColor: theme.colors.accent
  }
}));