import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PageActionItems } from "./PageActionItems";
import { PageBarChart } from "./PageBarChart";
import { PageComparison } from "./PageComparison";
import { PagePieChart } from "./PagePieChart";
import { PageRecap } from "./PageRecap";
import { PageYearsPrediction } from "./PageYearsPrediction";

interface FocusReportModalProps {
  visible: boolean;
  onClose: () => void;
}

const TOTAL_PAGES = 6;
const { width } = Dimensions.get("window");

export const FocusReportModal = ({
  visible,
  onClose,
}: FocusReportModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < TOTAL_PAGES - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderContent = () => {
    switch (currentIndex) {
      case 0:
        return <PagePieChart />;
      case 1:
        return <PageComparison />;
      case 2:
        return <PageBarChart />;
      case 3:
        return <PageYearsPrediction />;
      case 4:
        return <PageRecap />;
      case 5:
        return <PageActionItems onClose={onClose} />;
      default:
        return <PagePieChart />;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 bg-black">
        {/* Background Gradient/Glow Effect */}
        <LinearGradient
          colors={["rgba(6, 182, 212, 0.15)", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 300,
          }}
        />

        <View className="absolute top-16 right-[-40] opacity-10 pointer-events-none">
          <Ionicons name="ribbon-outline" size={200} color="white" />
        </View>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <View className="px-4 pt-2 mb-4 flex-row justify-between items-center  mb-3">
              <Pressable onPress={onClose} className=" mr-3">
                <Ionicons name="arrow-back" size={24} color="white" />
              </Pressable>
              <View className="flex-row gap-1">
                {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
                  <View
                    key={index}
                    className={`h-1 flex-1 rounded-full ${
                      index <= currentIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </View>
            </View>

            {/* --- TAP NAVIGATION ZONES (Invisible) --- */}
            <View className="absolute inset-0 flex-row z-10 top-24 bottom-24">
              <TouchableWithoutFeedback onPress={handlePrev}>
                <View className="w-[30%] h-full" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleNext}>
                <View className="w-[70%] h-full" />
              </TouchableWithoutFeedback>
            </View>

            {/* --- MAIN CONTENT AREA --- */}
            <View className="flex-1 px-6 justify-center pt-6">
              {renderContent()}
            </View>

            {/* --- FOOTER (Fixed) --- */}
            <View className="px-6 pb-6 pt-4 items-center">
              {currentIndex === TOTAL_PAGES - 1 ? (
                <Pressable
                  onPress={() => {
                    onClose();
                    setCurrentIndex(0);
                  }}
                  className="flex-row items-center"
                >
                  <Ionicons name="checkmark-circle" size={18} color="white" />
                  <Text className="text-white font-bold ml-2">
                    Close Report
                  </Text>
                </Pressable>
              ) : (
                <Pressable className="flex-row items-center">
                  <Ionicons name="share-outline" size={18} color="white" />
                  <Text className="text-white font-bold ml-2">
                    Share this story
                  </Text>
                </Pressable>
              )}
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
};
