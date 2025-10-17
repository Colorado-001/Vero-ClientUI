import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useAuthStore } from "../../store/auth/auth.store";
import { RoundedButton } from "../../components";
import SvgIcon from "../../components/ui/svg-icon";
import { AppIcons } from "../../assets/svg";

export const ReceivePage = () => {
  const [loading, setLoading] = useState(false);
  const { user, loadProfile } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    loadProfile()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [loadProfile]);

  if (loading || !user) return null;

  return (
    <div className="pt-[120px] px-4">
      <div className="flex flex-col gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            // duration: 0.4,
            ease: "easeOut",
          }}
        >
          {user.qr && <img src={user.qr} alt="Deposit QR Code" />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          <p className="text-center text-[20px] text-[#6B7280] break-all">
            {user.address}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="w-full"
        >
          <RoundedButton
            label="Copy Address"
            onClick={() => toast.success("Copied")}
            className="w-full"
            suffixIcon={
              <SvgIcon icon={AppIcons["Copy"]} color="#F9FAFB" size={29} />
            }
          />
        </motion.div>

        <div className="flex-1"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-full rounded-[20px] py-[16px] px-[12px] bg-[#1A1C22] gap-[16px] flex flex-row"
        >
          <div>
            <SvgIcon icon={AppIcons["Warning"]} size={20} />
          </div>

          <div>
            <p className="text-[14px] text-[#6B7280] items-start">
              To prevent loss of funds, use this address on exchanges or assets
              compatible with the following networks: Ethereum, Solana, Base,
              Arbitrum, Polygon
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
