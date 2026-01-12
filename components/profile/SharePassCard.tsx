// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import { Pressable, Text, View } from "react-native";

// export const SharePassCard = () => (
//   <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
//     <View className="flex-row justify-between items-center mb-4">
//       <Text className="text-white text-lg font-bold">
//         Share Pass, Get Rewards
//       </Text>
//       <View className="flex-row items-center">
//         <Ionicons name="person" size={14} color="white" />
//         <Text className="text-white font-bold ml-1">0</Text>
//       </View>
//     </View>

//     <LinearGradient
//       colors={["#4c7675", "#7dd3fc", "#4c7675"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       className="rounded-2xl h-48 items-center justify-center mb-4 relative overflow-hidden"
//     >
//       <View className="absolute border-[20px] border-white/10 w-64 h-64 rounded-full" />
//       <View className="absolute border-[2px] border-white/20 w-48 h-48 rounded-full border-dashed" />

//       <View className="items-center">
//         <Text className="text-white text-5xl font-bold tracking-tighter">
//           Opal
//         </Text>
//         <Text className="text-white font-semibold mt-1">30-day Guest Pass</Text>
//       </View>
//     </LinearGradient>

//     <Pressable className="bg-white rounded-full py-4 items-center">
//       <Text className="text-black font-bold text-base">View Rewards</Text>
//     </Pressable>
//   </View>
// );

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SharePassCardProps {
  onPress: () => void;
}

export const SharePassCard = ({ onPress }: SharePassCardProps) => (
  <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white text-lg font-bold">
        Share Pass, Get Rewards
      </Text>
      <View className="flex-row items-center">
        <Ionicons name="person" size={14} color="white" />
        <Text className="text-white font-bold ml-1">0</Text>
      </View>
    </View>

    <LinearGradient
      colors={["#4c7675", "#7dd3fc", "#4c7675"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl h-48 items-center justify-center mb-4 relative overflow-hidden"
    >
      <View className="absolute border-[20px] border-white/10 w-64 h-64 rounded-full" />
      <View className="absolute border-[2px] border-white/20 w-48 h-48 rounded-full border-dashed" />

      <View className="items-center">
        <Text className="text-white text-5xl font-bold tracking-tighter">
          Opal
        </Text>
        <Text className="text-white font-semibold mt-1">30-day Guest Pass</Text>
      </View>
    </LinearGradient>

    <Pressable
      onPress={onPress}
      className="bg-white rounded-full py-4 items-center"
    >
      <Text className="text-black font-bold text-base">View Rewards</Text>
    </Pressable>
  </View>
);
