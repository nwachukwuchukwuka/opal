// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import { addDays, format } from "date-fns";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { forwardRef, useMemo, useRef, useState } from "react";
// import { Pressable, Switch, Text, TextInput, View } from "react-native";
// import { SessionConfig } from "../types";
// import { DayOfWeekSelector } from "./DayOfWeekSelector";
// import DisableDurationSheet, {
//   DisableDurationSheetRef,
// } from "./DisableDurationSheet";
// import EmojiPickerSheet, { EmojiPickerSheetRef } from "./EmojiPickerSheet";
// import { FormRow } from "./FormRow";
// import TimePickerSheet, { TimePickerSheetRef } from "./TimePickerSheet";

// export type EditSessionSheetRef = BottomSheetModal;

// interface EditSessionSheetProps {
//   initialConfig: SessionConfig;
//   onSave: (config: SessionConfig) => void;
//   onCancelSession: () => void;
// }

// const EditSessionSheet = forwardRef<EditSessionSheetRef, EditSessionSheetProps>(
//   ({ initialConfig, onSave, onCancelSession }, ref) => {
//     const [config, setConfig] = useState(initialConfig);
//     const [editingTimeField, setEditingTimeField] = useState<
//       "startTime" | "endTime" | null
//     >(null);

//     const timePickerRef = useRef<TimePickerSheetRef>(null);
//     const emojiPickerRef = useRef<EmojiPickerSheetRef>(null);
//     const disableDurationSheetRef = useRef<DisableDurationSheetRef>(null);

//     const snapPoints = useMemo(() => ["85%"], []);

//     const handleOpenEmojiPicker = () => emojiPickerRef.current?.present();
//     const handleOpenTimePicker = (field: "startTime" | "endTime") => {
//       setEditingTimeField(field);
//       timePickerRef.current?.present();
//     };

//     const handleTimeSelected = (time: Date) => {
//       if (editingTimeField) {
//         setConfig((prev) => ({ ...prev, [editingTimeField]: time }));
//       }
//     };

//     const handleEmojiSelected = (emoji: string) =>
//       setConfig((prev) => ({ ...prev, icon: emoji }));

//     const handleToggleDay = (dayId: number) => {
//       setConfig((prev) => {
//         const activeDays = prev.activeDays.includes(dayId)
//           ? prev.activeDays.filter((d) => d !== dayId)
//           : [...prev.activeDays, dayId];
//         return { ...prev, activeDays };
//       });
//     };

//     const handleSwitchToggle = (isEnabled: boolean) => {
//       if (isEnabled) {
//         // If turning on, just update the state
//         setConfig((prev) => ({ ...prev, isEnabled, disabledUntil: undefined }));
//       } else {
//         // If turning off, open the disable duration sheet instead of updating state
//         disableDurationSheetRef.current?.present();
//       }
//     };

//     // 4. ADD HANDLERS FOR THE DISABLE ACTIONS
//     const handleDisableForDays = (days: number) => {
//       const newConfig = {
//         ...config,
//         isEnabled: false,
//         disabledUntil: addDays(new Date(), days), // Set a disabledUntil date
//       };
//       onSave(newConfig); // Use the existing onSave logic to update and close
//       disableDurationSheetRef.current?.dismiss();
//     };

//     const handleDisableIndefinitely = () => {
//       const newConfig = {
//         ...config,
//         isEnabled: false,
//         disabledUntil: "indefinitely", // Use a special string or null
//       };
//       onSave(newConfig);
//       disableDurationSheetRef.current?.dismiss();
//     };

//     return (
//       <>
//         <BottomSheetModal
//           ref={ref}
//           snapPoints={snapPoints}
//           backgroundStyle={{ backgroundColor: "#18181b" }}
//           handleIndicatorStyle={{ backgroundColor: "#52525b" }}
//           backdropComponent={(props) => (
//             <BottomSheetBackdrop
//               {...props}
//               disappearsOnIndex={-1}
//               appearsOnIndex={0}
//             />
//           )}
//         >
//           <BottomSheetView className="flex-1 px-5 pt-4">
//             {/* Header */}
//             <View className="flex-row items-center justify-between mb-6">
//               <View className="flex-row items-center">
//                 <Pressable
//                   onPress={handleOpenEmojiPicker}
//                   className="w-12 h-12 bg-zinc-800 rounded-lg items-center justify-center"
//                 >
//                   <Text className="text-3xl">{config.icon}</Text>
//                 </Pressable>
//                 <TextInput
//                   value={config.name}
//                   onChangeText={(name) =>
//                     setConfig((prev) => ({ ...prev, name }))
//                   }
//                   className="text-white text-2xl font-bold ml-4"
//                 />
//               </View>
//               {/* <Switch
//                 value={config.isEnabled}
//                 onValueChange={(isEnabled) =>
//                   setConfig((prev) => ({ ...prev, isEnabled }))
//                 }
//                 trackColor={{ false: "#3f3f46", true: "#86efac" }}
//                 thumbColor={config.isEnabled ? "#f4f4f5" : "#71717a"}
//               /> */}
//               <Switch
//                 value={config.isEnabled}
//                 onValueChange={handleSwitchToggle} // Use the new handler
//                 trackColor={{ false: "#3f3f46", true: "#86efac" }}
//                 thumbColor={config.isEnabled ? "#f4f4f5" : "#71717a"}
//               />
//             </View>

//             {/* Form */}
//             <View className="gap-3 mb-6">
//               <FormRow
//                 icon="shield-outline"
//                 label="Apps Blocked"
//                 value="Block List"
//                 valueColor="#ef4444"
//                 onPress={() => {}}
//               />
//               <FormRow
//                 icon="planet-outline"
//                 label="Difficulty"
//                 value="Normal"
//                 onPress={() => {}}
//               />
//             </View>
//             <Text className="text-zinc-500 text-sm mb-4">
//               You can snooze and cancel this session
//             </Text>

//             <Text className="text-white text-lg font-semibold mb-3">
//               Set a specific time:
//             </Text>
//             <View className="gap-3 mb-8">
//               <FormRow
//                 icon="arrow-forward-circle-outline"
//                 label="From"
//                 value={format(config.startTime, "p")}
//                 onPress={() => handleOpenTimePicker("startTime")}
//               />
//               <FormRow
//                 icon="arrow-back-circle-outline"
//                 label="To"
//                 value={format(config.endTime, "p")}
//                 onPress={() => handleOpenTimePicker("endTime")}
//               />
//             </View>

//             <Text className="text-white text-lg font-semibold mb-4">
//               Days of week active
//             </Text>
//             <DayOfWeekSelector
//               activeDays={config.activeDays}
//               onToggleDay={handleToggleDay}
//             />

//             {/* Action Buttons */}
//             <View className="mt-auto pb-6 gap-3 pt-6">
//               {/* <Pressable
//                 onPress={() => onSave(config)}
//                 className="w-full py-4 rounded-full bg-gradient-to-r from-green-300 to-cyan-400 items-center"
//               >
//                 <Text className="text-black text-lg font-bold">Save</Text>
//               </Pressable> */}

//               <Pressable
//                 onPress={() => onSave(config)}
//                 style={{
//                   borderRadius: 9999,
//                   overflow: "hidden",
//                   width: "100%",
//                 }}
//               >
//                 <LinearGradient
//                   colors={["#86efac", "#22d3ee"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={{
//                     width: "100%",
//                     paddingVertical: 10,
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Text className="text-black text-lg font-bold">Save</Text>
//                 </LinearGradient>
//               </Pressable>

//               <Pressable
//                 onPress={onCancelSession}
//                 className="items-center py-2"
//               >
//                 <Text className="text-red-500 text-base">Cancel Session</Text>
//               </Pressable>
//             </View>
//           </BottomSheetView>
//         </BottomSheetModal>

//         {/* Nested Sheets */}
//         <TimePickerSheet
//           ref={timePickerRef}
//           title={`Select ${editingTimeField === "startTime" ? "Start" : "End"} Time`}
//           initialTime={editingTimeField ? config[editingTimeField] : new Date()}
//           onTimeSelect={handleTimeSelected}
//         />
//         <EmojiPickerSheet
//           ref={emojiPickerRef}
//           initialEmoji={config.icon}
//           onEmojiSelect={handleEmojiSelected}
//         />
//         <DisableDurationSheet
//           ref={disableDurationSheetRef}
//           onDisableForDays={handleDisableForDays}
//           onDisableIndefinitely={handleDisableIndefinitely}
//         />
//       </>
//     );
//   }
// );

// export default EditSessionSheet;

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { addDays, format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { SessionConfig } from "../types";
import { DayOfWeekSelector } from "./DayOfWeekSelector";
import DisableDurationSheet, {
  DisableDurationSheetRef,
} from "./DisableDurationSheet";
import EmojiPickerSheet, { EmojiPickerSheetRef } from "./EmojiPickerSheet";
import { FormRow } from "./FormRow";
import TimePickerSheet, { TimePickerSheetRef } from "./TimePickerSheet";

export type EditSessionSheetRef = BottomSheetModal;

interface EditSessionSheetProps {
  initialConfig: SessionConfig;
  onSave: (config: SessionConfig) => void;
  onCancelSession: () => void;
}

const EditSessionSheet = forwardRef<EditSessionSheetRef, EditSessionSheetProps>(
  ({ initialConfig, onSave, onCancelSession }, ref) => {
    const [config, setConfig] = useState(initialConfig);
    const [editingTimeField, setEditingTimeField] = useState<
      "startTime" | "endTime" | null
    >(null);

    const timePickerRef = useRef<TimePickerSheetRef>(null);
    const emojiPickerRef = useRef<EmojiPickerSheetRef>(null);
    const disableDurationSheetRef = useRef<DisableDurationSheetRef>(null);

    const snapPoints = useMemo(() => ["85%"], []);

    const handleOpenEmojiPicker = () => emojiPickerRef.current?.present();
    const handleOpenTimePicker = (field: "startTime" | "endTime") => {
      setEditingTimeField(field);
      timePickerRef.current?.present();
    };

    useEffect(() => {
      setConfig(initialConfig);
    }, [initialConfig]);

    const handleTimeSelected = (time: Date) => {
      if (editingTimeField) {
        setConfig((prev) => ({ ...prev, [editingTimeField]: time }));
      }
    };

    const handleEmojiSelected = (emoji: string) =>
      setConfig((prev) => ({ ...prev, icon: emoji }));

    const handleToggleDay = (dayId: number) => {
      setConfig((prev) => {
        const activeDays = prev.activeDays.includes(dayId)
          ? prev.activeDays.filter((d) => d !== dayId)
          : [...prev.activeDays, dayId];
        return { ...prev, activeDays };
      });
    };

    const handleSwitchToggle = (isEnabled: boolean) => {
      if (isEnabled) {
        // If turning on, just update the state
        setConfig((prev) => ({ ...prev, isEnabled, disabledUntil: undefined }));
      } else {
        // If turning off, open the disable duration sheet instead of updating state
        disableDurationSheetRef.current?.present();
      }
    };

    // 4. ADD HANDLERS FOR THE DISABLE ACTIONS
    const handleDisableForDays = (days: number) => {
      const newConfig = {
        ...config,
        isEnabled: false,
        disabledUntil: addDays(new Date(), days), // Set a disabledUntil date
      };
      onSave(newConfig); // Use the existing onSave logic to update and close
      disableDurationSheetRef.current?.dismiss();
    };

    const handleDisableIndefinitely = () => {
      const newConfig: SessionConfig = {
        ...config,
        isEnabled: false,
        disabledUntil: "indefinitely",
      };
      onSave(newConfig);
      disableDurationSheetRef.current?.dismiss();
    };

    return (
      <>
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#18181b" }}
          handleIndicatorStyle={{ backgroundColor: "#52525b" }}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
        >
          <BottomSheetView className="flex-1 px-5 pt-4">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <Pressable
                  onPress={handleOpenEmojiPicker}
                  className="w-12 h-12 bg-zinc-800 rounded-lg items-center justify-center"
                >
                  <Text className="text-3xl">{config.icon}</Text>
                </Pressable>
                <TextInput
                  value={config.name}
                  onChangeText={(name) =>
                    setConfig((prev) => ({ ...prev, name }))
                  }
                  className="text-white text-2xl font-bold ml-4"
                />
              </View>
              {/* <Switch
                value={config.isEnabled}
                onValueChange={(isEnabled) =>
                  setConfig((prev) => ({ ...prev, isEnabled }))
                }
                trackColor={{ false: "#3f3f46", true: "#86efac" }}
                thumbColor={config.isEnabled ? "#f4f4f5" : "#71717a"}
              /> */}
              <Switch
                value={config.isEnabled}
                onValueChange={handleSwitchToggle} // Use the new handler
                trackColor={{ false: "#3f3f46", true: "#86efac" }}
                thumbColor={config.isEnabled ? "#f4f4f5" : "#71717a"}
              />
            </View>

            {/* Form */}
            <View className="gap-3 mb-6">
              <FormRow
                icon="shield-outline"
                label="Apps Blocked"
                value="Block List"
                valueColor="#ef4444"
                onPress={() => {}}
              />
              <FormRow
                icon="planet-outline"
                label="Difficulty"
                value="Normal"
                onPress={() => {}}
              />
            </View>
            <Text className="text-zinc-500 text-sm mb-4">
              You can snooze and cancel this session
            </Text>

            <Text className="text-white text-lg font-semibold mb-3">
              Set a specific time:
            </Text>
            <View className="gap-3 mb-8">
              <FormRow
                icon="arrow-forward-circle-outline"
                label="From"
                value={format(config.startTime, "p")}
                onPress={() => handleOpenTimePicker("startTime")}
              />
              <FormRow
                icon="arrow-back-circle-outline"
                label="To"
                value={format(config.endTime, "p")}
                onPress={() => handleOpenTimePicker("endTime")}
              />
            </View>

            <Text className="text-white text-lg font-semibold mb-4">
              Days of week active
            </Text>
            <DayOfWeekSelector
              activeDays={config.activeDays}
              onToggleDay={handleToggleDay}
            />

            {/* Action Buttons */}
            <View className="mt-auto pb-6 gap-3 pt-6">
              {/* <Pressable
                onPress={() => onSave(config)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-green-300 to-cyan-400 items-center"
              >
                <Text className="text-black text-lg font-bold">Save</Text>
              </Pressable> */}

              <Pressable
                onPress={() => onSave(config)}
                style={{
                  borderRadius: 9999,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <LinearGradient
                  colors={["#86efac", "#22d3ee"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-black text-lg font-bold">Save</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                onPress={onCancelSession}
                className="items-center py-2"
              >
                <Text className="text-red-500 text-base">Cancel Session</Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        {/* Nested Sheets */}
        <TimePickerSheet
          ref={timePickerRef}
          title={`Select ${editingTimeField === "startTime" ? "Start" : "End"} Time`}
          initialTime={editingTimeField ? config[editingTimeField] : new Date()}
          onTimeSelect={handleTimeSelected}
        />
        <EmojiPickerSheet
          ref={emojiPickerRef}
          initialEmoji={config.icon}
          onEmojiSelect={handleEmojiSelected}
        />
        <DisableDurationSheet
          ref={disableDurationSheetRef}
          onDisableForDays={handleDisableForDays}
          onDisableIndefinitely={handleDisableIndefinitely}
        />
      </>
    );
  }
);

export default EditSessionSheet;
