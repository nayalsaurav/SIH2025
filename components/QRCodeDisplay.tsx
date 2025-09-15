import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 160 }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-zinc-900 shadow-lg">
      <QRCodeSVG
        value={value}
        height={size}
        width={size}
        fgColor="#4f46e5"
        bgColor="transparent"
      />
      <span className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Batch ID: {value}
      </span>
    </div>
  );
};

export default QRCodeDisplay;
