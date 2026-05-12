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
    className="flex-row items-center justify-between py-5 border-b border-slate-50"
  >
    <View className="flex-row items-center flex-1 mr-4">
      {icon && (
        <View className="w-10 h-10 bg-slate-50 rounded-xl items-center justify-center mr-4">
          <Text className="text-xl">{icon}</Text>
        </View>
      )}
      <Text className="text-slate-900 text-base font-medium leading-5">{text}</Text>
    </View>
    {showArrow && <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />}
  </Pressable>
);

const CategoryCard = ({ title, icon, color, onPress }: any) => (
  <Pressable 
    onPress={onPress}
    className="w-[48%] bg-white rounded-[28px] p-5 mb-4 border border-slate-50"
  >
    <View className={`w-10 h-10 rounded-2xl items-center justify-center mb-3`} style={{ backgroundColor: `${color}10` }}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text className="text-slate-900 font-bold text-sm">{title}</Text>
  </Pressable>
);

const FAQSheet = forwardRef<FAQSheetRef, FAQSheetProps>(({ onDeleteAccountRequest }, ref) => {
  const snapPoints = useMemo(() => ["92%"], []);
  const [currentView, setCurrentView] = useState<ViewState>("home");

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    []
  );

  const handleBack = () => {
    if (currentView === "delete_account") setCurrentView("advanced_features");
    else setCurrentView("home");
  };

  const renderHome = () => (
    <View className="px-6 pt-4">
      <View className="mb-10">
        <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">Support</Text>
        <Text className="text-slate-400 text-lg leading-6 font-medium">How can we help you today? Explore our guides or message us directly.</Text>
      </View>

      <Pressable className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100 flex-row justify-between items-center mb-10">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-white rounded-2xl items-center justify-center mr-4">
            <Ionicons name="ticket" size={20} color="#059669" />
          </View>
          <Text className="text-emerald-950 font-bold text-base">Support tickets</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#059669" />
      </Pressable>

      <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4 px-1">Browse Topics</Text>
      <View className="flex-row flex-wrap justify-between mb-8">
        <CategoryCard title="Getting Started" icon="rocket-outline" color="#059669" />
        <CategoryCard title="Troubleshooting" icon="bug-outline" color="#ef4444" />
        <CategoryCard title="How Opal Works" icon="bulb-outline" color="#f59e0b" />
        <CategoryCard title="Advanced" icon="flash-outline" color="#8b5cf6" onPress={() => setCurrentView("advanced_features")} />
      </View>

      <View className="bg-white rounded-[40px] p-8 border border-slate-50 items-center mb-10">
        <View className="w-16 h-16 bg-slate-50 rounded-[24px] items-center justify-center mb-4">
          <Ionicons name="chatbubbles" size={32} color="#059669" />
        </View>
        <Text className="text-slate-900 font-bold text-xl mb-2">Still need help?</Text>
        <Text className="text-slate-400 text-center text-sm leading-5 mb-8">Send us a message and we'll reply as soon as we can.</Text>
        <Pressable className="bg-slate-950 w-full py-5 rounded-full items-center">
            <Text className="text-white font-bold text-base">Contact Us</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderAdvancedFeatures = () => (
    <View className="px-6 pt-4">
      <View className="mb-8">
        <Text className="text-slate-900 text-3xl font-bold mb-2">Advanced Features</Text>
        <Text className="text-slate-400 text-base font-medium">Power user guides and account management.</Text>
      </View>
      
      <View className="bg-white rounded-[40px] p-6 border border-slate-50">
        <FAQItem icon="🔄" text="Reset screen time connection" />
        <FAQItem icon="🛑" text="Change deep focus session" />
        <FAQItem icon="🎧" text="Use Opal with shortcuts" />
        <FAQItem icon="🍅" text="Start a Pomodoro session" />
        <FAQItem icon="🗑️" text="Delete my account" onPress={() => setCurrentView("delete_account")} />
      </View>
    </View>
  );

  const renderDeleteAccount = () => (
    <View className="px-8 pt-6 items-center">
        <View className="w-24 h-24 bg-red-50 rounded-[32px] items-center justify-center mb-8">
          <Text className="text-6xl">🗑️</Text>
        </View>
        <Text className="text-slate-900 text-3xl font-bold text-center mb-4">Delete Account</Text>
        
        <View className="bg-white rounded-[32px] p-6 border border-slate-100 mb-8">
          <Text className="text-slate-600 text-center text-base leading-6 mb-4">
            We're sorry to see you go. Note that deleting your account is permanent and irreversible.
          </Text>
          <Text className="text-slate-400 text-center text-sm leading-5">
            If there's anything we can do to change your mind, let us know <Text className="text-emerald-600 font-bold">here</Text>.
          </Text>
        </View>

        <Pressable 
          onPress={onDeleteAccountRequest}
          className="bg-red-500 w-full py-5 rounded-full items-center"
        >
          <Text className="text-white font-bold text-base">Confirm Account Deletion</Text>
        </Pressable>
    </View>
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#f8fafc" }}
      handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
    >
      <View className="flex-1">
        <View className="flex-row items-center px-6 py-4 h-16">
            <Pressable 
              onPress={currentView === "home" ? () => (ref as any)?.current?.dismiss() : handleBack} 
              className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100"
            >
              <Ionicons name={currentView === "home" ? "close" : "chevron-back"} size={24} color="#059669" />
            </Pressable>
            
            <View className="flex-1 items-center mr-10">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    {currentView === "home" ? "Support" : 
                     currentView === "advanced_features" ? "Advanced Features" : 
                     "Account Management"}
                </Text>
            </View>
        </View>

        <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
            {currentView === "home" && renderHome()}
            {currentView === "advanced_features" && renderAdvancedFeatures()}
            {currentView === "delete_account" && renderDeleteAccount()}
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
});

export default FAQSheet;