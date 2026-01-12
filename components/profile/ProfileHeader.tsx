// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Image, Pressable, Text, View } from "react-native";
// import { HexagonAvatar } from "./HexagonAvatar";

// interface ProfileHeaderProps {
//   onSettingsPress?: () => void;
//   profileImage?: string | null;
//   gemName: string; // 1. ADD NEW PROP
//   isGuest?: boolean; // <--- NEW PROP
//   onLoginPress?: () => void;
// }

// export const ProfileHeader = ({
//   onSettingsPress,
//   profileImage,
//   gemName,
//   isGuest = false, // Default to false
//   onLoginPress,
// }: ProfileHeaderProps) => (
//   <View className="mb-6">
//     <View className="flex-row justify-between pt-2 pb-4 mb-2">
//       <Ionicons name="close" size={28} color="white" />
//       <View className="flex-row gap-4">
//         <Ionicons name="share-outline" size={24} color="white" />
//         <Pressable onPress={onSettingsPress}>
//           <Ionicons name="settings-sharp" size={24} color="white" />
//         </Pressable>
//       </View>
//     </View>

//     <View className="mb-4">
//       {profileImage ? (
//         <Image
//           source={{ uri: profileImage }}
//           className="w-20 h-20 rounded-full border-2 border-white"
//         />
//       ) : (
//         <HexagonAvatar color="#fff" size={80} />
//       )}
//     </View>

//     <View className="flex-row items-center gap-2 mb-1">
//       {/* 3. USE DYNAMIC NAME */}
//       <Text className="text-white text-2xl font-bold">{gemName}</Text>
//       <View className="bg-teal-900/50 px-1.5 py-0.5 rounded border border-teal-700">
//         <Text className="text-teal-400 text-[10px] font-bold">PRO</Text>
//       </View>
//     </View>
//     <Text className="text-zinc-400 text-base">
//       Software Development, 25 - 34
//     </Text>
//     <View className="mt-3 self-start border border-teal-500/50 rounded-full px-3 py-1">
//       <Text className="text-teal-400 text-xs font-bold">Top 77%</Text>
//     </View>
//     {isGuest && (
//       <Pressable
//         onPress={onLoginPress}
//         className="bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700 mt-4"
//       >
//         <Text className="text-white font-bold">Sign Up / Log In</Text>
//       </Pressable>
//     )}
//   </View>
// );

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { HexagonAvatar } from "./HexagonAvatar";

interface ProfileHeaderProps {
  onSettingsPress?: () => void;
  profileImage?: string | null;
  gemName: string;
  isGuest?: boolean; 
  onLoginPress?: () => void; 
}

export const ProfileHeader = ({
  onSettingsPress,
  profileImage,
  gemName,
  isGuest = false, 
  onLoginPress,
}: ProfileHeaderProps) => (
  <View className="mb-6">
    <View className="flex-row justify-between pt-2 pb-4 mb-2">
      <Ionicons name="close" size={28} color="white" />
      <View className="flex-row gap-4">
        <Ionicons name="share-outline" size={24} color="white" />
        <Pressable onPress={onSettingsPress}>
          <Ionicons name="settings-sharp" size={24} color="white" />
        </Pressable>
      </View>
    </View>

    <View className="flex-row justify-between items-start">
      <View>
        <View className="mb-4">
          {profileImage && !isGuest ? (
            <Image
              source={{ uri: profileImage }}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
          ) : (
            // Guest / Default Avatar
            <HexagonAvatar color={isGuest ? "#52525b" : "#fff"} size={80} />
          )}
        </View>

        <View className="flex-row items-center gap-2 mb-1">
          <Text className="text-white text-2xl font-bold">
            {isGuest ? "Guest" : gemName}
          </Text>
          <View
            className={`px-1.5 py-0.5 rounded border ${isGuest ? "bg-zinc-800 border-zinc-600" : "bg-teal-900/50 border-teal-700"}`}
          >
            <Text
              className={`${isGuest ? "text-zinc-400" : "text-teal-400"} text-[10px] font-bold`}
            >
              {isGuest ? "Free" : "PRO"}
            </Text>
          </View>
        </View>

        <Text className="text-zinc-400 text-base">
          {isGuest
            ? "Software Development, 25 - 34"
            : "Software Development, 25 - 34"}
        </Text>

        <View
          className={`mt-3 self-start border rounded-full px-3 py-1 ${isGuest ? "border-zinc-700" : "border-teal-500/50"}`}
        >
          <Text
            className={`${isGuest ? "text-zinc-400" : "text-teal-400"} text-xs font-bold`}
          >
            {isGuest ? "Top 0%" : "Top 77%"}
          </Text>
        </View>
      </View>

      {isGuest && (
        <Pressable
          onPress={onLoginPress}
          className="bg-zinc-800 px-4 py-1 rounded-full border border-zinc-700 mt-4 mr-8"
        >
          <Text className="text-white text-sm">Sign Up / Log In</Text>
        </Pressable>
      )}
    </View>
  </View>
);
