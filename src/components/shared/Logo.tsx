import classNames from "classnames";
import React from "react";
import Image from "@/components/shared/Image";

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={classNames("relative flex mx-auto h-10 w-10", className)}
      {...props}
    >
      <Image src="/logo.jpeg" layout="fill" objectFit="contain" alt="logo" className="rounded-full" />
    </div>
  );
};

export default React.memo(Logo);