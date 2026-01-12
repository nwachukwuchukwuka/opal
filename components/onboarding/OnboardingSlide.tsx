import React from "react";
import { Pressable, Text, View } from "react-native";
import { OnboardingSlideProps } from "../../types";
import { OpalLogo } from "./OpalLogo";
import { PhoneMockup } from "./PhoneMockup";

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  variant,
  onGetStarted,
  onSignIn,
  onNext,
  isActive = true,
}) => {
  if (variant === "splash") {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <OpalLogo size={100} />
      </View>
    );
  }

  if (variant === "welcome") {
    return (
      <View className="flex-1 bg-black">
        {/* Content */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Phone mockup */}
          <View className="mb-8">
            <PhoneMockup variant="apps" showBlockButton={true} />
          </View>

          {/* Text content */}
          <View className="items-center mb-8">
            <Text className="text-white text-3xl font-bold mb-3 text-center">
              Welcome to Opal
            </Text>
            <Text className="text-zinc-400 text-base text-center px-4 leading-6">
              Starting today, let's focus better and{"\n"}accomplish your
              dreams.
            </Text>
          </View>

          {/* Buttons */}
          <View className="w-full px-6">
            <Pressable
              onPress={onGetStarted}
              className="w-full py-4 rounded-full border-2 border-white/20 bg-white/5 mb-4 active:bg-white/10"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Get Started
              </Text>
            </Pressable>

            <Pressable onPress={onSignIn} className="py-2">
              <Text className="text-zinc-400 text-center text-base">
                Already have an account?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (variant === "features") {
    return (
      <View className="flex-1 bg-black">
        {/* Content */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Phone mockup with apps */}
          <View className="mb-8">
            <PhoneMockup variant="apps" showBlockButton={true} />
          </View>

          {/* Navigation arrow */}
          <View className="absolute right-6 top-1/2 -translate-y-1/2">
            <Pressable
              onPress={onNext}
              className="w-12 h-12 rounded-full border border-white/30 items-center justify-center bg-white/5"
            >
              <Text className="text-white text-xl">→</Text>
            </Pressable>
          </View>

          {/* Text content */}
          <View className="items-center mb-8">
            <Text className="text-white text-3xl font-bold mb-3 text-center">
              Welcome to Opal
            </Text>
            <Text className="text-zinc-400 text-base text-center px-4 leading-6">
              Starting today, let's focus better and{"\n"}accomplish your
              dreams.
            </Text>
          </View>

          {/* Buttons */}
          <View className="w-full px-6">
            <Pressable
              onPress={onGetStarted}
              className="w-full py-4 rounded-full border-2 border-white/20 bg-white/5 mb-4 active:bg-white/10"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Get Started
              </Text>
            </Pressable>

            <Pressable onPress={onSignIn} className="py-2">
              <Text className="text-zinc-400 text-center text-base">
                Already have an account?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (variant === "permissions") {
    return (
      <View className="flex-1 bg-black">
        {/* Content */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Permission modal overlay effect */}
          <View className="absolute inset-0 bg-black/60" />

          {/* Phone mockup with permission dialog */}
          <View className="mb-8 relative">
            <PhoneMockup variant="apps" showBlockButton={false} />

            {/* Permission dialog overlay */}
            <View className="absolute top-20 left-4 right-4 bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
              <Text className="text-white text-sm font-semibold mb-2 text-center">
                Allow "Opal" to track your{"\n"}activity across other{"\n"}
                companies' apps and websites?
              </Text>
              <Text className="text-zinc-400 text-[10px] text-center mb-3 leading-4">
                By allowing access to this data you enable Opal to: 1. Measure
                how effective our ad campaigns are. 2. Create similar audiences
                for health & standard alerts. 3. Power in-device machine
                learning across product designs.
              </Text>
              <View className="border-t border-zinc-700 pt-3">
                <Pressable className="py-2 mb-1">
                  <Text className="text-blue-500 text-center text-sm">
                    Ask App Not to Track
                  </Text>
                </Pressable>
                <Pressable className="py-2">
                  <Text className="text-blue-500 text-center text-sm font-semibold">
                    Allow
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Text content */}
          <View className="items-center mb-8">
            <Text className="text-white text-3xl font-bold mb-3 text-center">
              Welcome to Opal
            </Text>
            <Text className="text-zinc-400 text-base text-center px-4 leading-6">
              Starting today, let's focus better and{"\n"}accomplish your
              dreams.
            </Text>
          </View>

          {/* Buttons */}
          <View className="w-full px-6">
            <Pressable
              onPress={onGetStarted}
              className="w-full py-4 rounded-full border-2 border-white/20 bg-white/5 mb-4 active:bg-white/10"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Get Started
              </Text>
            </Pressable>

            <Pressable onPress={onSignIn} className="py-2">
              <Text className="text-zinc-400 text-center text-base">
                Already have an account?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default OnboardingSlide;
