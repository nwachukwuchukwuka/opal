import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { ONBOARDING_APPS } from "../../constants";

const { width } = Dimensions.get("window");

const AppIcon = ({ icon, iconFamily, size, color }: any) => {
  if (iconFamily === "FontAwesome5") {
    return <FontAwesome5 name={icon} size={size} color={color} />;
  }
  return <Ionicons name={icon as any} size={size} color={color} />;
};

const SessionsBentoPreview = () => {
  return (
    <View className="items-center px-10">
      <View className="w-full bg-white rounded-[40px] p-8 border border-slate-100 items-center">
        <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-8 border border-emerald-100/50">
          <Text className="text-4xl">🤠</Text>
        </View>

        <Text className="text-slate-900 text-2xl font-bold text-center mb-4 leading-tight">
          Houston, we have a distraction problem.
        </Text>

        <Text className="text-slate-500 text-base font-medium text-center mb-8 leading-6 px-4">
          Instagram is interrupting your focus every 5 minutes, let's fix that today.
        </Text>

        {/* Action Card */}
        <View className="w-full bg-slate-50 rounded-[24px] p-4 border border-slate-100 flex-row items-center">
          <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4" style={{ backgroundColor: '#E4405F' }}>
            <Ionicons name="logo-instagram" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-900 font-bold">Instagram</Text>
            <Text className="text-slate-400 text-xs font-bold uppercase">Shielded by zenith</Text>
          </View>
          <View className="bg-emerald-100 px-3 py-1 rounded-full">
            <Text className="text-emerald-600 text-[10px] font-bold">ACTIVE</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const StatsBentoPreview = () => {
  return (
    <View className="items-center px-10">
      <View className="w-full bg-white rounded-[40px] p-8 border border-slate-100 items-center">
        <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-8 border border-emerald-100/50">
          <Ionicons name="diamond" size={40} color="#059669" />
        </View>

        <Text className="text-slate-900 text-4xl font-bold text-center mb-2">
          1h 31m
        </Text>
        <Text className="text-slate-400 text-xs font-bold uppercase mb-8">Saved this week</Text>

        <View className="flex-row justify-between w-full mb-8">
          <View className="items-center flex-1">
            <View className="flex-row items-center">
              <Text className="text-slate-900 text-xl font-bold">5d</Text>
              <Ionicons name="trending-up" size={16} color="#059669" style={{ marginLeft: 4 }} />
            </View>
            <Text className="text-slate-400 text-[10px] font-bold uppercase">Streak</Text>
          </View>
          <View className="w-px h-10 bg-slate-100" />
          <View className="items-center flex-1">
            <Text className="text-slate-900 text-xl font-bold">86%</Text>
            <Text className="text-slate-400 text-[10px] font-bold uppercase">Focus</Text>
          </View>
        </View>

        {/* Mini Chart */}
        <View className="flex-row justify-between items-end h-16 w-full px-4">
          {[40, 65, 45, 80, 55, 70, 85].map((h, i) => (
            <View
              key={i}
              className="w-3 rounded-full"
              style={{
                height: `${h}%`,
                backgroundColor: i === 6 ? '#059669' : '#f1f5f9',
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const SelectAppsSlide = ({
  selectedApps,
  onToggleApp,
}: {
  selectedApps: string[];
  onToggleApp: (appId: string) => void;
}) => {
  return (
    <View className="flex-1 px-10 pt-20">
      <View className="mb-10">
        <Text className="text-emerald-600 text-sm font-bold mb-3">Now, let's start to focus.</Text>
        <Text className="text-slate-900 text-3xl font-bold mb-4 leading-tight">
          Select your top distractions.
        </Text>
        <Text className="text-slate-500 text-lg leading-7 font-medium">
          Choose up to 3 apps that take most of your time. You can change this later.
        </Text>
      </View>

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
                    backgroundColor: isSelected ? app.color : '#f8fafc',
                    borderWidth: 2,
                    borderColor: isSelected ? app.color : '#f1f5f9',
                  }}
                  className="w-20 h-20 rounded-[24px] items-center justify-center"
                >
                  <AppIcon
                    icon={app.icon}
                    iconFamily={app.iconFamily}
                    size={32}
                    color={isSelected ? 'white' : '#94a3b8'}
                  />
                </View>
                {isSelected && (
                  <View className="absolute -top-1 -right-1 w-7 h-7 bg-emerald-600 rounded-full items-center justify-center border-4 border-slate-50">
                    <Ionicons name="checkmark" size={14} color="white" />
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
      type: "preview",
      component: <SessionsBentoPreview />,
      subtitle: "How does Zenith work?",
      title: "Take action with sessions",
      description: "Zenith will shield apps on your phone while you're focusing, helping you stay in the flow.",
      button: "Next",
    },
    {
      type: "preview",
      component: <StatsBentoPreview />,
      subtitle: "How does Zenith work?",
      title: "Real-time evolution",
      description: "Track your focus level throughout the day and get weekly reports on your progress.",
      button: "Continue",
    },
    {
      type: "apps",
      button: "Start My Flow",
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
  const canContinue = !isLastSlide || selectedApps.length > 0;

  return (
    <View className="flex-1 bg-slate-50">
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
            {slide.type === "preview" ? (
              <View className="flex-1 pt-16">
                {/* Preview Content */}
                {slide.component}

                {/* Content below preview */}
                <View className="items-center mt-12 px-10">
                  <Text className="text-emerald-600 text-sm font-bold mb-3 uppercase">{slide.subtitle}</Text>
                  <Text className="text-slate-900 text-3xl font-bold text-center mb-4 leading-tight">
                    {slide.title}
                  </Text>
                  <Text className="text-slate-500 text-lg text-center leading-7 font-medium px-4">
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

      {/* Page Indicators */}
      <View className="flex-row justify-center gap-3 mb-8 mt-3">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${currentSlide === index ? "w-8 bg-emerald-600" : "w-2 bg-slate-200"
              }`}
          />
        ))}
      </View>

      {/* Button Action Zone */}
      <View className="px-8 pb-8">
        <Pressable
          onPress={handleNext}
          disabled={!canContinue}
          className={`w-full py-6 rounded-[32px] items-center justify-center ${canContinue ? "bg-emerald-600" : "bg-slate-200"
            }`}
        >
          <Text className={`text-xl font-bold ${canContinue ? "text-white" : "text-slate-400"
            }`}>
            {slides[currentSlide].button}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
