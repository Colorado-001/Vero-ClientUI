import type React from "react";
import { Interaction } from "../../../components";
import SvgIcon from "../../../components/ui/svg-icon";
import type { AutoflowSavingDto } from "../../../types/models";
import { AppIcons } from "../../../assets/svg";
import { useFlowActions } from "../hooks";

export const FlowPopUpMenu: React.FC<
  AutoflowSavingDto & { onClose: VoidFunction }
> = ({ onClose, ...flow }) => {
  const { handleDelete, handlePause, deleting } = useFlowActions(flow, onClose);

  return (
    <div className="border border-[#292D32] bg-[#292D32] rounded-[20px] overflow-hidden w-fit min-w-[107px] flex flex-col py-[20px] gap-[16px]">
      <Interaction
        className="px-[16px]"
        onClick={handlePause}
        disabled={deleting}
      >
        <div className="flex flex-row items-center gap-2 text-[#F9FAFB] text-[14px]">
          <SvgIcon icon={AppIcons["Pause"]} size={14} />

          <p>Pause</p>
        </div>
      </Interaction>

      <Interaction
        className="px-[16px]"
        onClick={handleDelete}
        disabled={deleting}
      >
        <div className="flex flex-row items-center gap-2 text-[#FF5A5A] text-[14px]">
          <SvgIcon icon={AppIcons["Trash"]} size={14} />

          <p>Delete</p>
        </div>
      </Interaction>
    </div>
  );
};
