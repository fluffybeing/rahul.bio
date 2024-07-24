'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import NextJsImage from './nextjsImage';

export type Image = {
  id: number;
  imageSrc: string;
  title: string;
};

export default function Gallery({ images }: { images: Image[] }) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((item) => ({
    src: item.imageSrc,
    width: 3840,
    height: 2560,
    srcSet: [
      { src: item.imageSrc, width: 320, height: 213 },
      { src: item.imageSrc, width: 640, height: 426 },
      { src: item.imageSrc, width: 1200, height: 800 },
      { src: item.imageSrc, width: 2048, height: 1365 },
      { src: item.imageSrc, width: 3840, height: 2560 },
    ],
  }));

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {images.map((x, index) => {
          return (
            <div className="group relative">
              <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  key={index}
                  src={x.imageSrc}
                  alt={x.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
                <div
                  className="flex items-center justify-center opacity-0 group-hover:opacity-75 absolute inset-0 bg-black transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setIndex(index);
                  }}
                >
                  <p className="text-white">
                    <AiOutlineExpandAlt className="text-5xl border w-12 h-12 bg-neutral-500 hover:bg-white hover:text-black p-3 cursor-pointer rounded-full" />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        render={{ slide: NextJsImage }}
        plugins={[Zoom]}
      />
    </div>
  );
}
