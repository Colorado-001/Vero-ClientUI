import type React from "react";

interface IProps {
  logoURI: string;
  name: string;
}

export const CryptoIcon: React.FC<IProps> = ({ logoURI, name }) => {
  return (
    <div className="rounded-full bg-[#627eea2A] h-[50px] w-[50px] flex items-center justify-center">
      <img src={logoURI} alt={name} className="object-contain h-[30px]" />
    </div>
  );
};
