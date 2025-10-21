import { useCallback } from "react";
import type { AutoflowSavingDto } from "../../../types/models";
import { toast } from "sonner";
import { useSavingStore } from "../../../store";
import { withErrorHandling } from "../../../utils/error";

export const useFlowActions = (
  flow: AutoflowSavingDto,
  onClose: VoidFunction
) => {
  const { deletingAutoFlow, removeAutoFlow } = useSavingStore();

  const handleDelete = useCallback(async () => {
    onClose();
    toast.promise<void>(
      async () => {
        const { isError } = await withErrorHandling(
          () => removeAutoFlow(flow.id),
          { showToast: false }
        );

        if (isError) {
          throw new Error();
        }
      },
      {
        loading: `Deleting autoflow (${flow.name})...`,
        success: "Delete complete",
        error: "Delete failed",
      }
    );
  }, [flow.id, flow.name, onClose, removeAutoFlow]);

  const handlePause = useCallback(async () => {
    onClose();
    console.log("Pause flow:", flow.id);
  }, [flow.id, onClose]);

  return {
    handleDelete,
    handlePause,
    deleting: deletingAutoFlow,
  };
};
