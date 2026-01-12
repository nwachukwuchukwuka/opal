import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export type MilestonesSheetRef = BottomSheetModal;

// Mock Data based on screenshots
const ALL_MILESTONES = [
  {
    id: "1",
    title: "First Gem",
    subtitle: "You Installed Opal",
    description: "Reach this MileStone when you complete the Opal onboarding.",
    unlockedOn: "2 Sep 2024",
    color: "#4ade80", // Greenish
    status: "current",
    imageUri:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Unwavering Gem",
    subtitle: "Get Opal Pro",
    description: "Reach this MileStone when you become an Opal Pro subscriber.",
    unlockedOn: "2 Sep 2024",
    color: "#8b5cf6", // Purple
    status: "unlocked",
    imageUri:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop", // Reusing for mock
  },
  {
    id: "3",
    title: "Motivated Gem",
    subtitle: "Use Opal for 2 Days",
    description:
      "Reach this MileStone when you open the Opal app 2 days in a row.",
    status: "unlocked",
    color: "#c084fc",
    imageUri:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Committed Gem",
    subtitle: "Use Opal for 5 Days",
    description:
      "Reach this MileStone when you open the Opal app 5 days in a row.",
    status: "locked",
    color: "#94a3b8", // Grey for locked
    progress: 0.4, // 2/5 days
    imageUri:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop", // Grey rock
  },
  {
    id: "5",
    title: "Balanced Gem",
    subtitle: "Use Opal for 10 Days",
    status: "locked",
    color: "#94a3b8",
    progress: 0.2,
    imageUri:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Driven Gem",
    subtitle: "Focus for 10 hours",
    status: "locked",
    color: "#94a3b8",
    progress: 0.5,
    imageUri:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
  },
];

const MilestonesSheet = forwardRef<MilestonesSheetRef>((props, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);

  // State for the Detail Modal
  const [selectedMilestone, setSelectedMilestone] = useState<
    (typeof ALL_MILESTONES)[0] | null
  >(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.8}
      />
    ),
    []
  );

  return (
    <>
      <BottomSheetModal
        // ref={ref}
        // snapPoints={snapPoints}
        // backgroundStyle={{ backgroundColor: "#18181b" }}
        // handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        // backdropComponent={renderBackdrop}
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
        index={0} 
        enableDynamicSizing={false} 
        enablePanDownToClose={true} 
        enableHandlePanningGesture={true} 
        enableContentPanningGesture={false}
      >
        <BottomSheetView className="flex-1 px-5 pt-2">
          <Text className="text-white text-xl font-bold mb-6">
            Your MileStones
          </Text>

          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {ALL_MILESTONES.map((stone) => (
                <Pressable
                  key={stone.id}
                  onPress={() => setSelectedMilestone(stone)}
                  className="w-[48%] bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4 items-center"
                >
                  <View className="mb-4 shadow-lg shadow-black">
                    <Image
                      source={{ uri: stone.imageUri }}
                      className="w-20 h-20 rounded-xl"
                      style={{ opacity: stone.status === "locked" ? 0.5 : 1 }}
                    />
                    {stone.status === "locked" && (
                      <View className="absolute top-0 right-0 bg-black/60 rounded-full p-1">
                        <Ionicons name="lock-closed" size={12} color="white" />
                      </View>
                    )}
                  </View>

                  <Text className="text-white font-bold text-center text-sm mb-1">
                    {stone.title}
                  </Text>
                  <Text className="text-zinc-500 text-xs text-center">
                    {stone.subtitle}
                  </Text>

                  {/* Progress Bar for Locked Items */}
                  {stone.status === "locked" &&
                    stone.progress !== undefined && (
                      <View className="w-10 h-1 bg-zinc-700 rounded-full mt-3">
                        <View
                          className="h-full bg-zinc-500 rounded-full"
                          style={{ width: `${stone.progress * 100}%` }}
                        />
                      </View>
                    )}
                </Pressable>
              ))}
            </View>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>

      {/* DETAIL MODAL (Overlay) */}
      <Modal
        visible={!!selectedMilestone}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMilestone(null)}
      >
        <View className="flex-1 bg-black/80 justify-center items-center px-4">
          {/* The Card */}
          {selectedMilestone && (
            <View className="bg-zinc-900 w-full max-w-sm rounded-[32px] overflow-hidden border border-zinc-800 relative">
              {/* Share Icon */}
              <TouchableOpacity className="absolute top-6 right-6 z-10">
                <Ionicons name="share-outline" size={24} color="white" />
              </TouchableOpacity>

              <View className="items-center pt-16 pb-10 px-6">
                <Text className="text-white text-2xl font-bold uppercase tracking-wide text-center mb-2">
                  {selectedMilestone.title}
                </Text>
                <Text className="text-zinc-400 text-sm text-center mb-10">
                  {selectedMilestone.subtitle}
                </Text>

                {/* Large Gem Image with Glow */}
                <View className="relative mb-12 items-center justify-center">
                  <View
                    className="absolute w-48 h-48 rounded-full blur-3xl opacity-40"
                    style={{
                      backgroundColor:
                        selectedMilestone.status === "locked"
                          ? "transparent"
                          : selectedMilestone.color,
                    }}
                  />
                  <Image
                    source={{ uri: selectedMilestone.imageUri }}
                    className="w-48 h-48"
                    style={{
                      resizeMode: "contain",
                      tintColor:
                        selectedMilestone.status === "locked"
                          ? "gray"
                          : undefined,
                    }}
                  />
                  {/* Stand/Shadow */}
                  <View className="w-24 h-3 bg-black/50 blur-md rounded-full mt-4" />
                </View>

                {/* Footer Info / Action */}
                {selectedMilestone.status === "current" ? (
                  <>
                    <View className="flex-row items-center mb-2">
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="white"
                      />
                      <Text className="text-white text-xs ml-2">
                        Unlocked on {selectedMilestone.unlockedOn}
                      </Text>
                    </View>
                    <Text className="text-zinc-400 text-center text-sm mb-8 px-4">
                      {selectedMilestone.description}
                    </Text>
                    <TouchableOpacity
                      className="bg-zinc-800 w-full py-4 rounded-full items-center"
                      disabled
                    >
                      <Text className="text-zinc-500 font-bold">
                        Current Gem
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : selectedMilestone.status === "unlocked" ? (
                  <>
                    <View className="flex-row items-center mb-2">
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="white"
                      />
                      <Text className="text-white text-xs ml-2">
                        Unlocked on {selectedMilestone.unlockedOn}
                      </Text>
                    </View>
                    <Text className="text-zinc-400 text-center text-sm mb-8 px-4">
                      {selectedMilestone.description}
                    </Text>
                    <TouchableOpacity className="bg-white w-full py-4 rounded-full items-center">
                      <Text className="text-black font-bold">Apply theme</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text className="text-zinc-400 text-center text-sm mb-6 px-4">
                      {selectedMilestone.description}
                    </Text>
                    {/* Progress Bar for Locked */}
                    {selectedMilestone.progress && (
                      <View className="w-16 h-1 bg-zinc-800 rounded-full mb-8">
                        <View
                          className="h-full bg-zinc-500 rounded-full"
                          style={{
                            width: `${selectedMilestone.progress * 100}%`,
                          }}
                        />
                      </View>
                    )}
                    <TouchableOpacity className="bg-white w-full py-4 rounded-full items-center flex-row justify-center gap-2">
                      <Ionicons name="lock-closed" size={16} color="black" />
                      <Text className="text-black font-bold">Locked</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Close Area (Invisible Backdrop) to close modal */}
              <TouchableWithoutFeedback
                onPress={() => setSelectedMilestone(null)}
              >
                <View className="absolute top-0 left-0 w-full h-full -z-10" />
              </TouchableWithoutFeedback>
            </View>
          )}

          {/* Close Button below card */}
          <TouchableOpacity
            onPress={() => setSelectedMilestone(null)}
            className="mt-6 w-10 h-10 bg-zinc-800 rounded-full items-center justify-center"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
});

export default MilestonesSheet;
