// import DatePickerModal from "@/components/DatePickerModal";

// import { BlockNowButton } from "@@/components/DistractionModal
// import { HomeHeader } from "@/components/home/HomeHeader";
// import { InitialAnalysisView } from "@/components/home/InitialAnalysisView";
// import { InviteBanner } from "@/components/home/InviteBanner";
// import { MilestoneModal } from "@/components/home/MilestoneModal";
// import { SessionInfoCard } from "@/components/home/SessionInfoCard";
// import { StatsDashboard } from "@/components/home/StatsDashboard";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import { format, isToday, isYesterday } from "date-fns";
// import React, { useEffect, useRef, useState } from "react";
// import { ScrollView, StatusBar, View } from "react-native";
// import ActiveSessionOverlay from "../../components/ActiveSessionOverlay";
// import FocusSessionSheet from "../../components/FocusSessionSheet";
// import { DifficultyLevel } from "../../types";

// export default function HomeScreen() {
//   // --- STATE MANAGEMENT ---
//   const [showMilestone, setShowMilestone] = useState(false);
//   const [showInvite, setShowInvite] = useState(true);
//   const [showStats, setShowStats] = useState(false);
//   const [showDetailedStats, setShowDetailedStats] = useState(false);
//   const [sessionExpanded, setSessionExpanded] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [activeSession, setActiveSession] = useState<{
//     name: string;
//     duration: number;
//     difficulty: DifficultyLevel;
//     isAlwaysOn: boolean;
//   } | null>(null);

//   // --- REFS ---
//   const datePickerModalRef = useRef<BottomSheetModal>(null);
//   const focusSessionRef = useRef<BottomSheetModal>(null);

//   // --- HANDLERS ---
//   const handleBlockNow = () => focusSessionRef.current?.present();
//   const handleOpenDatePicker = () => datePickerModalRef.current?.present();
//   const handleCloseMilestone = () => {
//     setShowMilestone(false);
//     setShowStats(true);
//   };
//   const handleDateSelected = (date: Date) => {
//     setSelectedDate(date);
//     datePickerModalRef.current?.dismiss();
//   };
//   const handleStartSession = (session: any) => {
//     focusSessionRef.current?.dismiss();
//     setActiveSession(session);
//   };
//   const handleLeaveEarly = () => setActiveSession(null);

//   // --- SIDE EFFECTS ---
//   useEffect(() => {
//     const timer = setTimeout(() => setShowInvite(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!showInvite && !showStats) {
//       const timer = setTimeout(() => setShowMilestone(true), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showInvite, showStats]);

//   useEffect(() => {
//     if (showStats && !showDetailedStats) {
//       const timer = setTimeout(() => setShowDetailedStats(true), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [showStats]);

//   // --- HELPERS ---
//   const formatDateForHeader = (date: Date) => {
//     if (isToday(date)) return "Today";
//     if (isYesterday(date)) return "Yesterday";
//     return format(date, "d MMM");
//   };

//   return (
//     <View className="flex-1 bg-black">
//       <StatusBar barStyle="light-content" />
//       <HomeHeader
//         dateToDisplay={formatDateForHeader(selectedDate)}
//         onDatePress={handleOpenDatePicker}
//       />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {showInvite && (
//           <InviteBanner onClose={() => setShowInvite(false)} />
//         )}

//         {showStats ? (
//           <StatsDashboard showDetailedStats={showDetailedStats} />
//         ) : (
//           <InitialAnalysisView
//             onPressMilestones={() => setShowMilestone(true)}
//           />
//         )}
//       </ScrollView>

//       {/* Conditional Bottom UI Elements */}
//       {showDetailedStats && <BlockNowButton onPress={handleBlockNow} />}
//       {showStats && !showDetailedStats && (
//         <SessionInfoCard
//           isExpanded={sessionExpanded}
//           onToggle={() => setSessionExpanded(!sessionExpanded)}
//         />
//       )}

//       {/* Modals and Sheets */}
//       <MilestoneModal
//         visible={showMilestone}
//         onClose={handleCloseMilestone}
//       />
//       <DatePickerModal
//         ref={datePickerModalRef}
//         initialDate={selectedDate}
//         onDateSelect={handleDateSelected}
//       />
//       <FocusSessionSheet
//         ref={focusSessionRef}
//         onStartSession={handleStartSession}
//         onClose={() => focusSessionRef.current?.dismiss()}
//       />
//       {activeSession && (
//         <ActiveSessionOverlay
//           visible={!!activeSession}
//           sessionName={activeSession.name}
//           duration={activeSession.duration}
//           difficulty={activeSession.difficulty}
//           onSnooze={() => {}}
//           onLeaveEarly={handleLeaveEarly}
//           onEdit={() => {}}
//           onClose={() => setActiveSession(null)}
//         />
//       )}
//     </View>
//   );
// }

import DatePickerModal from "@/components/DatePickerModal";

import DistractionModal from "@/components/DistractionModal";
import { BlockNowButton } from "@/components/home/BlockNowButton";
import { HomeHeader } from "@/components/home/HomeHeader";
import { InitialAnalysisView } from "@/components/home/InitialAnalysisView";
import { InviteBanner } from "@/components/home/InviteBanner";
import { MilestoneModal } from "@/components/home/MilestoneModal";
import { SessionInfoCard } from "@/components/home/SessionInfoCard";
import { StatsDashboard } from "@/components/home/StatsDashboard";
import { HOME_APP_USAGE_DATA } from "@/constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { format, isToday, isYesterday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import ActiveSessionOverlay from "../../components/ActiveSessionOverlay";
import FocusSessionSheet from "../../components/FocusSessionSheet";
import { DifficultyLevel, HomeAppUsageItem } from "../../types";

export default function HomeScreen() {
  // --- STATE MANAGEMENT ---
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

  // --- HANDLERS ---
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

  // --- SIDE EFFECTS ---
  useEffect(() => {
    const timer = setTimeout(() => setShowInvite(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showInvite && !showStats) {
      const timer = setTimeout(() => setShowMilestone(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [showInvite, showStats]);

  useEffect(() => {
    if (showStats && !showDetailedStats) {
      const timer = setTimeout(() => setShowDetailedStats(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [showStats]);

  // --- HELPERS ---
  const formatDateForHeader = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "d MMM");
  };
  
  const handleSaveDistractionLevel = (appId: string, newLevelValue: number) => {
    setAppUsageData((prevData) =>
      prevData.map((app) =>
        app.id === appId ? { ...app, distractionLevelValue: newLevelValue } : app
      )
    );
    // The modal handles its own closing, so no need to call a dismiss function here.
  };

  const handleCloseDistractionModal = () => {
    setDistractionModalVisible(false);
    setEditingApp(null); // Clear the editing app state when modal closes
  };

  const handleAppPress = (app: HomeAppUsageItem) => {
    setEditingApp(app);
    setDistractionModalVisible(true);
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <HomeHeader
        dateToDisplay={formatDateForHeader(selectedDate)}
        onDatePress={handleOpenDatePicker}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {showInvite && <InviteBanner onClose={() => setShowInvite(false)} />}

        {showStats ? (
          <StatsDashboard
            showDetailedStats={showDetailedStats}
            appUsageData={appUsageData}
            onAppPress={handleAppPress}
          />
        ) : (
          <InitialAnalysisView
            onPressMilestones={() => setShowMilestone(true)}
          />
        )}
      </ScrollView>

      {/* Conditional Bottom UI Elements */}
      {showDetailedStats && <BlockNowButton onPress={handleBlockNow} />}
      {/* {showStats && !showDetailedStats && ( */}
        <SessionInfoCard
        />
      {/* )} */}

      {/* Modals and Sheets */}
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
          onSnooze={() => {}}
          onLeaveEarly={handleLeaveEarly}
          onEdit={() => {}}
          onClose={() => setActiveSession(null)}
        />
      )}
    </View>
  );
}
