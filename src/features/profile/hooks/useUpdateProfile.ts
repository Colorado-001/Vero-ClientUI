import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type Resolver,
  type UseFormReturn,
} from "react-hook-form";
import {
  setupPinSchema,
  setupUsernameSchema,
  type ActionFormMap,
  type TSetupUsernameSchema,
  type TUpdateProfileSchema,
} from "../schema";
import { useCallback, useState } from "react";
import { withErrorHandling } from "../../../utils/error";
import { useAuthStore } from "../../../store/auth/auth.store";

type ReturnType<A extends keyof ActionFormMap> = {
  form: UseFormReturn<ActionFormMap[A]>;
  updatingUsername: boolean;
  onSubmit: (data: ActionFormMap[A]) => Promise<void>;
};

export const useUpdateProfile = <A extends keyof ActionFormMap>(
  action: A
): ReturnType<A> => {
  const [updatingUsername, setUpdatingUsername] = useState(false);

  const { updateProfile: updateProfileStore } = useAuthStore();
  const { resolver, defaults } = (() => {
    switch (action) {
      case "setupUsername":
        return {
          resolver: zodResolver(setupUsernameSchema) as unknown as Resolver<
            ActionFormMap[A]
          >,
          defaults: { username: "", action } as DefaultValues<ActionFormMap[A]>,
        };
      case "setupPin":
        return {
          resolver: zodResolver(setupPinSchema) as unknown as Resolver<
            ActionFormMap[A]
          >,
          defaults: { pin: "", action } as DefaultValues<ActionFormMap[A]>,
        };
      default:
        throw new Error(`Unhandled action: ${action}`);
    }
  })();

  const form = useForm<ActionFormMap[A]>({
    resolver,
    defaultValues: defaults,
  });

  const setupUsername = useCallback(
    async (data: TSetupUsernameSchema) => {
      setUpdatingUsername(true);
      await withErrorHandling(() => updateProfileStore(data));
      setUpdatingUsername(false);
    },
    [updateProfileStore]
  );

  const onSubmit = useCallback(
    async (data: TUpdateProfileSchema) => {
      switch (data.action) {
        case "setupUsername":
          await setupUsername(data);
          break;

        default:
          throw new Error(`${data.action} is not handled`);
      }
    },
    [setupUsername]
  );

  return {
    form,
    updatingUsername,
    onSubmit,
  };
};
