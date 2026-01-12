// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Pressable, Text, View } from "react-native";
// import { COLORS } from "../../constants";

// interface SessionInfoCardProps {
//   isExpanded: boolean;
//   onToggle: () => void;
// }

// export const SessionInfoCard = ({
//   isExpanded,
//   onToggle,
// }: SessionInfoCardProps) => (
//   <View className="bg-zinc-900 rounded-t-3xl px-5 pt-4 pb-2">
//     <Pressable
//       onPress={onToggle}
//       className="flex-row items-center justify-between"
//     >
//       <View>
//         <View className="flex-row items-center mb-2">
//           <Text className="text-zinc-400 text-sm">Session</Text>
//           <Text className="text-zinc-400 text-sm mx-2">•</Text>
//           <Ionicons name="time-outline" size={14} color={COLORS.zinc400} />
//           <Text className="text-zinc-400 text-sm ml-1">3</Text>
//           <Text className="text-zinc-400 text-sm mx-2">•</Text>
//           <Text className="text-zinc-400 text-sm">02:11:50</Text>
//         </View>
//         <View className="flex-row items-center">
//           <View className="w-8 h-8 bg-zinc-700 rounded-lg items-center justify-center mr-3">
//             <Ionicons name="briefcase" size={18} color={COLORS.white} />
//           </View>
//           <Text className="text-white text-lg font-semibold">Work Time</Text>
//         </View>
//       </View>
//       <Ionicons
//         name={isExpanded ? "chevron-down" : "chevron-up"}
//         size={24}
//         color={COLORS.zinc400}
//       />
//     </Pressable>
//     {isExpanded && (
//       <View className="mt-4 pt-4 border-t border-zinc-800">
//         <View className="flex-row justify-between mb-3">
//           <Text className="text-zinc-400">Remaining</Text>
//           <Text className="text-white font-semibold">02:11:50</Text>
//         </View>
//         <View className="flex-row justify-between mb-3">
//           <Text className="text-zinc-400">Blocked Apps</Text>
//           <Text className="text-white font-semibold">12 apps</Text>
//         </View>
//         <View className="flex-row justify-between">
//           <Text className="text-zinc-400">Difficulty</Text>
//           <Text className="text-white font-semibold">Normal</Text>
//         </View>
//         <View className="flex-row gap-3 mt-4">
//           <Pressable className="flex-1 py-3 rounded-full bg-emerald-500">
//             <Text className="text-white text-center font-semibold">Snooze</Text>
//           </Pressable>
//           <Pressable className="flex-1 py-3 rounded-full border border-zinc-700">
//             <Text className="text-zinc-400 text-center font-semibold">
//               End Session
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     )}
//   </View>
// );


// claude
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants";
import WorkTimeModal from "../WorkTimeModal/index.tsx";

export const SessionInfoCard = () => {
  const [workTimeModalVisible, setWorkTimeModalVisible] = useState(false);

  return (
    <>
      <View className="bg-zinc-900 rounded-t-3xl px-5 pt-4 pb-4">
        <Pressable
          onPress={() => setWorkTimeModalVisible(true)}
          className="flex-row items-center justify-between"
        >
          <View>
            <View className="flex-row items-center mb-2">
              <Text className="text-zinc-400 text-sm">Session</Text>
              <Text className="text-zinc-400 text-sm mx-2">•</Text>
              <Ionicons name="time-outline" size={14} color={COLORS.zinc400} />
              <Text className="text-zinc-400 text-sm ml-1">3</Text>
              <Text className="text-zinc-400 text-sm mx-2">•</Text>
              <Text className="text-zinc-400 text-sm">02:11:50</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-zinc-700 rounded-lg items-center justify-center mr-3">
                <Ionicons name="briefcase" size={18} color={COLORS.white} />
              </View>
              <Text className="text-white text-lg font-semibold">Work Time</Text>
            </View>
          </View>
          <Ionicons name="chevron-up" size={24} color={COLORS.zinc400} />
        </Pressable>
      </View>

      <WorkTimeModal
        visible={workTimeModalVisible}
        onClose={() => setWorkTimeModalVisible(false)}
      />
    </>
  );
};

// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Pressable, Text, View } from "react-native";
// import { COLORS } from "../../constants";

// interface SessionInfoCardProps {
//   onPress: () => void;
// }

// export const SessionInfoCard = ({ onPress }: SessionInfoCardProps) => (
//   // The entire card is now a pressable area
//   <Pressable onPress={onPress}>
//     <View className="bg-zinc-900 rounded-t-3xl px-5 pt-4 pb-4">
//       <View className="flex-row items-center justify-between">
//         <View>
//           {/* Top line of info */}
//           <View className="flex-row items-center mb-2">
//             <Text className="text-zinc-400 text-sm">Session</Text>
//             <Text className="text-zinc-400 text-sm mx-2">•</Text>
//             <Ionicons name="time-outline" size={14} color={COLORS.zinc400} />
//             <Text className="text-zinc-400 text-sm ml-1">3</Text>
//             <Text className="text-zinc-400 text-sm mx-2">•</Text>
//             <Text className="text-zinc-400 text-sm">02:11:50</Text>
//           </View>
//           {/* Main title */}
//           <View className="flex-row items-center">
//             <View className="w-8 h-8 bg-zinc-700 rounded-lg items-center justify-center mr-3">
//               <Ionicons name="briefcase" size={18} color={COLORS.white} />
//             </View>
//             <Text className="text-white text-lg font-semibold">Work Time</Text>
//           </View>
//         </View>
//         {/* The chevron is removed as it's no longer an accordion */}
//       </View>
//     </View>
//   </Pressable>
// );