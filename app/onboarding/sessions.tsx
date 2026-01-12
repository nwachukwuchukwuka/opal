import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { ONBOARDING_APPS, COLORS } from "../../constants";

const { width } = Dimensions.get("window");

// Helper to render icon based on family
const AppIcon = ({ 
  icon, 
  iconFamily, 
  size = 24, 
  color = "#fff" 
}: { 
  icon: string; 
  iconFamily: string; 
  size?: number; 
  color?: string;
}) => {
  switch (iconFamily) {
    case "FontAwesome5":
      return <FontAwesome5 name={icon} size={size} color={color} />;
    case "Ionicons":
    default:
      return <Ionicons name={icon as any} size={size} color={color} />;
  }
};

// Phone mockup for Sessions screen (Instagram notification)
const SessionsPhoneMockup = () => {
  return (
    <View className="items-center">
      <View className="w-56 h-[440px] bg-zinc-900 rounded-[3rem] p-1.5 border-[3px] border-zinc-800">
        <View className="flex-1 bg-black rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island */}
          <View className="items-center pt-2">
            <View className="w-24 h-7 bg-black rounded-full" />
          </View>

          {/* Status bar */}
          <View className="flex-row justify-between items-center px-6 pt-1 pb-2">
            <Text className="text-white text-xs font-semibold">13:39</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="cellular" size={12} color={COLORS.white} />
              <Ionicons name="battery-full" size={14} color={COLORS.white} />
            </View>
          </View>

          {/* Main content - Houston message */}
          <View className="flex-1 px-4 pt-6">
            {/* Emoji at top */}
            <View className="items-center mb-4">
              <Text className="text-5xl">🤠</Text>
            </View>

            {/* Title */}
            <View className="items-center mb-4">
              <Text className="text-white text-xl font-bold text-center">
                Houston, We Have
              </Text>
              <Text className="text-white text-xl font-bold text-center">
                a Distraction Problem
              </Text>
            </View>

            {/* Subtitle */}
            <Text className="text-zinc-400 text-xs text-center mb-4 px-2">
              Instagram is interrupting your focus every 5 minutes, let's fix that today.
            </Text>

            {/* Instagram notification card */}
            <View className="bg-zinc-800/60 rounded-2xl p-3 mx-2">
              <View className="flex-row items-center">
                {/* Instagram icon */}
                <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: COLORS.instagram }}>
                  <FontAwesome5 name="instagram" size={20} color={COLORS.white} />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-xs font-semibold">Instagram</Text>
                  <Text className="text-zinc-400 text-[10px]">You scrolled Today 🏆</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Home indicator */}
          <View className="items-center pb-2 pt-4">
            <View className="w-28 h-1 bg-white/30 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
};

// Phone mockup for Real-time evolution (Stats screen)
const StatsPhoneMockup = () => {
  return (
    <View className="items-center">
      <View className="w-56 h-[440px] bg-zinc-900 rounded-[3rem] p-1.5 border-[3px] border-zinc-800">
        <View className="flex-1 bg-black rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island */}
          <View className="items-center pt-2">
            <View className="w-24 h-7 bg-black rounded-full" />
          </View>

          {/* Status bar */}
          <View className="flex-row justify-between items-center px-6 pt-1 pb-2">
            <Text className="text-white text-xs font-semibold">13:41</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="cellular" size={12} color={COLORS.white} />
              <Ionicons name="battery-full" size={14} color={COLORS.white} />
            </View>
          </View>

          {/* Header */}
          <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
            <Text className="text-white text-lg font-bold">Opal</Text>
            <Text className="text-zinc-500 text-xs">Today</Text>
          </View>

          {/* Gem icon */}
          <View className="items-center mb-3">
            <View className="w-16 h-16 items-center justify-center">
              <Ionicons name="diamond" size={48} color={COLORS.emerald} />
            </View>
          </View>

          {/* Main stat */}
          <View className="items-center mb-4">
            <Text className="text-white text-4xl font-bold">1h 31m</Text>
            <Text className="text-zinc-500 text-xs">SAVED THIS WEEK</Text>
          </View>

          {/* Stats row */}
          <View className="flex-row justify-center gap-6 mb-4">
            <View className="items-center">
              <View className="flex-row items-center">
                <Text className="text-white text-lg font-bold">5d</Text>
                <Ionicons name="trending-up" size={14} color={COLORS.success} style={{ marginLeft: 4 }} />
              </View>
              <Text className="text-zinc-500 text-[10px]">STREAK</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-lg font-bold">86%</Text>
              <Text className="text-zinc-500 text-[10px]">FOCUS</Text>
            </View>
          </View>

          {/* Bar chart */}
          <View className="px-4 mb-4">
            <View className="flex-row justify-between items-end h-16">
              {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                <View
                  key={i}
                  className="w-4 rounded-t-sm"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i === 6 ? COLORS.success : COLORS.zinc700,
                  }}
                />
              ))}
            </View>
          </View>

          {/* Home indicator */}
          <View className="items-center pb-2 pt-4">
            <View className="w-28 h-1 bg-white/30 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
};

// Select Apps Slide Content
const SelectAppsSlide = ({
  selectedApps,
  onToggleApp,
}: {
  selectedApps: string[];
  onToggleApp: (appId: string) => void;
}) => {
  return (
    <View className="flex-1 pt-14 px-6">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-zinc-500 text-sm mb-2">Now, let's start to focus.</Text>
        <Text className="text-white text-[28px] font-bold mb-3">
          Select up to 3{"\n"}distracting apps
        </Text>
        <Text className="text-zinc-500 text-sm">
          You can always change this later or create a{"\n"}new group of apps to block.
        </Text>
      </View>

      {/* Apps grid */}
      <View className="flex-row flex-wrap justify-center gap-4">
        {ONBOARDING_APPS.map((app) => {
          const isSelected = selectedApps.includes(app.id);
          return (
            <Pressable
              key={app.id}
              onPress={() => onToggleApp(app.id)}
              className="items-center"
            >
              <View className="relative">
                <View
                  style={{
                    backgroundColor: app.color,
                    borderWidth: app.border ? 1 : 0,
                    borderColor: COLORS.zinc700,
                  }}
                  className={`w-16 h-16 rounded-2xl items-center justify-center ${
                    isSelected ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <AppIcon icon={app.icon} iconFamily={app.iconFamily} size={28} color={COLORS.white} />
                </View>
                {/* Selection indicator */}
                {isSelected && (
                  <View className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center border-2 border-black">
                    <Ionicons name="checkmark" size={14} color={COLORS.white} />
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default function SessionsScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const toggleApp = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else if (selectedApps.length < 3) {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const slides = [
    {
      type: "phone",
      component: <SessionsPhoneMockup />,
      subtitle: "How does Opal work?",
      title: "Take action with sessions",
      description: "Opal will shield apps on your phone while you're focusing, and you can always snooze to unshield them temporarily.",
      button: "Next",
    },
    {
      type: "phone",
      component: <StatsPhoneMockup />,
      subtitle: "How does Opal work?",
      title: "Real-time evolution",
      description: "Open Opal to check your focus level at any point throughout the day. You will also get a report on your progress every week.",
      button: "Continue",
    },
    {
      type: "apps",
      button: "Select Apps",
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (currentSlide + 1), animated: true });
    } else {
      router.push("/onboarding/choose-activities");
    }
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const hasSelectedApps = selectedApps.length > 0;

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width }} className="flex-1">
            {slide.type === "phone" ? (
              <View className="flex-1 items-center pt-16">
                {/* Phone mockup */}
                {slide.component}

                {/* Content below phone */}
                <View className="items-center mt-6 px-8">
                  <Text className="text-zinc-500 text-sm mb-2">{slide.subtitle}</Text>
                  <Text className="text-white text-2xl font-bold text-center mb-3">
                    {slide.title}
                  </Text>
                  <Text className="text-zinc-500 text-sm text-center leading-5 px-4">
                    {slide.description}
                  </Text>
                </View>
              </View>
            ) : (
              <SelectAppsSlide
                selectedApps={selectedApps}
                onToggleApp={toggleApp}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Page indicators */}
      <View className="flex-row justify-center gap-2 mb-6">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/20"
            }`}
          />
        ))}
      </View>

      {/* Button */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleNext}
          className={`w-full py-4 rounded-full ${
            isLastSlide && hasSelectedApps
              ? "bg-white active:bg-zinc-200"
              : "border border-white/20 bg-white/[0.03] active:bg-white/10"
          }`}
        >
          <Text className={`text-center text-lg font-semibold ${
            isLastSlide && hasSelectedApps ? "text-black" : "text-white"
          }`}>
            {slides[currentSlide].button}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
