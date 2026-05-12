// import React from "react";
// import { Modal, Pressable, Text, View } from "react-native";

// interface Props {
//   visible: boolean;
//   title: string;
//   message: React.ReactNode;
//   confirmText?: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// export const ConfirmationAlert = ({
//   visible,
//   title,
//   message,
//   confirmText = "Yes",
//   onConfirm,
//   onCancel,
// }: Props) => (
//   <Modal visible={visible} transparent animationType="fade">
//     <Pressable
//       onPress={onCancel}
//       className="flex-1 justify-center items-center bg-black/70"
//     >
//       <Pressable className="bg-zinc-800 rounded-2xl w-[85%] p-6 items-center">
//         <Text className="text-white text-xl font-bold text-center">
//           {title}
//         </Text>
//         <View className="my-3">{message}</View>
//         <View className="w-full gap-3 mt-4">
//           <Pressable
//             onPress={onConfirm}
//             className="bg-blue-600 rounded-lg py-3"
//           >
//             <Text className="text-white text-center font-semibold text-base">
//               {confirmText}
//             </Text>
//           </Pressable>
//           <Pressable onPress={onCancel}>
//             <Text className="text-blue-500 text-center font-semibold text-base">
//               Nevermind
//             </Text>
//           </Pressable>
//         </View>
//       </Pressable>
//     </Pressable>
//   </Modal>
// );

import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
  visible: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationAlert = ({
  visible,
  title,
  message,
  confirmText = "Yes",
  onConfirm,
  onCancel,
}: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <Pressable
      onPress={onCancel}
      className="flex-1 justify-center px-5 pb-12 bg-slate-900/40"
    >
      <Pressable
        onPress={() => { }}
        className="bg-white border border-slate-100 rounded-[40px] p-6 w-full items-center"
      >
        <Text className="text-slate-900 text-2xl font-extrabold text-center mb-4 mt-2">
          {title}
        </Text>

        <View className="bg-slate-50 border border-slate-100 rounded-[28px] p-5 w-full mb-8">
          {message}
        </View>

        <View className="flex-row gap-4 w-full">
          <Pressable
            onPress={onCancel}
            className="flex-1 bg-slate-50 border border-slate-200 py-4 rounded-[24px] items-center justify-center"
          >
            <Text className="text-slate-600 font-bold text-base">
              Nevermind
            </Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            className="flex-1 bg-emerald-600 border border-emerald-500 py-4 rounded-[24px] items-center justify-center"
          >
            <Text className="text-white font-bold text-base">
              {confirmText}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);