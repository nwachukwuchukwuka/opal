import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
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

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      []
    );

    const handleSubmitCode = () => {
      if (code.length > 0) {
        Keyboard.dismiss();
        setStep("success");
      }
    };

    const handleFinish = () => {
      onSuccess("Taaffeite5892");
      if (ref && 'current' in ref) {
        ref.current?.dismiss();
      }
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
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={renderBackdrop}
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-8 pt-8 pb-10 justify-between">

          {step === "input" ? (
            <>
              <View>
                <View className="items-center mb-10">
                  <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-6">
                    <Ionicons name="ticket" size={40} color="#059669" />
                  </View>
                  <Text className="text-slate-900 text-3xl font-bold text-center mb-3">
                    Referral Code
                  </Text>
                  <Text className="text-slate-400 text-center text-base leading-6 font-medium">
                    Enter your friend's unique code to unlock 30 days of Opal Pro and other exclusive rewards.
                  </Text>
                </View>

                <View className="bg-white rounded-[32px] p-8 border border-slate-100 mb-8">
                  <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Enter Code Below</Text>
                  <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="e.g. FOCUS30"
                    placeholderTextColor="#cbd5e1"
                    autoCapitalize="characters"
                    className="text-slate-900 text-3xl font-bold tracking-widest"
                    autoFocus
                  />
                </View>
              </View>

              <Pressable
                onPress={handleSubmitCode}
                disabled={code.length === 0}
                className={`w-full py-6 rounded-full items-center ${code.length > 0 ? "bg-emerald-600" : "bg-slate-100"
                  }`}
              >
                <Text
                  className={`font-bold text-lg ${code.length > 0 ? "text-white" : "text-slate-300"
                    }`}
                >
                  Apply Code
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <View className="items-center">
                <LinearGradient
                  colors={["#059669", "#10b981"]}
                  style={{ width: '100%', borderRadius: 44, padding: 32, marginBottom: 40, alignItems: 'center', overflow: 'hidden' }}
                >
                  <View className="absolute top-[-20] right-[-20] w-40 h-40 bg-white/10 rounded-full" />
                  <View className="w-20 h-20 bg-white/20 rounded-[28px] items-center justify-center mb-6">
                    <Ionicons name="diamond" size={40} color="white" />
                  </View>
                  <Text className="text-white text-3xl font-bold text-center mb-2">
                    Taaffeite5892 invited you!
                  </Text>
                  <Text className="text-emerald-50 text-center font-medium opacity-80">
                    Focus is better when shared with friends.
                  </Text>
                </LinearGradient>

                <View className="w-full gap-6 px-4">
                  <View className="flex-row items-center gap-5">
                    <View className="w-10 h-10 bg-emerald-50 rounded-2xl items-center justify-center">
                      <Ionicons name="gift" size={20} color="#059669" />
                    </View>
                    <Text className="text-slate-600 font-medium flex-1 leading-5">You get complimentary 30 days of Opal Pro starting today.</Text>
                  </View>
                  <View className="flex-row items-center gap-5">
                    <View className="w-10 h-10 bg-emerald-50 rounded-2xl items-center justify-center">
                      <Ionicons name="bar-chart" size={20} color="#059669" />
                    </View>
                    <Text className="text-slate-600 font-medium flex-1 leading-5">See how you compare on the screen time leaderboard.</Text>
                  </View>
                  <View className="flex-row items-center gap-5">
                    <View className="w-10 h-10 bg-emerald-50 rounded-2xl items-center justify-center">
                      <Ionicons name="people" size={20} color="#059669" />
                    </View>
                    <Text className="text-slate-600 font-medium flex-1 leading-5">Join shared focus sessions with your circle.</Text>
                  </View>
                </View>
              </View>

              <Pressable
                onPress={handleFinish}
                className="w-full py-6 rounded-full bg-slate-950 items-center mt-10"
              >
                <Text className="text-white font-bold text-lg">Claim Rewards</Text>
              </Pressable>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ReferralCodeSheet;