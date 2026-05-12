import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FeedbackStep = "initial" | "rating" | "thankyou";

const SessionFeedbackScreen = () => {
  const [step, setStep] = useState<FeedbackStep>("initial");
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const handlePrimaryButton = () => {
    if (step === "initial") {
      setStep("rating");
    } else {
      router.push("/Home/session-stats-screen");
    }
  };

  const handleSetRating = (newRating: number) => {
    setRating(newRating);
    setTimeout(() => {
      setStep("thankyou");
    }, 300);
  };

  const Stars = ({
    currentRating,
    onRate,
  }: {
    currentRating: number;
    onRate: (r: number) => void;
  }) => (
    <View className="flex-row gap-2">
      {[1, 2, 3, 4, 5].map((index) => (
        <Pressable key={index} onPress={() => onRate(index)}>
          <MaterialCommunityIcons
            name={index <= currentRating ? "star" : "star-outline"}
            size={44}
            color={index <= currentRating ? "#10b981" : "#cbd5e1"}
          />
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-between items-center px-6 pt-12 pb-10">
      <View className="flex-1 w-full justify-center">

        {step === "initial" && (
          <View className="items-center bg-white rounded-[48px] p-10 border border-slate-100">
            <View className="w-24 h-24 bg-emerald-50 rounded-[32px] items-center justify-center border border-emerald-100 mb-8">
              <MaterialCommunityIcons name="party-popper" size={48} color="#059669" />
            </View>
            <Text className="text-slate-900 text-4xl font-extrabold mb-4">
              Well Done!
            </Text>
            <Text className="text-slate-500 text-base font-medium text-center">
              You successfully completed your focus session.
            </Text>
          </View>
        )}

        {step === "rating" && (
          <View className="items-center bg-white rounded-[48px] p-8 border border-slate-100">
            <View className="w-20 h-20 bg-slate-50 rounded-[24px] items-center justify-center border border-slate-100 mb-6">
              <MaterialCommunityIcons name="star-face" size={40} color="#0f172a" />
            </View>
            <Text className="text-slate-900 text-2xl font-extrabold mb-3 text-center">
              How was your session?
            </Text>
            <Text className="text-slate-500 text-sm font-medium text-center mb-8">
              Your feedback helps us improve the experience for the entire community.
            </Text>
            <View className="bg-slate-50 py-8 px-6 rounded-[36px] border border-slate-100 w-full items-center">
              <Stars currentRating={rating} onRate={handleSetRating} />
            </View>
          </View>
        )}

        {step === "thankyou" && (
          <View className="items-center bg-white rounded-[48px] p-8 border border-slate-100">
            <View className="w-20 h-20 bg-emerald-50 rounded-[24px] items-center justify-center border border-emerald-100 mb-6">
              <MaterialCommunityIcons name="heart" size={40} color="#059669" />
            </View>
            <Text className="text-slate-900 text-2xl font-extrabold mb-3 text-center">
              Thank you!
            </Text>
            <Text className="text-slate-500 text-sm font-medium text-center mb-8">
              If you have any detailed feedback, your honesty is greatly appreciated.
            </Text>
            <View className="bg-slate-50 py-6 px-6 rounded-[32px] border border-slate-100 w-full items-center mb-4">
              <Stars currentRating={rating} onRate={setRating} />
            </View>
            <Pressable className="bg-white border border-slate-200 rounded-[28px] py-4 px-8 w-full items-center">
              <Text className="text-slate-700 font-bold text-base">
                Write Feedback
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <View className="w-full items-center mt-6">
        <Pressable
          onPress={handlePrimaryButton}
          className="bg-emerald-600 w-24 h-24 rounded-[36px] items-center justify-center border border-emerald-500"
        >
          <MaterialCommunityIcons name="arrow-right" size={40} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SessionFeedbackScreen;