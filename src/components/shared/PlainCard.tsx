import Image from "@/components/shared/Image";
import { ImageProps } from "next/image";
import React from "react";

const PlainCard: React.FC<ImageProps> = (props) => {
  return (
    <div className="relative aspect-w-9 aspect-h-16 rounded-md">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image layout="fill" objectFit="cover" {...props} className="rounded-md" />
    </div>
  );
};

export default React.memo(PlainCard);
