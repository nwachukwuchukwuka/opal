// import { RewardItem } from "@/types";
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// interface GemUnlockModalProps {
//   visible: boolean;
//   onClose: () => void;
//   item: RewardItem | null;
// }

// export const GemUnlockModal = ({
//   visible,
//   onClose,
//   item,
// }: GemUnlockModalProps) => {
//   if (!item) return null;

//   return (
//     <Modal visible={visible} animationType="fade" transparent={false}>
//       <SafeAreaView className="flex-1 bg-black justify-between">
//         {/* Header */}
//         <View className="px-5 pt-2 flex-row justify-between items-center">
//           <TouchableOpacity
//             onPress={onClose}
//             className="w-10 h-10 items-center justify-center"
//           >
//             <Ionicons name="close" size={28} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onClose}>
//             <Text className="text-zinc-500 font-bold text-xs tracking-widest">
//               SKIP
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Content */}
//         <View className="items-center justify-center flex-1">
//           <Text className="text-white text-3xl font-bold mb-10 font-sans">
//             Gem Unlocked
//           </Text>

//           {/* Spotlight Effect */}
//           <View className="items-center justify-center">
//             <View className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl" />
//             {/* Placeholder for the Rock/Gem Image */}
//             <Image
//               source={{
//                 uri: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
//               }}
//               className="w-64 h-64 rounded-3xl"
//               style={{ resizeMode: "contain" }}
//             />
//             {/* Shadow */}
//             <View className="w-48 h-4 bg-black/50 blur-xl mt-4 rounded-[100%]" />
//           </View>

//           <Text className="text-zinc-500 text-xs font-bold tracking-widest mt-12 uppercase">
//             Tap to reveal your gem
//           </Text>
//         </View>

//         {/* Footer Spacer */}
//         <View className="h-20" />
//       </SafeAreaView>
//     </Modal>
//   );
// };


import { RewardItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface GemUnlockModalProps {
  visible: boolean;
  onClose: () => void;
  item: RewardItem | null;
}

export const GemUnlockModal = ({
  visible,
  onClose,
  item,
}: GemUnlockModalProps) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true} // 1. Make modal transparent
      onRequestClose={onClose}
    >
      {/* 2. Backdrop with dimmed background */}
      <View className="flex-1 bg-black/80 justify-center items-center px-6">
        
        {/* 3. The Modal Card */}
        <View className="bg-[#121214] w-full rounded-[32px] border border-zinc-800 overflow-hidden relative py-10">
          
          {/* Header Actions (Absolute positioning inside card) */}
          <View className="flex-row justify-between items-center px-6 absolute top-4 left-0 right-0 z-10">
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center bg-zinc-800/50 rounded-full"
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onClose}>
              <Text className="text-zinc-500 font-bold text-[10px] tracking-widest">
                SKIP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="items-center justify-center pt-8">
            <Text className="text-white text-2xl font-bold mb-8 font-sans">
              Gem Unlocked
            </Text>

            {/* Spotlight Effect & Image */}
            <View className="items-center justify-center mb-8 relative">
              {/* Spotlight Glow */}
              <View className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              
              {/* Gem Image */}
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
                }}
                className="w-48 h-48 rounded-2xl z-10"
                style={{ resizeMode: "contain" }}
              />
              
              {/* Shadow underneath */}
              <View className="w-32 h-4 bg-black/50 blur-xl mt-2 rounded-[100%]" />
            </View>

            <Text className="text-zinc-500 text-[10px] font-bold tracking-widest mt-4 uppercase">
              Tap to reveal your gem
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};