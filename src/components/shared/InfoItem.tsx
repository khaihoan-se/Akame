import classNames from "classnames";
import React from "react";

interface InfoItemProps {
  title: string;
  value?: string | number | React.ReactNode;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, value, className }) => {
  return value ? (
    <div className={classNames("text-gray-400", className)}>
      <p className="font-semibold">{title}</p>
      <p className="whitespace-pre-line text-sm">{value}</p>
    </div>
  ) : null;
};

export default InfoItem;
