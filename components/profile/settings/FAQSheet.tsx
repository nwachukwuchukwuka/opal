import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

export type FAQSheetRef = BottomSheetModal;

interface FAQSheetProps {
  onDeleteAccountRequest: () => void;
}

type ViewState = "home" | "advanced_features" | "delete_account";

const FAQItem = ({ icon, text, onPress, showArrow = true }: any) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between py-4"
  >
    <View className="flex-row items-center flex-1 mr-4">
      {icon && <Text className="mr-3 text-lg">{icon}</Text>}
      <Text className="text-zinc-300 text-base leading-5">{text}</Text>
    </View>
    {showArrow && <Ionicons name="chevron-forward" size={20} color="#52525b" />}
  </Pressable>
);

const FAQSheet = forwardRef<FAQSheetRef, FAQSheetProps>(({ onDeleteAccountRequest }, ref) => {
  const snapPoints = useMemo(() => ["92%"], []);
  const [currentView, setCurrentView] = useState<ViewState>("home");

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.8} />
    ),
    []
  );

  const handleBack = () => {
    if (currentView === "delete_account") setCurrentView("advanced_features");
    else setCurrentView("home");
  };

  const renderHome = () => (
    <>
      <View className="mb-6">
        <Text className="text-white text-3xl font-bold mb-2">Hey there.</Text>
        <Text className="text-white text-3xl font-bold mb-6">How can we help?</Text>
        
        <View className="bg-zinc-800/50 rounded-xl p-4 flex-row justify-between items-center mb-8">
            <Text className="text-white font-medium">Support Tickets</Text>
            <Ionicons name="chevron-forward" size={20} color="#52525b" />
        </View>

        <Text className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-2">FAQs</Text>
        <FAQItem icon="🐞" text="Blocking doesn't seem to be working" />
        <FAQItem icon="💻" text="How do I use Opal's Mac app?" />
        <FAQItem icon="⛔" text="How do I block apps with iPhone Focus Mode?" />
        <FAQItem icon="🚫" text="How do I cancel my subscription and/or get a refund?" />
        <FAQItem icon="🙏" text="How do I contact Opal?" />

        <Text className="text-zinc-500 text-xs font-bold tracking-widest uppercase mt-6 mb-2">Browse Topics</Text>
        <FAQItem text="Getting Started" />
        <FAQItem text="Troubleshooting" />
        <FAQItem text="How Opal Works" />
        <FAQItem text="Feedback & Subscriptions" />
        <FAQItem text="Advanced Features" onPress={() => setCurrentView("advanced_features")} />
      </View>

      <View className="mt-4 mb-10">
        <Text className="text-white font-bold text-lg mb-1">Still need help?</Text>
        <Text className="text-zinc-400 mb-4">Send us a message and we'll reply as soon as we can</Text>
        <Pressable className="w-full bg-[#bbf7d0] py-4 rounded-full items-center">
            <Text className="text-black font-bold text-lg">Contact us</Text>
        </Pressable>
      </View>
    </>
  );

  const renderAdvancedFeatures = () => (
    <>
      <FAQItem icon="🔄" text="Reset my Screen Time Connection" />
      <FAQItem icon="🛑" text="Change running Deep Focus Session" />
      <FAQItem icon="🔴" text="Change running Hard Limit locks" />
      <FAQItem icon="🗑️" text="Delete my account" onPress={() => setCurrentView("delete_account")} />
      <FAQItem icon="🎧" text="5+ ways to use Opal with Shortcuts" />
      <FAQItem icon="🍅" text="How to start a Pomodoro Session with Opal" />
      <FAQItem icon="🙏" text="How to use Social Sessions" />
    </>
  );

  const renderDeleteAccount = () => (
    <View>
        <View className="flex-row items-center justify-center mb-8 mt-4">
            <Text className="text-3xl mr-2">🗑️</Text>
            <Text className="text-white text-2xl font-bold">Delete my account</Text>
        </View>

        <Text className="text-zinc-300 text-base leading-6 mb-4">
            We are sorry to see you go, if there is anything we can do to change your mind, let us know <Text className="underline">here</Text>.
        </Text>

        <Text className="text-zinc-300 text-base leading-6 mb-4">
            Note: Deleting your account is permanent and irreversible.
        </Text>

        <Text className="text-zinc-300 text-base leading-6 mb-8">
            If you would like to request to delete your account, click <Text className="underline text-blue-400" onPress={onDeleteAccountRequest}>here</Text>.
        </Text>
    </View>
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#121214" }}
      handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
    >
      <View className="flex-1 bg-[#121214]">
        <View className="flex-row items-center px-4 py-2 border-b border-zinc-900 h-14">
            {currentView !== "home" ? (
                <Pressable onPress={handleBack} className="absolute left-4 z-10 p-2">
                    <Ionicons name="chevron-back" size={24} color="white" />
                </Pressable>
            ) : (
                <Pressable onPress={() => { if (ref && 'current' in ref) ref.current?.dismiss() }} className="absolute left-4 z-10 p-2">
                    <Ionicons name="close" size={24} color="white" />
                </Pressable>
            )}
            
            <View className="flex-1 items-center">
                <Text className="text-white font-bold text-base">
                    {currentView === "home" ? "Support" : 
                     currentView === "advanced_features" ? "Advanced Features" : 
                     "Delete my account"}
                </Text>
            </View>
        </View>

        <BottomSheetScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            {currentView === "home" && renderHome()}
            {currentView === "advanced_features" && renderAdvancedFeatures()}
            {currentView === "delete_account" && renderDeleteAccount()}
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
});

export default FAQSheet;