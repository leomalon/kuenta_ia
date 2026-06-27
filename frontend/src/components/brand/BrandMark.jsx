'use client';

import Image from 'next/image';

// Pequeño gesto de marca: el ícono entero hace un "guiño" sutil cada pocos
// segundos (un ligero giro + achique), como si KAPO le guiñara el ojo a
// quien llega. Se respeta prefers-reduced-motion vía CSS global.
export default function BrandMark({ size = 96, animated = true, className = '' }) {
  return (
    <div
      className={`relative ${animated ? 'animate-wink' : ''} ${className}`}
      style={{ width: size, height: size, transformOrigin: '38% 55%' }}
    >
      {/* <Image
        src="/kapo-icon.png"
        alt="KUENTA"
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      /> */}

      KUENTA
    </div>
  );
}
