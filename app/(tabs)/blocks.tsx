// import { Ionicons } from "@expo/vector-icons";
// import { format } from "date-fns";
// import React, { useRef, useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import AppLimitSheet, {
//   AppLimitSheetRef,
// } from "@/components/block/Applimitsheet";
// import BlockCard from "@/components/block/BlockCard";
// import IdeaCard from "@/components/block/IdeaCard";
// import LiveEventModal from "@/components/block/LiveEventModal";
// import NewBlockOptions from "@/components/block/NewBlockOptions";
// import NewBlockSheet, {
//   NewBlockSheetRef,
// } from "@/components/block/NewBlocksheet";
// import { SessionInfoCard } from "@/components/home/SessionInfoCard";
// import WorkTimeModal from "@/components/WorkTimeModal/index.tsx";
// import { DisabledInfoModal } from "../../components/DisabledInfoModal";
// import EditSessionSheet, {
//   EditSessionSheetRef,
// } from "../../components/EditSessionSheet";
// import {
//   BLOCK_IDEAS,
//   BlockIdea,
//   BlockItem,
//   BlockStatus,
//   DEFAULT_SESSION_CONFIG,
//   INITIAL_ACTIVE_BLOCKS,
//   INITIAL_UPCOMING_BLOCKS,
// } from "../../constants/appData";
// import { SessionConfig } from "../../types";

// const BlocksScreen = () => {
//   // Block state
//   const [activeBlocks, setActiveBlocks] = useState<BlockItem[]>(
//     INITIAL_ACTIVE_BLOCKS
//   );
//   const [upcomingBlocks, setUpcomingBlocks] = useState<BlockItem[]>(
//     INITIAL_UPCOMING_BLOCKS
//   );

//   // Sheet refs
//   const editSessionRef = useRef<EditSessionSheetRef>(null);
//   const newBlockSheetRef = useRef<NewBlockSheetRef>(null);
//   const appLimitSheetRef = useRef<AppLimitSheetRef>(null);
//   const [selectedConfig, setSelectedConfig] = useState<SessionConfig | null>(
//     null
//   );

//   // Modal states
//   const [isDisabledModalVisible, setIsDisabledModalVisible] = useState(false);
//   const [selectedDisabledBlock, setSelectedDisabledBlock] =
//     useState<BlockItem | null>(null);
//   const [isLiveEventModalVisible, setIsLiveEventModalVisible] = useState(false);
//   const [isWorkTimeModalVisible, setIsWorkTimeModalVisible] = useState(false);
//   const [selectedSessionName, setSelectedSessionName] = useState("Work Time");

//   // Handlers
//   const handleBlockPress = (item: BlockItem) => {
//     if (item.status === "disabled") {
//       setSelectedDisabledBlock(item);
//       setIsDisabledModalVisible(true);
//     } else {
//       const configToEdit: SessionConfig = {
//         ...DEFAULT_SESSION_CONFIG,
//         id: item.id,
//         name: item.name,
//         icon: item.icon,
//         isEnabled: true,
//       };
//       setSelectedConfig(configToEdit);
//       editSessionRef.current?.present();
//     }
//   };

//   const handleEnableBlock = () => {
//     if (!selectedDisabledBlock) return;

//     const blockId = selectedDisabledBlock.id;
//     const updateBlock = (block: BlockItem) =>
//       block.id === blockId
//         ? {
//             ...block,
//             status: "upcoming" as BlockStatus,
//             disabledUntil: undefined,
//             countdown: "Scheduled",
//           }
//         : block;

//     setActiveBlocks((prev) => prev.map(updateBlock));
//     setUpcomingBlocks((prev) => prev.map(updateBlock));
//     setIsDisabledModalVisible(false);
//     setSelectedDisabledBlock(null);
//   };

//   const handleSaveSession = (newConfig: SessionConfig) => {
//     const updateBlock = (block: BlockItem, isActive: boolean) => {
//       if (block.id !== newConfig.id) return block;
//       return {
//         ...block,
//         name: newConfig.name,
//         icon: newConfig.icon,
//         status: newConfig.isEnabled
//           ? ((isActive ? "active" : "upcoming") as BlockStatus)
//           : ("disabled" as BlockStatus),
//         disabledUntil:
//           !newConfig.isEnabled && newConfig.disabledUntil instanceof Date
//             ? format(newConfig.disabledUntil, "d MMM")
//             : newConfig.disabledUntil === "indefinitely"
//               ? "Indefinitely"
//               : undefined,
//       };
//     };

//     setActiveBlocks((prev) => prev.map((b) => updateBlock(b, true)));
//     setUpcomingBlocks((prev) => prev.map((b) => updateBlock(b, false)));
//     editSessionRef.current?.dismiss();
//   };

//   const handleIdeaPress = (idea: BlockIdea) => {
//     if (idea.isLive) {
//       setSelectedSessionName(idea.name);
//       setIsLiveEventModalVisible(true);
//     } else {
//       console.log("Add idea:", idea.name);
//     }
//   };

//   const handleJoinLiveEvent = () => {
//     setIsLiveEventModalVisible(false);
//     setIsWorkTimeModalVisible(true);
//   };

//   return (
//     <>
//       <SafeAreaView edges={["top"]} className="flex-1 bg-black ">
//         {/* Header */}
//         <View className="flex-row justify-between items-center px-5 pt-4 pb-6">
//           <Text className="text-white text-xl font-bold">Blocks</Text>
//           <View className="flex-row items-center gap-3">
//             <Pressable className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center">
//               <Ionicons name="sync" size={20} color="white" />
//             </Pressable>
//             <Pressable
//               onPress={() => newBlockSheetRef.current?.present()}
//               className="w-10 h-10 bg-teal-400 rounded-full items-center justify-center"
//             >
//               <Ionicons name="add" size={24} color="black" />
//             </Pressable>
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         >
//           <View className="px-3 gap-8">
//             {/* Now Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 Now
//               </Text>
//               {activeBlocks.map((item) => (
//                 <BlockCard
//                   key={item.id}
//                   item={item}
//                   onPress={handleBlockPress}
//                 />
//               ))}
//             </View>

//             {/* Upcoming Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 Upcoming
//               </Text>
//               <View className="gap-3">
//                 {upcomingBlocks.map((item) => (
//                   <BlockCard
//                     key={item.id}
//                     item={item}
//                     onPress={handleBlockPress}
//                   />
//                 ))}
//               </View>
//             </View>

//             {/* New Block Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 New Block
//               </Text>
//               <NewBlockOptions />
//             </View>

//             {/* More Ideas Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 More Ideas
//               </Text>
//               <View className="gap-3">
//                 {BLOCK_IDEAS.map((idea) => (
//                   <IdeaCard
//                     key={idea.id}
//                     idea={idea}
//                     onPress={() => handleIdeaPress(idea)}
//                   />
//                 ))}
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <SessionInfoCard />
//       </SafeAreaView>

//       {/* Modals & Sheets */}
//       {selectedConfig && (
//         <EditSessionSheet
//           ref={editSessionRef}
//           initialConfig={selectedConfig}
//           onSave={handleSaveSession}
//           onCancelSession={() => editSessionRef.current?.dismiss()}
//         />
//       )}

//       <DisabledInfoModal
//         visible={isDisabledModalVisible}
//         disabledUntil={selectedDisabledBlock?.disabledUntil || ""}
//         onEnable={handleEnableBlock}
//         onDismiss={() => {
//           setIsDisabledModalVisible(false);
//           setSelectedDisabledBlock(null);
//         }}
//       />

//       <LiveEventModal
//         visible={isLiveEventModalVisible}
//         onJoin={handleJoinLiveEvent}
//         onClose={() => setIsLiveEventModalVisible(false)}
//       />

//       <WorkTimeModal
//         visible={isWorkTimeModalVisible}
//         sessionName={selectedSessionName}
//         onClose={() => setIsWorkTimeModalVisible(false)}
//       />

//       <NewBlockSheet
//         ref={newBlockSheetRef}
//         onBlockNow={() => {
//           newBlockSheetRef.current?.dismiss();
//           // Handle Block Now
//         }}
//         onRecurringSession={() => {
//           newBlockSheetRef.current?.dismiss();
//           // Handle Recurring Session
//         }}
//         onAppLimit={() => {
//           newBlockSheetRef.current?.dismiss();
//           setTimeout(() => {
//             appLimitSheetRef.current?.present();
//           }, 300);
//         }}
//         onLock={() => {
//           newBlockSheetRef.current?.dismiss();
//           // Handle Lock
//         }}
//       />

//       <AppLimitSheet
//         ref={appLimitSheetRef}
//         onSave={(config) => {
//           console.log("App Limit saved:", config);
//           appLimitSheetRef.current?.dismiss();
//         }}
//       />
//     </>
//   );
// };

// export default BlocksScreen;

// import { Ionicons } from "@expo/vector-icons";
// import React, { useRef, useState } from "react";
// import { Pressable, ScrollView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import AppLimitSheet, {
//   AppLimitSheetRef,
// } from "@/components/block/Applimitsheet";
// // 1. IMPORT AppLockSheet
// import AppLockActionSheet, {
//   AppLockActionSheetRef,
// } from "@/components/block/AppLockActionSheet";
// import AppLockSheet, { AppLockSheetRef } from "@/components/block/AppLockSheet";
// import BlockCard from "@/components/block/BlockCard";
// import IdeaCard from "@/components/block/IdeaCard";
// import LiveEventModal from "@/components/block/LiveEventModal";
// import NewBlockOptions from "@/components/block/NewBlockOptions";
// import NewBlockSheet, {
//   NewBlockSheetRef,
// } from "@/components/block/NewBlocksheet";
// import { SessionInfoCard } from "@/components/home/SessionInfoCard";
// import WorkTimeModal from "@/components/WorkTimeModal/index.tsx";
// import { DisabledInfoModal } from "../../components/DisabledInfoModal";
// import EditSessionSheet, {
//   EditSessionSheetRef,
// } from "../../components/EditSessionSheet";
// import {
//   BLOCK_IDEAS,
//   BlockIdea,
//   BlockItem,
//   DEFAULT_SESSION_CONFIG,
//   INITIAL_ACTIVE_BLOCKS,
//   INITIAL_UPCOMING_BLOCKS,
// } from "../../constants/appData";
// import { SessionConfig } from "../../types";

// const BlocksScreen = () => {
//   // Block state
//   const [activeBlocks, setActiveBlocks] = useState<BlockItem[]>(
//     INITIAL_ACTIVE_BLOCKS
//   );
//   const [upcomingBlocks, setUpcomingBlocks] = useState<BlockItem[]>(
//     INITIAL_UPCOMING_BLOCKS
//   );

//   // Sheet refs
//   const editSessionRef = useRef<EditSessionSheetRef>(null);
//   const newBlockSheetRef = useRef<NewBlockSheetRef>(null);
//   const appLimitSheetRef = useRef<AppLimitSheetRef>(null);
//   // 2. CREATE REF FOR APP LOCK SHEET
//   const appLockSheetRef = useRef<AppLockSheetRef>(null);
//   const appLockActionRef = useRef<AppLockActionSheetRef>(null);

//   const [selectedConfig, setSelectedConfig] = useState<SessionConfig | null>(
//     null
//   );

//   // Modal states
//   const [isDisabledModalVisible, setIsDisabledModalVisible] = useState(false);
//   const [selectedDisabledBlock, setSelectedDisabledBlock] =
//     useState<BlockItem | null>(null);
//   const [isLiveEventModalVisible, setIsLiveEventModalVisible] = useState(false);
//   const [isWorkTimeModalVisible, setIsWorkTimeModalVisible] = useState(false);
//   const [selectedSessionName, setSelectedSessionName] = useState("Work Time");

//   const handleSaveAppLock = () => {
//     const newAppLockBlock: BlockItem = {
//       id: Date.now().toString(),
//       name: "App Lock",
//       icon: "🔒",
//       status: "active",
//       schedule: "Locked • Every day • 5/6 unlocks left",
//       progress: 0,
//       blockedApps: [],
//     };
//     setActiveBlocks((prev) => [...prev, newAppLockBlock]);

//     appLockSheetRef.current?.dismiss();

//     // Optional: If you want to open the Action Sheet IMMEDIATELY after saving:
//     // setTimeout(() => {
//     //   appLockActionRef.current?.present();
//     // }, 300);
//   };

//   // Handlers
//   const handleBlockPress = (item: BlockItem) => {
//     if (item.status === "disabled") {
//       setSelectedDisabledBlock(item);
//       setIsDisabledModalVisible(true);
//     } else if (item.name === "App Lock") {
//       appLockActionRef.current?.present();
//     } else {
//       const configToEdit: SessionConfig = {
//         ...DEFAULT_SESSION_CONFIG,
//         id: item.id,
//         name: item.name,
//         icon: item.icon,
//         isEnabled: true,
//       };
//       setSelectedConfig(configToEdit);
//       editSessionRef.current?.present();
//     }
//   };

//   const handleEnableBlock = () => {
//     if (!selectedDisabledBlock) return;
//     // ... (Enable logic) ...
//     setIsDisabledModalVisible(false);
//     setSelectedDisabledBlock(null);
//   };

//   const handleSaveSession = (newConfig: SessionConfig) => {
//     // ... (Save logic) ...
//     editSessionRef.current?.dismiss();
//   };

//   const handleIdeaPress = (idea: BlockIdea) => {
//     if (idea.isLive) {
//       setSelectedSessionName(idea.name);
//       setIsLiveEventModalVisible(true);
//     }
//   };

//   const handleJoinLiveEvent = () => {
//     setIsLiveEventModalVisible(false);
//     setIsWorkTimeModalVisible(true);
//   };

//   return (
//     <>
//       <SafeAreaView edges={["top"]} className="flex-1 bg-black ">
//         {/* Header */}
//         <View className="flex-row justify-between items-center px-5 pt-4 pb-6">
//           <Text className="text-white text-xl font-bold">Blocks</Text>
//           <View className="flex-row items-center gap-3">
//             <Pressable className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center">
//               <Ionicons name="sync" size={20} color="white" />
//             </Pressable>
//             <Pressable
//               onPress={() => newBlockSheetRef.current?.present()}
//               className="w-10 h-10 bg-teal-400 rounded-full items-center justify-center"
//             >
//               <Ionicons name="add" size={24} color="black" />
//             </Pressable>
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         >
//           <View className="px-3 gap-8">
//             {/* Now Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 Now
//               </Text>
//               {activeBlocks.map((item) => (
//                 <BlockCard
//                   key={item.id}
//                   item={item}
//                   onPress={handleBlockPress}
//                 />
//               ))}
//             </View>

//             {/* Upcoming Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 Upcoming
//               </Text>
//               <View className="gap-3">
//                 {upcomingBlocks.map((item) => (
//                   <BlockCard
//                     key={item.id}
//                     item={item}
//                     onPress={handleBlockPress}
//                   />
//                 ))}
//               </View>
//             </View>

//             {/* New Block Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 New Block
//               </Text>
//               <NewBlockOptions />
//             </View>

//             {/* More Ideas Section */}
//             <View className="gap-3">
//               <Text className="text-zinc-200 uppercase tracking-wider">
//                 More Ideas
//               </Text>
//               <View className="gap-3">
//                 {BLOCK_IDEAS.map((idea) => (
//                   <IdeaCard
//                     key={idea.id}
//                     idea={idea}
//                     onPress={() => handleIdeaPress(idea)}
//                   />
//                 ))}
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <SessionInfoCard />
//       </SafeAreaView>

//       {/* Modals & Sheets */}
//       {selectedConfig && (
//         <EditSessionSheet
//           ref={editSessionRef}
//           initialConfig={selectedConfig}
//           onSave={handleSaveSession}
//           onCancelSession={() => editSessionRef.current?.dismiss()}
//         />
//       )}

//       <DisabledInfoModal
//         visible={isDisabledModalVisible}
//         disabledUntil={selectedDisabledBlock?.disabledUntil || ""}
//         onEnable={handleEnableBlock}
//         onDismiss={() => {
//           setIsDisabledModalVisible(false);
//           setSelectedDisabledBlock(null);
//         }}
//       />

//       <LiveEventModal
//         visible={isLiveEventModalVisible}
//         onJoin={handleJoinLiveEvent}
//         onClose={() => setIsLiveEventModalVisible(false)}
//       />

//       <WorkTimeModal
//         visible={isWorkTimeModalVisible}
//         sessionName={selectedSessionName}
//         onClose={() => setIsWorkTimeModalVisible(false)}
//       />

//       <NewBlockSheet
//         ref={newBlockSheetRef}
//         onBlockNow={() => {
//           newBlockSheetRef.current?.dismiss();
//         }}
//         onRecurringSession={() => {
//           newBlockSheetRef.current?.dismiss();
//         }}
//         onAppLimit={() => {
//           newBlockSheetRef.current?.dismiss();
//           setTimeout(() => {
//             appLimitSheetRef.current?.present();
//           }, 300);
//         }}
//         onLock={() => {
//           // 3. CONNECT THE HANDLER
//           newBlockSheetRef.current?.dismiss();
//           setTimeout(() => {
//             appLockSheetRef.current?.present();
//           }, 300);
//         }}
//       />

//       <AppLimitSheet
//         ref={appLimitSheetRef}
//         onSave={(config) => {
//           console.log("App Limit saved:", config);
//           appLimitSheetRef.current?.dismiss();
//         }}
//       />

//       <AppLockActionSheet
//         ref={appLockActionRef}
//         onUnlock={() => {
//           console.log("Unlock clicked");
//           appLockActionRef.current?.dismiss();
//         }}
//         onEdit={() => {
//           console.log("Edit Lock clicked");
//           appLockActionRef.current?.dismiss();
//         }}
//       />

//       <AppLockSheet
//         ref={appLockSheetRef}
//         onSave={handleSaveAppLock} // <--- Connected here
//         onSelectApps={() => console.log("Select Apps")}
//         onSelectDuration={() => console.log("Select Duration")}
//         onSelectDifficulty={() => console.log("Select Difficulty")}
//       />
//     </>
//   );
// };

// export default BlocksScreen;

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
    // let timer: NodeJS.Timeout;
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
      <SafeAreaView edges={["top"]} className="flex-1 bg-black ">
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 pt-4 pb-6">
          <Text className="text-white text-xl font-bold">Blocks</Text>
          <View className="flex-row items-center gap-3">
            <Pressable className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center">
              <Ionicons name="sync" size={20} color="white" />
            </Pressable>
            <Pressable
              onPress={() => newBlockSheetRef.current?.present()}
              className="w-10 h-10 bg-teal-400 rounded-full items-center justify-center"
            >
              <Ionicons name="add" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-3 gap-8">
            {/* Now Section */}
            <View className="gap-3">
              <Text className="text-zinc-200 uppercase tracking-wider">
                Now
              </Text>
              {activeBlocks.map((item) => (
                <BlockCard
                  key={item.id}
                  item={item}
                  onPress={handleBlockPress}
                />
              ))}
            </View>

            {/* Upcoming Section */}
            <View className="gap-3">
              <Text className="text-zinc-200 uppercase tracking-wider">
                Upcoming
              </Text>
              <View className="gap-3">
                {upcomingBlocks.map((item) => (
                  <BlockCard
                    key={item.id}
                    item={item}
                    onPress={handleBlockPress}
                  />
                ))}
              </View>
            </View>

            {/* New Block Section */}
            <View className="gap-3">
              <Text className="text-zinc-200 uppercase tracking-wider">
                New Block
              </Text>
              <NewBlockOptions />
            </View>

            {/* More Ideas Section */}
            <View className="gap-3">
              <Text className="text-zinc-200 uppercase tracking-wider">
                More Ideas
              </Text>
              <View className="gap-3">
                {BLOCK_IDEAS.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onPress={() => handleIdeaPress(idea)}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <SessionInfoCard />
      </SafeAreaView>

      {/* Modals & Sheets */}
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
