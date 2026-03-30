'use client';

import { useState } from 'react';
import Image from 'next/image';

type GithubGraphProps = {
  user: string;
};

export default function GithubGraph({ user }: GithubGraphProps) {
  const proxied = `/api/github-graph.svg?user=${encodeURIComponent(user)}&nocache=1`;
  const fallback = `https://ghchart.rshah.org/ffd54f/${encodeURIComponent(user)}`;
  const [src, setSrc] = useState(proxied);

  return (
    <div className="graph-frame">
      <Image
        src={src}
        alt={`GitHub contribution heatmap for ${user}`}
        width={1040}
        height={190}
        className="graph-image"
        unoptimized
        onError={() => {
          if (src !== fallback) {
            setSrc(fallback);
          }
        }}
      />
    </div>
  );
}
