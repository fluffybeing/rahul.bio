'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import Lightbox from 'yet-another-react-lightbox';
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
      <div className="grid grid-cols-1 grid-rows-4 md:grid-rows-3 md:grid-cols-3 gap-4 my-8">
        {images.map((x, index) => {
          return (
            <div className="group relative h-60">
              <div className="">
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
                  className="bg-black opacity-0 group-hover:opacity-75 absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
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
      />
    </div>
  );
}
