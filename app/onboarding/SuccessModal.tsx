// import React, { useEffect } from "react";
// import { Modal, StatusBar, Text, View } from "react-native";

// interface SuccessModalProps {
//   visible: boolean;
//   onFinish: () => void;
// }

// export default function SuccessModal({ visible, onFinish }: SuccessModalProps) {
//   useEffect(() => {
//     if (visible) {
//       // Auto-close/navigate after 2 seconds
//       const timer = setTimeout(() => {
//         onFinish();
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [visible, onFinish]);

//   return (
//     <Modal visible={visible} animationType="fade" transparent={false}>
//       <View className="flex-1 bg-black items-center justify-center px-8">
//         <StatusBar barStyle="light-content" />

//         {/* Success Icon */}
//         <View className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center mb-6">
//           <Text className="text-white text-4xl">✓</Text>
//         </View>

//         {/* Success Text */}
//         <Text className="text-white text-2xl font-bold text-center mb-2">
//           You're all set.
//         </Text>
//         <Text className="text-zinc-500 text-base text-center">
//           Your purchase was successful.
//         </Text>
//       </View>
//     </Modal>
//   );
// }

import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";

interface SuccessModalProps {
  visible: boolean;
  onFinish: () => void;
}

export default function SuccessModal({ visible, onFinish }: SuccessModalProps) {
  useEffect(() => {
    if (visible) {
      // Auto-close/navigate after 2 seconds
      const timer = setTimeout(() => {
        onFinish();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onFinish]);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      {/* Semi-transparent Backdrop */}
      <View className="flex-1 bg-black/80 items-center justify-center px-6">
        {/* The Card */}
        <View className="bg-zinc-900 w-full max-w-sm p-8 rounded-[32px] items-center border border-zinc-800 shadow-xl">
          {/* Success Icon */}
          <View className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center mb-6">
            <Text className="text-white text-4xl">✓</Text>
          </View>

          {/* Success Text */}
          <Text className="text-white text-2xl font-bold text-center mb-2">
            You're all set.
          </Text>
          <Text className="text-zinc-500 text-base text-center">
            Your purchase was successful.
          </Text>
        </View>
      </View>
    </Modal>
  );
}
