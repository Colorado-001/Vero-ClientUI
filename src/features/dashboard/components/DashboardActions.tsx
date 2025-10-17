import type React from "react";
import { IconButton } from "../../../components";
import { useNavigate } from "react-router-dom";
import { appNavigate } from "../../../utils/routing";

interface IProps {
  disabled: boolean;
}

export const DashboardActions: React.FC<IProps> = ({ disabled }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-8 items-center">
      <IconButton title="Send" iconName="Send" disabled={disabled} />
      <IconButton
        title="Receive"
        iconName="Receive"
        disabled={disabled}
        onClick={() => appNavigate(navigate, "receive")}
      />
      <IconButton
        title="Swap"
        iconName="Swap"
        disabled={disabled}
        onClick={() => appNavigate(navigate, "swap")}
      />
      <IconButton title="Save" iconName="Save" disabled={disabled} />
    </div>
  );
};
