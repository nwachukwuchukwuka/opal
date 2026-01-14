// import { Ionicons } from "@expo/vector-icons";
// import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
// import { router } from "expo-router";
// import React, { useCallback, useMemo, useRef, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   StatusBar,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { REFERRAL_OPTIONS, COLORS } from "../../constants";

// export default function ReferralSourceScreen() {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [friendCode, setFriendCode] = useState("");
//   const [codeError, setCodeError] = useState<string | null>(null);
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   const snapPoints = useMemo(() => ["40%"], []);

//   const handleOptionSelect = (optionId: string) => {
//     setSelectedOption(optionId);
//     if (optionId === "friend") {
//       bottomSheetRef.current?.expand();
//     }
//   };

//   const handleContinue = () => {
//     // Navigate to main app tabs
//     router.replace("/(tabs)");
//   };

//   const handleSkip = () => {
//     router.replace("/(tabs)");
//   };

//   const handleCodeSubmit = () => {
//     // Validate friend code
//     if (friendCode.length < 5) {
//       setCodeError("This code doesn't exist");
//       return;
//     }
//     setCodeError(null);
//     bottomSheetRef.current?.close();
//     // Continue to main app tabs
//     router.replace("/(tabs)");
//   };

//   const renderBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         {...props}
//         disappearsOnIndex={-1}
//         appearsOnIndex={0}
//         opacity={0.5}
//       />
//     ),
//     []
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View className="flex-1 bg-black pt-14">
//         <StatusBar barStyle="light-content" />

//         {/* Header */}
//         <View className="items-center px-6 mb-6">
//           <Text className="text-white text-[28px] font-bold text-center">
//             How did you hear{"\n"}about Opal?
//           </Text>
//         </View>

//         {/* Options */}
//         <View className="flex-1 px-6">
//           {REFERRAL_OPTIONS.map((option) => {
//             const isSelected = selectedOption === option.id;
//             return (
//               <Pressable
//                 key={option.id}
//                 onPress={() => handleOptionSelect(option.id)}
//                 className={`py-3.5 px-6 rounded-full mb-3 border ${
//                   isSelected
//                     ? "bg-white border-white"
//                     : "bg-transparent border-zinc-700"
//                 }`}
//               >
//                 <Text
//                   className={`text-center text-base ${
//                     isSelected ? "text-black font-semibold" : "text-white"
//                   }`}
//                 >
//                   {option.label}
//                 </Text>
//               </Pressable>
//             );
//           })}
//         </View>

//         {/* Continue Button */}
//         <View className="px-6 pb-4">
//           <Pressable
//             onPress={handleContinue}
//             disabled={!selectedOption}
//             className={`w-full py-4 rounded-full ${
//               selectedOption
//                 ? "bg-white active:bg-zinc-200"
//                 : "border border-white/20 bg-white/[0.03]"
//             }`}
//           >
//             <Text
//               className={`text-center text-lg font-semibold ${
//                 selectedOption ? "text-black" : "text-zinc-500"
//               }`}
//             >
//               Continue
//             </Text>
//           </Pressable>
//         </View>

//         {/* Skip */}
//         <View className="px-6 pb-10">
//           <Pressable onPress={handleSkip} className="py-3">
//             <Text className="text-zinc-500 text-center text-base">Skip</Text>
//           </Pressable>
//         </View>

//         {/* Bottom Sheet for Friend Code */}
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={-1}
//           snapPoints={snapPoints}
//           enablePanDownToClose={true}
//           backdropComponent={renderBackdrop}
//           backgroundStyle={{ backgroundColor: "#18181b" }}
//           handleIndicatorStyle={{ backgroundColor: "#52525b" }}
//         >
//           <BottomSheetView className="flex-1 px-6">
//             <KeyboardAvoidingView
//               behavior={Platform.OS === "ios" ? "padding" : "height"}
//               className="flex-1"
//             >
//               {/* Title */}
//               <View className="items-center mb-6">
//                 <Text className="text-white text-xl font-bold text-center">
//                   Enter Your Friend's Code
//                 </Text>
//                 <Text className="text-zinc-500 text-sm mt-1">
//                   Get Opal Pro for 30 days and more
//                 </Text>
//               </View>

//               {/* Code Input */}
//               <View className="mb-4">
//                 <View
//                   className={`border-b-2 pb-2 ${
//                     codeError ? "border-red-500" : "border-zinc-600"
//                   }`}
//                 >
//                   <TextInput
//                     value={friendCode}
//                     onChangeText={(text) => {
//                       setFriendCode(text.toUpperCase());
//                       setCodeError(null);
//                     }}
//                     placeholder="OPAL34"
//                     placeholderTextColor="#52525b"
//                     className="text-white text-lg text-center"
//                     autoCapitalize="characters"
//                     autoCorrect={false}
//                   />
//                 </View>
//                 {codeError && (
//                   <Text className="text-red-500 text-sm text-center mt-2">
//                     {codeError}
//                   </Text>
//                 )}
//               </View>

//               {/* Submit Button */}
//               <Pressable
//                 onPress={handleCodeSubmit}
//                 className="w-full py-4 rounded-full border border-white/20 bg-white/[0.03] active:bg-white/10 mt-4"
//               >
//                 <Text className="text-white text-center text-lg font-semibold">
//                   Continue
//                 </Text>
//               </Pressable>
//             </KeyboardAvoidingView>
//           </BottomSheetView>
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// }

import ReferralInputSheet, {
  ReferralInputSheetRef,
} from "@/components/onboarding/ReferralInputSheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const SOURCES = [
  "Search engine",
  "Through a Friend",
  "Facebook or Instagram",
  "App Store",
  "TikTok",
  "Twitter",
  "LinkedIn",
  "Reddit or Blog",
  "YouTube",
  "Snapchat",
  "Other",
];

export default function ReferralSourceScreen() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const bottomSheetRef = useRef<ReferralInputSheetRef>(null);

  const handleSelect = (source: string) => {
    setSelectedSource(source);
    if (source === "Through a Friend") {
      bottomSheetRef.current?.present();
    }
  };

  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-black">
          <StatusBar style="light" />
          <SafeAreaView className="flex-1">
            <View className="px-6 pt-6 pb-4">
              <Text className="text-white text-3xl font-bold text-center leading-tight">
                How did you hear{"\n"}about Opal?
              </Text>
            </View>

            <ScrollView
              className="flex-1 px-4"
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="gap-3 mt-4">
                {SOURCES.map((source) => {
                  const isSelected = selectedSource === source;
                  return (
                    <Pressable
                      key={source}
                      onPress={() => handleSelect(source)}
                      className={`w-full py-4 rounded-xl items-center border ${
                        isSelected
                          ? "bg-white border-white"
                          : "bg-zinc-900 border-zinc-800"
                      }`}
                    >
                      <Text
                        className={`font-semibold text-base ${
                          isSelected ? "text-black" : "text-zinc-300"
                        }`}
                      >
                        {source}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Sticky Bottom Footer */}
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-black/80">
              {selectedSource && selectedSource !== "Through a Friend" ? (
                <Pressable
                  onPress={handleContinue}
                  className="w-full bg-white py-4 rounded-full items-center"
                >
                  <Text className="text-black font-bold text-lg">Continue</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleContinue}
                  className="w-full py-4 items-center"
                >
                  <Text className="text-zinc-500 font-semibold text-base">
                    Skip
                  </Text>
                </Pressable>
              )}
            </View>
          </SafeAreaView>

          <ReferralInputSheet ref={bottomSheetRef} onSuccess={handleContinue} />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
