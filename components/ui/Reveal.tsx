import React from 'react';

type RevealTag = keyof React.JSX.IntrinsicElements;

type RevealProps = {
  as?: RevealTag;
  className?: string;
  delay?: number;
  children: React.ReactNode;
};

export default function Reveal({ as = 'div', className = '', delay = 0, children }: RevealProps) {
  const Tag = as;

  return (
    <Tag
      data-reveal
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
