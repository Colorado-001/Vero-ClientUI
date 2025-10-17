import React from "react";

interface WalletMaskDisplayProps {
  address: string;
  className?: string;
}

export const WalletMaskDisplay: React.FC<WalletMaskDisplayProps> = ({
  address,
  className,
}) => {
  if (!address) return null;

  const masked =
    address.length > 10
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;

  return <span className={className}>{masked}</span>;
};
