/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import type { UserSavingsDepositData } from "../../types/models";
import { useExplorerStore } from "../../store/explorer/explorer.store";
import { useAuthStore } from "../../store/auth/auth.store";
import { WalletMaskDisplay } from "../../components";
import { useUtilStore } from "../../store";

export const ExplorerHome = () => {
  const { data, loadData, loading, lastUpdated } = useExplorerStore();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState<"overview" | "personal">(
    "overview"
  );

  // Filter user's personal data
  const userData = useMemo(
    () =>
      data.filter(
        (item) => item.user.toLowerCase() === user?.address.toLowerCase()
      ),
    [data, user]
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const totalUsers = new Set(data.map((item) => item.user)).size;
    const totalVolume = data.reduce((sum, item) => {
      const amount = parseFloat(item.amount.split(" ")[0]);
      return sum + amount;
    }, 0);

    const userVolume = userData.reduce((sum, item) => {
      const amount = parseFloat(item.amount.split(" ")[0]);
      return sum + amount;
    }, 0);

    return { totalUsers, totalVolume, userVolume };
  }, [data, userData]);

  const formatWei = (wei: string) => {
    const value = parseFloat(wei.split(" ")[0]);
    if (value >= 1e18) return `${(value / 1e18).toFixed(4)} MON`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(4)} Gwei`;
    return wei;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const { setForceHideFbb } = useUtilStore();

  useEffect(() => {
    setForceHideFbb(true);
    return () => {
      setForceHideFbb(false);
    };
  }, [setForceHideFbb]);

  // Load data on component mount
  useEffect(() => {
    loadData(false);
  }, [loadData]);

  return (
    <div className="pt-[120px] text-white px-6 pb-6">
      {/* Header with last updated and refresh */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col gap-4 justify-between items-center">
          <div>
            {/* <h1 className="text-3xl font-bold mb-2">Savings Explorer</h1> */}
            <p className="text-gray-400">
              Monitor general savings activity and your personal activity
            </p>
          </div>

          <div className="w-full flex flex-col items-end">
            <button
              onClick={() => loadData(true)}
              disabled={loading}
              className="bg-[#6C4EFF] hover:bg-[#5b3fe0] disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  {/* <RefreshCw className="w-4 h-4" /> */}
                  <span>Refresh</span>
                </>
              )}
            </button>
            {lastUpdated && (
              <p className="text-gray-400 text-sm mt-2">
                Last updated: {formatTimestamp(lastUpdated)}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex space-x-4 mb-8 border-b border-gray-700"
      >
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === "overview"
              ? "text-[#6C4EFF] border-b-2 border-[#6C4EFF]"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("personal")}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === "personal"
              ? "text-[#6C4EFF] border-b-2 border-[#6C4EFF]"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          My Activity
        </button>
      </motion.div>

      {/* Loading State */}
      {loading && data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-12"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-[#6C4EFF] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Loading savings activity...</p>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 mb-8"
          >
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Total Users
              </h3>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Total Volume
              </h3>
              <p className="text-2xl font-bold">
                {formatWei(stats.totalVolume + " wei")}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                Your Volume
              </h3>
              <p className="text-2xl font-bold">
                {formatWei(stats.userVolume + " wei")}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          {activeTab === "overview" ? (
            <OverviewTab
              data={data}
              loading={loading}
              formatWei={formatWei}
              formatTimestamp={formatTimestamp}
            />
          ) : (
            <PersonalTab
              data={userData}
              loading={loading}
              currentUser={user?.address}
              formatWei={formatWei}
              formatTimestamp={formatTimestamp}
            />
          )}
        </>
      )}
    </div>
  );
};
// Overview Tab Component
const OverviewTab = ({ data, formatWei, formatTimestamp }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-semibold">All Savings Activity</h2>
        <p className="text-gray-400 text-sm mt-1">
          {data.length} total transactions across the network
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50 sticky top-0">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                User
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                Amount
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                New Balance
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: UserSavingsDepositData, index: number) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#6C4EFF] rounded-full"></div>
                    <span className="font-mono text-sm">
                      {item.user.slice(0, 6)}...{item.user.slice(-4)}
                    </span>
                  </div>
                </td>
                <td className="p-4 font-medium">{formatWei(item.amount)}</td>
                <td className="p-4">{formatWei(item.newBalance)}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {formatTimestamp(Number(item.timestamp) * 1000)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

// Personal Tab Component
const PersonalTab = ({
  data,
  currentUser,
  formatWei,
  formatTimestamp,
}: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    {/* User Info Card */}
    <div className="bg-gradient-to-r from-[#6C4EFF]/20 to-purple-500/20 rounded-xl p-6 border border-[#6C4EFF]/30">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Wallet</h2>
          {currentUser && (
            <WalletMaskDisplay
              className="font-mono text-gray-300 bg-black/30 px-3 py-2 rounded-lg inline-block"
              address={currentUser}
            />
          )}
        </div>
        <div className="text-right">
          <p className="text-gray-400">Total Savings</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
      </div>
    </div>

    {/* Personal Transactions */}
    <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Your Savings Activity</h2>
      </div>
      {data.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          <p>No transactions found for your wallet address.</p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 sticky top-0">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  New Balance
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: UserSavingsDepositData, index: number) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                >
                  <td className="p-4">
                    <span className="font-medium text-[#6C4EFF]">
                      {formatWei(item.amount)}
                    </span>
                  </td>
                  <td className="p-4">{formatWei(item.newBalance)}</td>
                  <td className="p-4 text-gray-400 text-sm">
                    {formatTimestamp(Number(item.timestamp) * 1000)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </motion.div>
);
