import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";

export type ReferralCodeSheetRef = BottomSheetModal;

interface ReferralCodeSheetProps {
  onSuccess: (referrerName: string) => void;
}

const ReferralCodeSheet = forwardRef<ReferralCodeSheetRef, ReferralCodeSheetProps>(
  ({ onSuccess }, ref) => {
    const snapPoints = useMemo(() => ["92%"], []);
    const [step, setStep] = useState<"input" | "success">("input");
    const [code, setCode] = useState("");

    const handleBackdropPress = useCallback(() => {
      Keyboard.dismiss();
      if (ref && 'current' in ref) {
        ref.current?.dismiss();
      }
    }, [ref]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
          pressBehavior="close"
        />
      ),
      []
    );

    const handleSubmitCode = () => {
      // Mock validation
      if (code.length > 0) {
        Keyboard.dismiss();
        setStep("success");
      }
    };

    const handleFinish = () => {
      onSuccess("Taaffeite5892"); // Mock name based on screenshot
      if (ref && 'current' in ref) {
        ref.current?.dismiss();
      }
      // Reset after closing
      setTimeout(() => {
        setStep("input");
        setCode("");
      }, 500);
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#121214" }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
        backdropComponent={renderBackdrop}
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-6 pt-4 pb-10 justify-between">
          
          {step === "input" ? (
            /* --- INPUT STATE --- */
            <>
              <View>
                <Text className="text-white text-2xl font-bold text-center mb-2 mt-8">
                  Enter Your Friend's Code
                </Text>
                <Text className="text-zinc-400 text-center mb-8">
                  Get Opal Pro for 30 days and more
                </Text>

                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="e.g OP42D"
                  placeholderTextColor="#52525b"
                  autoCapitalize="characters"
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white text-lg"
                  autoFocus
                />
              </View>

              <Pressable
                onPress={handleSubmitCode}
                disabled={code.length === 0}
                className={`w-full mt-4 py-4 rounded-full items-center ${
                  code.length > 0 ? "bg-white" : "bg-zinc-800"
                }`}
              >
                <Text
                  className={`font-bold text-lg ${
                    code.length > 0 ? "text-black" : "text-zinc-500"
                  }`}
                >
                  Continue
                </Text>
              </Pressable>
            </>
          ) : (
            /* --- SUCCESS STATE --- */
            <>
              <View className="items-center mt-8">
                {/* Seal Logo Placeholder */}
                <View className="w-32 h-32 rounded-full border-4 border-zinc-800 items-center justify-center mb-8">
                    <Ionicons name="diamond" size={48} color="white" />
                </View>

                <Text className="text-white text-2xl font-bold text-center mb-2">
                  Taaffeite5892 invited you to Opal
                </Text>
                <Text className="text-zinc-500 text-center mb-8">
                  Focus is better together!
                </Text>

                {/* Benefits List */}
                <View className="w-full gap-6 px-2">
                    <View className="flex-row items-center gap-4">
                        <Ionicons name="gift" size={20} color="#86efac" />
                        <Text className="text-zinc-300 flex-1 leading-5">You get complimentary 30 days of Opal Pro today from your friend</Text>
                    </View>
                    <View className="flex-row items-center gap-4">
                        <Ionicons name="bar-chart" size={20} color="#86efac" />
                        <Text className="text-zinc-300 flex-1 leading-5">See how you compare on the Screen Time Leaderboard</Text>
                    </View>
                    <View className="flex-row items-center gap-4">
                        <Ionicons name="people" size={20} color="#86efac" />
                        <Text className="text-zinc-300 flex-1 leading-5">Join Shared Focus Sessions</Text>
                    </View>
                    <View className="flex-row items-center gap-4">
                        <Ionicons name="person-add" size={20} color="#86efac" />
                        <Text className="text-zinc-300 flex-1 leading-5">Invite more friends to improve even faster together</Text>
                    </View>
                </View>
              </View>

              <Pressable
                onPress={handleFinish}
                className="w-full py-4 rounded-full bg-white items-center mt-8"
              >
                <Text className="text-black font-bold text-lg">Continue</Text>
              </Pressable>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ReferralCodeSheet;