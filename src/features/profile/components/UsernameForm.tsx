import { motion, AnimatePresence } from "motion/react";
import { useUpdateProfile } from "../../profile";
import { useTrackUsernameIsAvailable } from "../../profile/hooks";
import { Form } from "../../../components/ui/form";
import { FormInput, RoundedButton } from "../../../components";
import SvgIcon from "../../../components/ui/svg-icon";
import { AppIcons } from "../../../assets/svg";

export const UsernameForm = () => {
  const { form, onSubmit, updatingUsername } =
    useUpdateProfile("setupUsername");
  const username = form.watch("username");
  const { available, loading } = useTrackUsernameIsAvailable(username);

  const renderStatus = () => {
    if (!username || available === null) return null;

    if (loading)
      return <span className="text-gray-400">Checking availability...</span>;

    if (available)
      return (
        <div className="text-[#24D682] flex flex-row items-center gap-1">
          <SvgIcon size={16} className="inline" icon={AppIcons.TickCircle} />{" "}
          <span>Username available</span>
        </div>
      );

    return <span className="text-red-500">❌ Username already taken</span>;
  };

  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between h-full pb-20">
          <div>
            <FormInput form={form} placeholder="@john01" name="username" />

            {/* ✅ Animated Status */}
            <AnimatePresence mode="wait">
              {username && (
                <motion.p
                  key={`${loading}-${available}`}
                  className="text-sm leading-[28px]"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderStatus()}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <RoundedButton
            label="Continue"
            type="submit"
            className="w-full"
            loading={updatingUsername}
            disabled={loading || !available}
          />
        </div>
      </form>
    </Form>
  );
};
