import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export type AppStoreSheetRef = BottomSheetModal;

interface AppStoreSheetProps {
  onSubscribe: () => void;
}

const AppStoreSheet = forwardRef<AppStoreSheetRef, AppStoreSheetProps>(
  ({ onSubscribe }, ref) => {
    const snapPoints = useMemo(() => ["70%"], []);
    const [showSignIn, setShowSignIn] = useState(false);
    const [email] = useState("jamith.mcbbin77@gmail.com");
    const [password, setPassword] = useState("");

    const handleSubscribe = () => {
      setShowSignIn(true);
    };

    const handleSignIn = () => {
      if (password) {
        setShowSignIn(false);
        onSubscribe();
      }
    };

    const handleDismiss = () => {
      if (ref && "current" in ref) {
        ref.current?.dismiss();
      }
      setShowSignIn(false);
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        animateOnMount={true}
        backgroundStyle={{ backgroundColor: "#1c1c1e" }}
        handleIndicatorStyle={{ backgroundColor: "#48484a", width: 36 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.7}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1 }}>
          {!showSignIn ? (
            // App Store Subscription View
            <View className="flex-1 px-5">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-lg font-semibold">App Store</Text>
                <Pressable onPress={handleDismiss}>
                  <View className="w-8 h-8 rounded-full bg-zinc-700 items-center justify-center">
                    <Text className="text-white text-lg">×</Text>
                  </View>
                </Pressable>
              </View>

              {/* Plan Info */}
              <View className="flex-row items-center mb-6">
                <View className="w-14 h-14 rounded-xl bg-blue-600 items-center justify-center mr-4">
                  <View className="w-10 h-10 rounded-full border-2 border-white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold">Yearly Plan</Text>
                  <Text className="text-zinc-400 text-sm">Opal - Screen Time for Focus</Text>
                  <Text className="text-zinc-500 text-xs">Family Subscription</Text>
                </View>
              </View>

              {/* Trial Info */}
              <View className="mb-6">
                <Text className="text-white text-xl font-bold mb-1">1-week free trial</Text>
                <Text className="text-zinc-400 text-base mb-1">Starting today</Text>
                <Text className="text-white text-lg font-semibold">$99.99 per year</Text>
                <Text className="text-zinc-500 text-sm">Starting Sep 3, 2024</Text>
              </View>

              {/* Fine Print */}
              <View className="mb-6">
                <Text className="text-zinc-500 text-xs leading-5">
                  No commitment. Cancel anytime in Settings {">"} Apple Account at least a day before each renewal date. Plan automatically renews until cancelled.
                </Text>
              </View>

              {/* Account */}
              <View className="mb-6">
                <Text className="text-zinc-500 text-xs mb-1">Account</Text>
                <Text className="text-blue-400 text-sm">{email}</Text>
              </View>

              {/* Subscribe Button */}
              <Pressable
                onPress={handleSubscribe}
                className="w-full py-4 rounded-xl bg-blue-500 active:bg-blue-600"
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Subscribe
                </Text>
              </Pressable>
            </View>
          ) : (
            // Sign In View
            <View className="flex-1 px-5">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg font-semibold">App Store</Text>
                <Pressable onPress={handleDismiss}>
                  <View className="w-8 h-8 rounded-full bg-zinc-700 items-center justify-center">
                    <Text className="text-white text-lg">×</Text>
                  </View>
                </Pressable>
              </View>

              {/* Sign In Card */}
              <View className="bg-white rounded-2xl p-6">
                <Text className="text-black text-lg font-semibold text-center mb-2">
                  Sign in with Apple ID
                </Text>
                <Text className="text-zinc-500 text-sm text-center mb-6">
                  Enter the password for{"\n"}
                  <Text className="text-black">{email}</Text> to authorize this transaction.
                </Text>

                {/* Password Input */}
                <TextInput
                  className="w-full py-3 px-4 rounded-lg bg-zinc-100 text-black text-base mb-4"
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {/* Sign In Button */}
                <Pressable
                  onPress={handleSignIn}
                  disabled={!password}
                  className={`w-full py-3 rounded-lg ${
                    password ? "bg-blue-500" : "bg-blue-300"
                  } mb-4`}
                >
                  <Text className="text-white text-center text-base font-semibold">
                    Sign In
                  </Text>
                </Pressable>

                {/* Forgot Password */}
                <Pressable>
                  <Text className="text-blue-500 text-center text-sm">
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AppStoreSheet;

