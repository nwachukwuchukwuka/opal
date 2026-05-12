import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppLimitSheet, {
  AppLimitSheetRef,
} from "@/components/block/Applimitsheet";
import AppLockActionSheet, {
  AppLockActionSheetRef,
} from "@/components/block/AppLockActionSheet";
import AppLockSheet, { AppLockSheetRef } from "@/components/block/AppLockSheet";
import BlockCard from "@/components/block/BlockCard";
import IdeaCard from "@/components/block/IdeaCard";
import LiveEventModal from "@/components/block/LiveEventModal";
import NewBlockOptions from "@/components/block/NewBlockOptions";
import NewBlockSheet, {
  NewBlockSheetRef,
} from "@/components/block/NewBlocksheet";
import { SessionInfoCard } from "@/components/home/SessionInfoCard";
import WorkTimeModal from "@/components/WorkTimeModal/index.tsx";
import { DisabledInfoModal } from "../../components/DisabledInfoModal";
import EditSessionSheet, {
  EditSessionSheetRef,
} from "../../components/EditSessionSheet";
import {
  BLOCK_IDEAS,
  BlockIdea,
  BlockItem,
  DEFAULT_SESSION_CONFIG,
  INITIAL_ACTIVE_BLOCKS,
  INITIAL_UPCOMING_BLOCKS,
} from "../../constants/appData";
import { SessionConfig } from "../../types";

const BlocksScreen = () => {
  // Block state
  const [activeBlocks, setActiveBlocks] = useState<BlockItem[]>(
    INITIAL_ACTIVE_BLOCKS
  );
  const [upcomingBlocks, setUpcomingBlocks] = useState<BlockItem[]>(
    INITIAL_UPCOMING_BLOCKS
  );

  // Sheet refs
  const editSessionRef = useRef<EditSessionSheetRef>(null);
  const newBlockSheetRef = useRef<NewBlockSheetRef>(null);
  const appLimitSheetRef = useRef<AppLimitSheetRef>(null);
  const appLockSheetRef = useRef<AppLockSheetRef>(null);
  const appLockActionRef = useRef<AppLockActionSheetRef>(null);

  const [selectedConfig, setSelectedConfig] = useState<SessionConfig | null>(
    null
  );

  // Modal states
  const [isDisabledModalVisible, setIsDisabledModalVisible] = useState(false);
  const [selectedDisabledBlock, setSelectedDisabledBlock] =
    useState<BlockItem | null>(null);
  const [isLiveEventModalVisible, setIsLiveEventModalVisible] = useState(false);
  const [isWorkTimeModalVisible, setIsWorkTimeModalVisible] = useState(false);
  const [selectedSessionName, setSelectedSessionName] = useState("Work Time");

  const [appLockStatus, setAppLockStatus] = useState<"locked" | "unlocked">(
    "locked"
  );
  const [unlockTimeLeft, setUnlockTimeLeft] = useState(0);

  useEffect(() => {
    let timer: any;
    if (appLockStatus === "unlocked" && unlockTimeLeft > 0) {
      timer = setInterval(() => {
        setUnlockTimeLeft((prev) => prev - 1);
        updateAppLockUI(unlockTimeLeft - 1);
      }, 1000);
    } else if (unlockTimeLeft <= 0 && appLockStatus === "unlocked") {
      handleRelock();
    }
    return () => clearInterval(timer);
  }, [appLockStatus, unlockTimeLeft]);

  const updateAppLockUI = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const timeString = `${m}:${s < 10 ? "0" : ""}${s}`;
    const updateBlock = (b: BlockItem) => {
      if (b.name === "App Lock") {
        return {
          ...b,
          schedule: `Locking in ${m}m ${s}s`,
          countdown: `Remaining ${timeString}`,
          status: "upcoming" as const,
        };
      }
      return b;
    };

    setActiveBlocks((prev) => prev.map(updateBlock));
  };

  const handleUnlock = () => {
    setAppLockStatus("unlocked");
    setUnlockTimeLeft(300);
    const appLock = activeBlocks.find((b) => b.name === "App Lock");
    if (appLock) {
    }

    appLockActionRef.current?.dismiss();
  };

  const handleRelock = () => {
    setAppLockStatus("locked");
    setUnlockTimeLeft(0);

    setActiveBlocks((prev) =>
      prev.map((b) => {
        if (b.name === "App Lock") {
          return {
            ...b,
            schedule: "Locked • Every day • 5/6 unlocks left",
            countdown: undefined,
            status: "active",
          };
        }
        return b;
      })
    );

    appLockActionRef.current?.dismiss();
  };

  const handleSaveAppLock = () => {
    const newAppLockBlock: BlockItem = {
      id: Date.now().toString(),
      name: "App Lock",
      icon: "🔒",
      status: "active",
      schedule: "Locked • Every day • 5/6 unlocks left",
      progress: 0,
      blockedApps: [],
    };
    setActiveBlocks((prev) => [...prev, newAppLockBlock]);

    appLockSheetRef.current?.dismiss();
  };

  const handleBlockPress = (item: BlockItem) => {
    if (item.status === "disabled") {
      setSelectedDisabledBlock(item);
      setIsDisabledModalVisible(true);
    } else if (item.name === "App Lock") {
      appLockActionRef.current?.present();
    } else {
      const configToEdit: SessionConfig = {
        ...DEFAULT_SESSION_CONFIG,
        id: item.id,
        name: item.name,
        icon: item.icon,
        isEnabled: true,
      };
      setSelectedConfig(configToEdit);
      editSessionRef.current?.present();
    }
  };

  const handleEnableBlock = () => {
    if (!selectedDisabledBlock) return;
    setIsDisabledModalVisible(false);
    setSelectedDisabledBlock(null);
  };

  const handleSaveSession = (newConfig: SessionConfig) => {
    editSessionRef.current?.dismiss();
  };

  const handleIdeaPress = (idea: BlockIdea) => {
    if (idea.isLive) {
      setSelectedSessionName(idea.name);
      setIsLiveEventModalVisible(true);
    }
  };

  const handleJoinLiveEvent = () => {
    setIsLiveEventModalVisible(false);
    setIsWorkTimeModalVisible(true);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">

        {/* Floating Action Button */}
        <Pressable
          onPress={() => newBlockSheetRef.current?.present()}
          className="absolute bottom-12 right-6 w-16 h-16 bg-emerald-600 rounded-full items-center justify-center  z-50"
        >
          <Ionicons name="add" size={32} color="white" />
        </Pressable>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Hero Header Section */}
          <View className="px-5 pt-8 mb-10">
            <View className="mb-6 px-2">
              <Text className="text-emerald-600 text-[10px] font-bold  mb-1.5 uppercase">
                Control Center
              </Text>
              <Text className="text-slate-900 text-4xl font-bold leading-tight">
                My Blocks
              </Text>
            </View>
            <SessionInfoCard />
          </View>

          <View className="px-5 gap-8">

            {/* Active Blocks Card Group */}
            <View>
              <Text className="text-slate-900 text-xl font-bold mb-3 ml-2">
                Active right now
              </Text>
              <View className="bg-white rounded-[32px]  gap-4">
                {activeBlocks.map((item) => (
                  <BlockCard
                    key={item.id}
                    item={item}
                    onPress={handleBlockPress}
                  />
                ))}
              </View>
            </View>

            <View>
              <Text className="text-slate-900 text-xl font-bold mb-3 ml-2">
                Upcoming schedule
              </Text>
              <View className="gap-4">
                {upcomingBlocks.map((item) => (
                  <View
                    key={item.id}
                    className=""
                  >
                    <BlockCard
                      item={item}
                      onPress={handleBlockPress}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* New Block Highlighted Zone */}
            <View>
              <Text className="text-slate-900 text-xl font-bold mb-3 ml-2">
                Create new block
              </Text>
              <NewBlockOptions />
            </View>

            {/* Ideas Separated Items */}
            <View>
              <Text className="text-slate-900 text-xl font-bold mb-3 ml-2">
                Inspiration and ideas
              </Text>
              <View className="gap-5">
                {BLOCK_IDEAS.map((idea) => (
                  <View
                    key={idea.id}
                    className="overflow-hidden rounded-3xl"
                  >
                    <IdeaCard
                      idea={idea}
                      onPress={() => handleIdeaPress(idea)}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>



      </SafeAreaView>

      {/* Modals & Sheets remain entirely untouched logically */}
      {selectedConfig && (
        <EditSessionSheet
          ref={editSessionRef}
          initialConfig={selectedConfig}
          onSave={handleSaveSession}
          onCancelSession={() => editSessionRef.current?.dismiss()}
        />
      )}

      <DisabledInfoModal
        visible={isDisabledModalVisible}
        disabledUntil={selectedDisabledBlock?.disabledUntil || ""}
        onEnable={handleEnableBlock}
        onDismiss={() => {
          setIsDisabledModalVisible(false);
          setSelectedDisabledBlock(null);
        }}
      />

      <LiveEventModal
        visible={isLiveEventModalVisible}
        onJoin={handleJoinLiveEvent}
        onClose={() => setIsLiveEventModalVisible(false)}
      />

      <WorkTimeModal
        visible={isWorkTimeModalVisible}
        sessionName={selectedSessionName}
        onClose={() => setIsWorkTimeModalVisible(false)}
      />

      <NewBlockSheet
        ref={newBlockSheetRef}
        onBlockNow={() => {
          newBlockSheetRef.current?.dismiss();
        }}
        onRecurringSession={() => {
          newBlockSheetRef.current?.dismiss();
        }}
        onAppLimit={() => {
          newBlockSheetRef.current?.dismiss();
          setTimeout(() => {
            appLimitSheetRef.current?.present();
          }, 300);
        }}
        onLock={() => {
          newBlockSheetRef.current?.dismiss();
          setTimeout(() => {
            appLockSheetRef.current?.present();
          }, 300);
        }}
      />

      <AppLimitSheet
        ref={appLimitSheetRef}
        onSave={(config) => {
          console.log("App Limit saved:", config);
          appLimitSheetRef.current?.dismiss();
        }}
      />

      <AppLockActionSheet
        ref={appLockActionRef}
        isUnlocked={appLockStatus === "unlocked"}
        remainingSeconds={unlockTimeLeft}
        onUnlock={handleUnlock}
        onRelock={handleRelock}
        onEdit={() => {
          appLockActionRef.current?.dismiss();
        }}
      />

      <AppLockSheet
        ref={appLockSheetRef}
        onSave={handleSaveAppLock}
        onSelectApps={() => console.log("Select Apps")}
        onSelectDuration={() => console.log("Select Duration")}
        onSelectDifficulty={() => console.log("Select Difficulty")}
      />
    </>
  );
};

export default BlocksScreen;