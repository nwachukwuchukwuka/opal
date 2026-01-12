// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { Modal, Pressable, Text, View } from 'react-native';

// interface DisabledInfoModalProps {
//   visible: boolean;
//   disabledUntil: string;
//   onEnable: () => void;
//   onDismiss: () => void;
// }

// export const DisabledInfoModal = ({ visible, disabledUntil, onEnable, onDismiss }: DisabledInfoModalProps) => {
//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <Pressable onPress={onDismiss} className="flex-1 justify-center items-center bg-black/70">
//         <Pressable className="bg-zinc-800 rounded-2xl w-[90%] p-6 items-center gap-4">
//           <View className="bg-zinc-700 p-3 rounded-lg">
//             <Ionicons name="pause" size={24} color="#a1a1aa" />
//           </View>
//           <View className="items-center gap-1">
//             <Text className="text-white text-xl font-bold">Disabled until {disabledUntil}</Text>
//             <Text className="text-zinc-400 text-center">
//               Hope you have a good time off! This session will automatically be enabled in 1 day.
//             </Text>
//           </View>
//           <View className="w-full gap-3 mt-2">
//             <Pressable
//               onPress={onEnable}
//               className="bg-white rounded-full py-3.5 items-center justify-center"
//             >
//               <Text className="text-black font-semibold text-base">Enable</Text>
//             </Pressable>
//             <Pressable
//               onPress={onDismiss}
//               className="bg-zinc-700/50 rounded-full py-3.5 items-center justify-center"
//             >
//               <Text className="text-white font-semibold text-base">Dismiss</Text>
//             </Pressable>
//           </View>
//         </Pressable>
//       </Pressable>
//     </Modal>
//   );
// };

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface DisabledInfoModalProps {
  visible: boolean;
  disabledUntil: string;
  onEnable: () => void;
  onDismiss: () => void;
}

export const DisabledInfoModal = ({
  visible,
  disabledUntil,
  onEnable,
  onDismiss,
}: DisabledInfoModalProps) => {
  // Calculate days remaining (simplified - in real app, parse the date)
  const getDaysRemainingText = () => {
    if (disabledUntil === "Indefinitely") {
      return "You can manually turn it back on anytime.";
    }
    return "Hope you have a good time off! This session will automatically be enabled in 1 day.";
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      {/* Backdrop - tapping dismisses */}
      <Pressable
        onPress={onDismiss}
        className="flex-1 justify-center items-center bg-black/70"
      >
        {/* Modal Card - prevent tap propagation */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-zinc-800 rounded-2xl w-[85%] p-6 items-center"
        >
          {/* Pause Icon */}
          <View className="bg-zinc-700 p-4 rounded-xl mb-4">
            <Ionicons name="pause" size={28} color="#a1a1aa" />
          </View>

          {/* Title */}
          <Text className="text-white text-xl font-bold text-center mb-2">
            Disabled until {disabledUntil}
          </Text>

          {/* Description */}
          <Text className="text-zinc-400 text-center text-base mb-6 leading-6">
            {getDaysRemainingText()}
          </Text>

          {/* Buttons */}
          <View className="w-full gap-3">
            {/* Enable Button */}
            <Pressable
              onPress={onEnable}
              className="bg-white rounded-full py-4 items-center justify-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-black font-bold text-base">Enable</Text>
            </Pressable>

            {/* Dismiss Button */}
            <Pressable
              onPress={onDismiss}
              className="bg-zinc-700 rounded-full py-4 items-center justify-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-white font-semibold text-base">
                Dismiss
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DisabledInfoModal;
