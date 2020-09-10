import React from 'react';

export function AutoSizer({
  children,
  style
}: {
  children: (dimensions: { height: number; width: number }) => {};
  style?: React.CSSProperties
}) {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  console.log(height)

  React.useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
      setWidth(ref.current.clientWidth)
    }
  }, []);

  return (
    <div ref={ref} style={style}>
      {children({ height, width })}
    </div>
  );
}