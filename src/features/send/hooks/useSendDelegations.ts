import { useEffect, useState } from "react";
import type { DelegationSummaryDto } from "../../../types/models";
import * as delegationApi from "../../../api/delegation";
import { withErrorHandling } from "../../../utils/error";

export const useSendDelegations = () => {
  const [loading, set] = useState(false);
  const [list, setList] = useState<DelegationSummaryDto[]>();

  const load = async () => {
    set(true);
    const { isError, data } = await withErrorHandling(
      delegationApi.getMyDelegationsForSend
    );
    if (!isError && data) {
      setList(data);
    }
    set(false);
  };

  useEffect(() => {
    load();

    return () => {
      setList([]);
      set(false);
    };
  }, []);

  return { loading, list };
};
