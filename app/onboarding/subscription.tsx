import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStoreSheet from "../../components/AppStoreSheet";
import SuccessModal from "./SuccessModal";

const timelineSteps = [
  {
    id: 1,
    icon: "✅",
    title: "Get your Focus Diagnosis",
    description: "You successfully started your journey",
    completed: true,
  },
  {
    id: 2,
    icon: "🎯",
    title: "Today: Improve Your Focus",
    description:
      "Block Apps automatically. Get your detailed stats and stay on track.",
    active: true,
  },
  {
    id: 3,
    icon: "📊",
    title: "Day 6: See first results",
    description:
      "We'll send you a notification with a report to see how you improved this week.",
    upcoming: true,
  },
  {
    id: 4,
    icon: "⏰",
    title: "Day 7: Trial Ends",
    description:
      "Your subscription will start on day 7. Cancel anytime within 24hrs.",
    upcoming: true,
  },
];

const pressLogos = ["TNW", "TC", "FORBES", "PH"];

export default function SubscriptionScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [showRestoreSuccess, setShowRestoreSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleStartTrial = () => {
    bottomSheetRef.current?.present();
  };

  const handleRestore = () => {
    setShowRestoreSuccess(true);
    setTimeout(() => {
      setShowRestoreSuccess(false);
    }, 2000);
  };

  const handleSkip = () => {
    router.push("/onboarding/focus-intro");
  };

  const handleSubscriptionComplete = () => {
    bottomSheetRef.current?.dismiss();
    setShowSuccessModal(true);
  };

  const handleSuccessFinished = () => {
    setShowSuccessModal(false);
    router.push("/onboarding/focus-intro");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center px-8 py-4 mb-4">
              <Pressable onPress={handleRestore} className="bg-slate-100 px-4 py-2 rounded-full">
                <Text className="text-slate-500 text-xs font-bold">Restore</Text>
              </Pressable>
              <Pressable onPress={handleSkip} className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center">
                <Ionicons name="close-circle" size={24} color="#64748b" />
              </Pressable>
            </View>

            {/* Title */}
            <View className="px-10 mb-10">
              <Text className="text-slate-900 text-3xl font-bold text-center leading-tight">
                Start your free week and gain 2+ hours back
              </Text>
            </View>

            {/* Timeline Bento */}
            <View className="px-8 mb-12">
              <View className="bg-white rounded-[32px] p-8 border border-slate-200">
                {timelineSteps.map((step, index) => (
                  <View key={step.id} className="flex-row">
                    {/* Timeline line */}
                    <View className="items-center mr-6">
                      <View
                        className={`w-12 h-12 rounded-2xl items-center justify-center ${step.completed || step.active
                          ? "bg-emerald-600"
                          : "bg-slate-50 border border-slate-200"
                          }`}
                      >
                        <Text className="text-xl">{step.icon}</Text>
                      </View>
                      {index < timelineSteps.length - 1 && (
                        <View className="w-0.5 h-14 bg-slate-100 my-2" />
                      )}
                    </View>

                    {/* Content */}
                    <View className="flex-1 pt-1">
                      <Text
                        className={`text-lg font-bold mb-2 ${step.completed || step.active
                          ? "text-slate-900"
                          : "text-slate-400"
                          }`}
                      >
                        {step.title}
                      </Text>
                      <Text className="text-slate-500 text-sm leading-6 font-medium">
                        {step.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Trust Badges */}
            <View className="px-8 mb-12">
              <View className="flex-row justify-center items-center gap-6 mb-6 opacity-40">
                {pressLogos.map((logo) => (
                  <Text key={logo} className="text-slate-900 text-xs font-bold">
                    {logo}
                  </Text>
                ))}
              </View>

              <View className="flex-row items-center justify-center gap-8 bg-white py-6 rounded-[28px] border border-slate-200">
                <View className="items-center">
                  <Text className="text-emerald-600 text-sm font-bold mb-1">★★★★★</Text>
                  <Text className="text-slate-400 text-[10px] font-bold">15,000+ Reviews</Text>
                </View>
                <View className="w-px h-8 bg-slate-100" />
                <View className="items-center">
                  <Text className="text-slate-900 text-sm font-bold mb-1">
                    Join 200k+
                  </Text>
                  <Text className="text-slate-400 text-[10px] font-bold">
                    Focusing with Zenith
                  </Text>
                </View>
              </View>
            </View>

            {/* Legal Text */}
            <View className="px-10 mb-8">
              <Text className="text-slate-400 text-[11px] text-center leading-5 font-medium">
                7 days to spare. Cancel anytime in Apple Account settings. Plan automatically renews until cancelled.
              </Text>
            </View>
          </ScrollView>

          {/* Bottom CTA Bento */}
          <View className="px-8 pb-12 pt-6 bg-white border-t border-slate-200 rounded-t-[48px]">
            {/* Pricing */}
            <View className="mb-8 items-center">
              <Text className="text-slate-900 text-xl font-bold mb-2">
                Try free for 1 week
              </Text>
              <Text className="text-slate-500 text-base font-medium">
                $99.99/year <Text className="text-slate-400">($8.33/month)</Text>
              </Text>
            </View>

            <Pressable
              onPress={handleStartTrial}
              className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center mb-6"
            >
              <Text className="text-white text-xl font-bold">
                Start your free week
              </Text>
            </Pressable>

            <View className="flex-row items-center justify-center gap-4">
              <View className="flex-row items-center bg-emerald-50 px-3 py-1.5 rounded-full">
                <Ionicons name="checkmark-circle" size={16} color="#059669" />
                <Text className="text-emerald-600 text-xs font-bold ml-1.5">No payment due now</Text>
              </View>
            </View>
          </View>

          {/* Restore Success Toast */}
          {showRestoreSuccess && (
            <View className="absolute top-24 left-8 right-8 bg-slate-900 rounded-[24px] p-5 border border-slate-800">
              <Text className="text-white text-center font-bold text-base mb-1">
                Purchase restored
              </Text>
              <Text className="text-slate-400 text-center text-sm font-medium">
                You're all set to focus.
              </Text>
            </View>
          )}
        </SafeAreaView>

        <SuccessModal
          visible={showSuccessModal}
          onFinish={handleSuccessFinished}
        />

        {/* App Store Sheet */}
        <AppStoreSheet
          ref={bottomSheetRef}
          onSubscribe={handleSubscriptionComplete}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
