import React from 'react';
import Image from 'next/image';

export default function Images({ imageUrl }: { imageUrl: string | null }) {
  if (!imageUrl) {
    return <p>No image available</p>;
  }
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* The image fills the container (width and height) */}
      <div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="No image was found."
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      {/* Year label in the bottom-right corner
      <div className="absolute bottom-16 right-5 z-10 text-3xl font-semibold text-white">
        Placeholder for image label
      </div> */}
    </div>
  );
}
