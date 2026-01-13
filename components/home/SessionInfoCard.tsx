// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { Pressable, Text, View } from "react-native";
// import { COLORS } from "../../constants";
// import WorkTimeModal from "../WorkTimeModal/index.tsx";

// export const SessionInfoCard = () => {
//   const [workTimeModalVisible, setWorkTimeModalVisible] = useState(false);
//   const remainingTime = "0:42:29"; // Defined here to pass down

//   return (
//     <>
//       <View className="bg-zinc-900 rounded-t-3xl px-5 pt-4 pb-4">
//         <Pressable
//           onPress={() => setWorkTimeModalVisible(true)}
//           className="flex-row items-center justify-between"
//         >
//           <View>
//             <View className="flex-row items-center mb-2">
//               <Text className="text-zinc-400 text-sm">Session</Text>
//               <Text className="text-zinc-400 text-sm mx-2">•</Text>
//               <Ionicons name="time-outline" size={14} color={COLORS.zinc400} />
//               <Text className="text-zinc-400 text-sm ml-1">3</Text>
//               <Text className="text-zinc-400 text-sm mx-2">•</Text>
//               <Text className="text-zinc-400 text-sm">{remainingTime}</Text>
//             </View>
//             <View className="flex-row items-center">
//               <View className="w-8 h-8 bg-zinc-700 rounded-lg items-center justify-center mr-3">
//                 <Ionicons name="briefcase" size={18} color={COLORS.white} />
//               </View>
//               <Text className="text-white text-lg font-semibold">Work Time</Text>
//             </View>
//           </View>
//           <Ionicons name="chevron-up" size={24} color={COLORS.zinc400} />
//         </Pressable>
//       </View>

//       <WorkTimeModal
//         visible={workTimeModalVisible}
//         onClose={() => setWorkTimeModalVisible(false)}
//         remainingTime={remainingTime} // Passing the time prop
//       />
//     </>
//   );
// };

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants";
import WorkTimeModal from "../WorkTimeModal/index.tsx";

export const SessionInfoCard = () => {
  const [workTimeModalVisible, setWorkTimeModalVisible] = useState(false);
  const remainingTime = "0:42:29";
  const progress = 35; 

  return (
    <>
      <View className="bg-zinc-900 rounded-t-3xl  pt-4   ">
        <Pressable
          onPress={() => setWorkTimeModalVisible(true)}
          className="flex-row items-center justify-between px-5 pb-3 "
        >
          <View>
            <View className="flex-row items-center mb-2">
              <Text className="text-zinc-400 text-sm">Session</Text>
              <Text className="text-zinc-400 text-sm mx-2">•</Text>
              <Ionicons name="time-outline" size={14} color={COLORS.zinc400} />
              <Text className="text-zinc-400 text-sm ml-1">3</Text>
              <Text className="text-zinc-400 text-sm mx-2">•</Text>
              <Text className="text-zinc-400 text-sm">{remainingTime}</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-zinc-700 rounded-lg items-center justify-center mr-3">
                <Ionicons name="briefcase" size={18} color={COLORS.white} />
              </View>
              <Text className="text-white text-base font-semibold">
                Work Time
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-up" size={24} color={COLORS.zinc400} />
        </Pressable>

        <View className="h-[1px] bg-zinc-800 w-full">
          <View
            className="h-full bg-teal-400"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      <WorkTimeModal
        visible={workTimeModalVisible}
        onClose={() => setWorkTimeModalVisible(false)}
        sessionName="Work Time"
      />
    </>
  );
};
