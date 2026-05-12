import DatePickerModal from "@/components/DatePickerModal";
import DistractionModal from "@/components/DistractionModal";
import { InitialAnalysisView } from "@/components/home/InitialAnalysisView";
import { InviteBanner } from "@/components/home/InviteBanner";
import { MilestoneModal } from "@/components/home/MilestoneModal";
import { SessionInfoCard } from "@/components/home/SessionInfoCard";
import { StatsDashboard } from "@/components/home/StatsDashboard";
import { HOME_APP_USAGE_DATA } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { format, isToday, isYesterday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveSessionOverlay from "../../components/ActiveSessionOverlay";
import FocusSessionSheet from "../../components/FocusSessionSheet";
import { DifficultyLevel, HomeAppUsageItem } from "../../types";

export default function HomeScreen() {
  const [showMilestone, setShowMilestone] = useState(false);
  const [showInvite, setShowInvite] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSession, setActiveSession] = useState<{
    name: string;
    duration: number;
    difficulty: DifficultyLevel;
    isAlwaysOn: boolean;
  } | null>(null);

  const [appUsageData, setAppUsageData] = useState(HOME_APP_USAGE_DATA);
  const [editingApp, setEditingApp] = useState<HomeAppUsageItem | null>(null);
  const [isDistractionModalVisible, setDistractionModalVisible] =
    useState(false);

  // --- REFS ---
  const datePickerModalRef = useRef<BottomSheetModal>(null);
  const focusSessionRef = useRef<BottomSheetModal>(null);

  const handleBlockNow = () => focusSessionRef.current?.present();
  const handleOpenDatePicker = () => datePickerModalRef.current?.present();
  const handleCloseMilestone = () => {
    setShowMilestone(false);
    setShowStats(true);
  };
  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    datePickerModalRef.current?.dismiss();
  };
  const handleStartSession = (session: any) => {
    focusSessionRef.current?.dismiss();
    setActiveSession(session);
  };
  const handleLeaveEarly = () => setActiveSession(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowInvite(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showInvite && !showStats) {
      const timer = setTimeout(() => setShowMilestone(true), 300);
      return () => clearTimeout(timer);
    }
  }, [showInvite, showStats]);

  useEffect(() => {
    if (showStats && !showDetailedStats) {
      const timer = setTimeout(() => setShowDetailedStats(true), 300);
      return () => clearTimeout(timer);
    }
  }, [showStats]);

  const formatDateForHeader = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "d MMM");
  };

  const handleSaveDistractionLevel = (appId: string, newLevelValue: number) => {
    setAppUsageData((prevData) =>
      prevData.map((app) =>
        app.id === appId
          ? { ...app, distractionLevelValue: newLevelValue }
          : app
      )
    );
  };

  const handleCloseDistractionModal = () => {
    setDistractionModalVisible(false);
    setEditingApp(null);
  };

  const handleAppPress = (app: HomeAppUsageItem) => {
    setEditingApp(app);
    setDistractionModalVisible(true);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">
      <View className="px-8 py-6 flex-row justify-between items-center">
        <View>
          <Text className="text-emerald-600 text-[10px] font-bold uppercase mb-1.5">
            Focus dashboard
          </Text>
          <Pressable onPress={handleOpenDatePicker} className="flex-row items-center">
            <Text className="text-slate-900 text-3xl font-bold">
              {formatDateForHeader(selectedDate)}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#059669" style={{ marginLeft: 10, marginTop: 4 }} />
          </Pressable>
        </View>
        <View className="flex-row gap-3">
          <Pressable className="w-12 h-12 bg-white rounded-2xl items-center justify-center border border-slate-200">
            <Ionicons name="share-outline" size={22} color="#059669" />
            <View className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-50" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View className="mx-8 mt-6">
          <View className="bg-white rounded-[40px] p-8 overflow-hidden relative border border-slate-200">
            <View className="absolute top-[-60] left-[-60] w-80 h-80 bg-emerald-50 rounded-full opacity-50" />
            <View className="absolute bottom-[-100] right-[-100] w-96 h-96 bg-emerald-50 rounded-full opacity-30" />

            <View className="flex-row items-center justify-between mb-8">
              <View className="w-14 h-14 bg-emerald-50 rounded-2xl items-center justify-center border border-emerald-100/50">
                <Ionicons name="flash" size={28} color="#059669" />
              </View>
              <View className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100/50">
                <Text className="text-emerald-600 font-bold text-[9px] uppercase">Premium active</Text>
              </View>
            </View>

            <Text className="text-slate-900 text-4xl font-bold mb-3">Quiet time</Text>
            <Text className="text-slate-500 text-lg font-medium leading-7 mb-12">
              Maximize your productivity by blocking all digital noise.
            </Text>

            <Pressable
              onPress={handleBlockNow}
              className="bg-emerald-600 rounded-[32px] py-6 flex-row items-center justify-center"
            >
              <Ionicons name="power" size={22} color="white" style={{ marginRight: 12 }} />
              <Text className="text-white font-bold text-xl">Start focus now</Text>
            </Pressable>
          </View>
        </View>

        {showInvite && (
          <View className="mx-8 mt-8">
            <InviteBanner onClose={() => setShowInvite(false)} />
          </View>
        )}

        <View className="mt-4">
          {showStats ? (
            <StatsDashboard
              showDetailedStats={showDetailedStats}
              appUsageData={appUsageData}
              onAppPress={handleAppPress}
            />
          ) : (
            <View className="mx-8">
              <InitialAnalysisView
                onPressMilestones={() => setShowMilestone(true)}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {showStats && !showDetailedStats && (
        <View className="absolute bottom-32 left-8 right-8">
          <SessionInfoCard />
        </View>
      )}

      {/* Logic-Based Modals and Sheets */}
      <DistractionModal
        visible={isDistractionModalVisible}
        app={editingApp}
        onSave={handleSaveDistractionLevel}
        onClose={handleCloseDistractionModal}
      />
      <MilestoneModal visible={showMilestone} onClose={handleCloseMilestone} />
      <DatePickerModal
        ref={datePickerModalRef}
        initialDate={selectedDate}
        onDateSelect={handleDateSelected}
      />
      <FocusSessionSheet
        ref={focusSessionRef}
        onStartSession={handleStartSession}
        onClose={() => focusSessionRef.current?.dismiss()}
      />

      {activeSession && (
        <ActiveSessionOverlay
          visible={!!activeSession}
          sessionName={activeSession.name}
          duration={activeSession.duration}
          difficulty={activeSession.difficulty}
          onSnooze={() => { }}
          onLeaveEarly={handleLeaveEarly}
          onEdit={() => { }}
          onClose={() => setActiveSession(null)}
        />
      )}
    </SafeAreaView>
  );
}