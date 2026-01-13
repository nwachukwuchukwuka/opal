import { CommunityCard } from "@/components/profile/CommunityCard";
import { FocusReportCard } from "@/components/profile/FocusReportCard";
import { FooterInfo } from "@/components/profile/FooterInfo";
import { JoinBoardCard } from "@/components/profile/JoinBoardCard";
import { LeaderboardCard } from "@/components/profile/LeaderboardCard";
import { MilestonesCard } from "@/components/profile/MilestonesCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import RewardsSheet, {
  RewardsSheetRef,
} from "@/components/profile/RewardsSheet";
import { ScreenTimeCard } from "@/components/profile/ScreenTimeCard";
import { AuthModal } from "@/components/profile/settings/AuthModal";
import BlockScreenCustomizationSheet, {
  BlockScreenCustomizationSheetRef,
} from "@/components/profile/settings/BlockScreenCustomizationSheet";
import { ChangePasswordFlow } from "@/components/profile/settings/ChangePasswordFlow";
import { ChangePhoneFlow } from "@/components/profile/settings/ChangePhoneFlow";
import { DeleteAccountModal } from "@/components/profile/settings/DeleteAccountModal";
import { EditGemNameModal } from "@/components/profile/settings/EditGemNameModal";
import { EmailVerificationModal } from "@/components/profile/settings/EmailVerificationModal";
import FAQSheet, { FAQSheetRef } from "@/components/profile/settings/FAQSheet";
import FriendsSheet, {
  FriendsSheetRef,
} from "@/components/profile/settings/FriendsSheet";
import { LogoutModal } from "@/components/profile/settings/LogoutModal";
import NotificationSettingsSheet, {
  NotificationSettingsSheetRef,
} from "@/components/profile/settings/NotificationSettingsSheet";
import QRCodeScannerSheet, {
  QRCodeScannerSheetRef,
} from "@/components/profile/settings/QRCodeScannerSheet";
import ReferralCodeSheet, {
  ReferralCodeSheetRef,
} from "@/components/profile/settings/ReferralCodeSheet";
import SettingsSheet, {
  SettingsSheetRef,
} from "@/components/profile/settings/SettingsSheet";
import { SupportChatModal } from "@/components/profile/settings/SupportChatModal";
import { SharePassCard } from "@/components/profile/SharePassCard";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const rewardsSheetRef = useRef<RewardsSheetRef>(null);
  const settingsSheetRef = useRef<SettingsSheetRef>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [gemName, setGemName] = useState("Alexthegreat1");
  const [isEditNameVisible, setIsEditNameVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isPasswordFlowVisible, setPasswordFlowVisible] = useState(false);
  const [isPhoneFlowVisible, setPhoneFlowVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const friendsSheetRef = useRef<FriendsSheetRef>(null);
  const referralSheetRef = useRef<ReferralCodeSheetRef>(null);
  const notificationSheetRef = useRef<NotificationSettingsSheetRef>(null);
  const qrSheetRef = useRef<QRCodeScannerSheetRef>(null);
  const customizationSheetRef = useRef<BlockScreenCustomizationSheetRef>(null);
  const [isSupportChatVisible, setSupportChatVisible] = useState(false);

  const [referrerName, setReferrerName] = useState<string | null>(null);
  const faqSheetRef = useRef<FAQSheetRef>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);

  const handleLoginPress = () => {
    setAuthModalVisible(true);
  };

  const handleLoginSuccess = () => {
    setAuthModalVisible(false);
    setIsLoggedIn(true);
  };

  const handleLogoutPress = () => {
    settingsSheetRef.current?.dismiss();
    setLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    setIsLoggedIn(false);
  };

  const handleViewRewards = () => {
    rewardsSheetRef.current?.present();
  };

  const handleOpenSettings = () => {
    settingsSheetRef.current?.present();
  };

  const handleSaveGemName = (newName: string) => {
    setGemName(newName);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSendEmail = () => {
    console.log("Email sent!");
    setEmailModalVisible(false);
  };

  const handleEditEmail = () => {
    console.log("Navigate to edit email");
    setEmailModalVisible(false);
  };

  const handleSavePhoneNumber = (number: string) => {
    setPhoneNumber(number);
  };

  const handleOpenFriends = () => {
    friendsSheetRef.current?.present();
  };

  const handleAddFriendsFromSheet = () => {
    friendsSheetRef.current?.dismiss();
  };

  const handleOpenReferral = () => {
    referralSheetRef.current?.present();
  };

  const handleReferralSuccess = (name: string) => {
    setReferrerName(name);
  };

  const handleDeleteRequest = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    faqSheetRef.current?.dismiss();
    settingsSheetRef.current?.dismiss();
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    // <BottomSheetModalProvider>
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <ProfileHeader
            onSettingsPress={handleOpenSettings}
            profileImage={profileImage}
            gemName={gemName}
            isGuest={!isLoggedIn}
            // onLoginPress={handleLogin}
            onLoginPress={handleLoginPress}
          />
        </View>

        <View className="px-5">
          <ScreenTimeCard />
          <SharePassCard onPress={handleViewRewards} />
          <LeaderboardCard />
          <FocusReportCard />
          <MilestonesCard />
          <CommunityCard />
          <JoinBoardCard />
          <FooterInfo />
        </View>
      </ScrollView>

      <RewardsSheet ref={rewardsSheetRef} />

      <SettingsSheet
        ref={settingsSheetRef}
        onPickImage={pickImage}
        currentImage={profileImage}
        gemName={gemName}
        onEditGemName={() => setIsEditNameVisible(true)}
        onEmailPress={() => setEmailModalVisible(true)}
        onPasswordPress={() => setPasswordFlowVisible(true)}
        onPhonePress={() => setPhoneFlowVisible(true)}
        phoneNumber={phoneNumber}
        onFriendsPress={handleOpenFriends}
        onEnterReferralPress={handleOpenReferral}
        referrerName={referrerName}
        onNotificationsPress={() => notificationSheetRef.current?.present()}
        onScanQRPress={() => qrSheetRef.current?.present()}
        onCustomizeBlockScreenPress={() =>
          customizationSheetRef.current?.present()
        }
        onSupportChatPress={() => setSupportChatVisible(true)}
        onFAQsPress={() => faqSheetRef.current?.present()}
        onLogoutPress={handleLogoutPress}
      />

      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleConfirmLogout}
      />

      <AuthModal
        visible={isAuthModalVisible}
        onClose={() => setAuthModalVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <EditGemNameModal
        visible={isEditNameVisible}
        initialName={gemName}
        onClose={() => setIsEditNameVisible(false)}
        onSave={handleSaveGemName}
      />

      <EmailVerificationModal
        visible={isEmailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        onSendEmail={handleSendEmail}
        onEditEmail={handleEditEmail}
      />
      <ChangePasswordFlow
        visible={isPasswordFlowVisible}
        onClose={() => setPasswordFlowVisible(false)}
        email="alexsmith.mobbin+1@gmail.com"
      />
      <ChangePhoneFlow
        visible={isPhoneFlowVisible}
        onClose={() => setPhoneFlowVisible(false)}
        onSave={handleSavePhoneNumber}
      />

      <FriendsSheet
        ref={friendsSheetRef}
        onAddFriends={handleAddFriendsFromSheet}
      />
      <ReferralCodeSheet
        ref={referralSheetRef}
        onSuccess={handleReferralSuccess}
      />
      <NotificationSettingsSheet ref={notificationSheetRef} />
      <QRCodeScannerSheet ref={qrSheetRef} />
      <BlockScreenCustomizationSheet ref={customizationSheetRef} />
      <SupportChatModal
        visible={isSupportChatVisible}
        onClose={() => setSupportChatVisible(false)}
      />

      <FAQSheet
        ref={faqSheetRef}
        onDeleteAccountRequest={handleDeleteRequest}
      />

      <DeleteAccountModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </SafeAreaView>
    // </BottomSheetModalProvider>
    // </GestureHandlerRootView>
  );
};

export default ProfileScreen;



//-------------------------------------------------------modal profile
// import { CommunityCard } from "@/components/profile/CommunityCard";
// import { FocusReportCard } from "@/components/profile/FocusReportCard";
// import { FooterInfo } from "@/components/profile/FooterInfo";
// import { JoinBoardCard } from "@/components/profile/JoinBoardCard";
// import { LeaderboardCard } from "@/components/profile/LeaderboardCard";
// import { MilestonesCard } from "@/components/profile/MilestonesCard";
// import { ProfileHeader } from "@/components/profile/ProfileHeader";
// import RewardsSheet, {
//   RewardsSheetRef,
// } from "@/components/profile/RewardsSheet";
// import { ScreenTimeCard } from "@/components/profile/ScreenTimeCard";
// import { AuthModal } from "@/components/profile/settings/AuthModal";
// import BlockScreenCustomizationSheet, {
//   BlockScreenCustomizationSheetRef,
// } from "@/components/profile/settings/BlockScreenCustomizationSheet";
// import { ChangePasswordFlow } from "@/components/profile/settings/ChangePasswordFlow";
// import { ChangePhoneFlow } from "@/components/profile/settings/ChangePhoneFlow";
// import { DeleteAccountModal } from "@/components/profile/settings/DeleteAccountModal";
// import { EditGemNameModal } from "@/components/profile/settings/EditGemNameModal";
// import { EmailVerificationModal } from "@/components/profile/settings/EmailVerificationModal";
// import FAQSheet, { FAQSheetRef } from "@/components/profile/settings/FAQSheet";
// import FriendsSheet, {
//   FriendsSheetRef,
// } from "@/components/profile/settings/FriendsSheet";
// import { LogoutModal } from "@/components/profile/settings/LogoutModal";
// import NotificationSettingsSheet, {
//   NotificationSettingsSheetRef,
// } from "@/components/profile/settings/NotificationSettingsSheet";
// import QRCodeScannerSheet, {
//   QRCodeScannerSheetRef,
// } from "@/components/profile/settings/QRCodeScannerSheet";
// import ReferralCodeSheet, {
//   ReferralCodeSheetRef,
// } from "@/components/profile/settings/ReferralCodeSheet";
// import SettingsSheet, {
//   SettingsSheetRef,
// } from "@/components/profile/settings/SettingsSheet";
// import { SupportChatModal } from "@/components/profile/settings/SupportChatModal";
// import { SharePassCard } from "@/components/profile/SharePassCard";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"; // Ensure this is imported
// import * as ImagePicker from "expo-image-picker";
// import React, { useRef, useState } from "react";
// import { Alert, Modal, ScrollView, View } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler"; // Ensure this is imported
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// // 1. Define Props for the Modal
// interface ProfileModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// // 2. Change component definition
// const ProfileModal = ({ visible, onClose }: ProfileModalProps) => {
//   const rewardsSheetRef = useRef<RewardsSheetRef>(null);
//   const settingsSheetRef = useRef<SettingsSheetRef>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [gemName, setGemName] = useState("Alexthegreat1");
//   const [isEditNameVisible, setIsEditNameVisible] = useState(false);
//   const [isEmailModalVisible, setEmailModalVisible] = useState(false);
//   const [isPasswordFlowVisible, setPasswordFlowVisible] = useState(false);
//   const [isPhoneFlowVisible, setPhoneFlowVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const friendsSheetRef = useRef<FriendsSheetRef>(null);
//   const referralSheetRef = useRef<ReferralCodeSheetRef>(null);
//   const notificationSheetRef = useRef<NotificationSettingsSheetRef>(null);
//   const qrSheetRef = useRef<QRCodeScannerSheetRef>(null);
//   const customizationSheetRef = useRef<BlockScreenCustomizationSheetRef>(null);
//   const [isSupportChatVisible, setSupportChatVisible] = useState(false);

//   const [referrerName, setReferrerName] = useState<string | null>(null);
//   const faqSheetRef = useRef<FAQSheetRef>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

//   const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
//   const [isAuthModalVisible, setAuthModalVisible] = useState(false);

//   const handleLoginPress = () => {
//     setAuthModalVisible(true);
//   };

//   const handleLoginSuccess = () => {
//     setAuthModalVisible(false);
//     setIsLoggedIn(true);
//   };

//   const handleLogoutPress = () => {
//     settingsSheetRef.current?.dismiss();
//     setLogoutModalVisible(true);
//   };

//   const handleConfirmLogout = () => {
//     setLogoutModalVisible(false);
//     setIsLoggedIn(false);
//   };

//   const handleViewRewards = () => {
//     rewardsSheetRef.current?.present();
//   };

//   const handleOpenSettings = () => {
//     settingsSheetRef.current?.present();
//   };

//   const handleSaveGemName = (newName: string) => {
//     setGemName(newName);
//   };

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Denied",
//         "Sorry, we need camera roll permissions to make this work!"
//       );
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//     }
//   };

//   const handleSendEmail = () => {
//     console.log("Email sent!");
//     setEmailModalVisible(false);
//   };

//   const handleEditEmail = () => {
//     console.log("Navigate to edit email");
//     setEmailModalVisible(false);
//   };

//   const handleSavePhoneNumber = (number: string) => {
//     setPhoneNumber(number);
//   };

//   const handleOpenFriends = () => {
//     friendsSheetRef.current?.present();
//   };

//   const handleAddFriendsFromSheet = () => {
//     friendsSheetRef.current?.dismiss();
//   };

//   const handleOpenReferral = () => {
//     referralSheetRef.current?.present();
//   };

//   const handleReferralSuccess = (name: string) => {
//     setReferrerName(name);
//   };

//   const handleDeleteRequest = () => {
//     setDeleteModalVisible(true);
//   };

//   const handleConfirmDelete = () => {
//     setDeleteModalVisible(false);
//     faqSheetRef.current?.dismiss();
//     settingsSheetRef.current?.dismiss();
//     setIsLoggedIn(false);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="fullScreen"
//       onRequestClose={onClose}
//     >
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <BottomSheetModalProvider>
//           <SafeAreaProvider>
//             <SafeAreaView edges={["top"]} className="flex-1 bg-black">
//               <ScrollView
//                 className="flex-1"
//                 showsVerticalScrollIndicator={false}
//               >
//                 <View className="px-5">
//                   <ProfileHeader
//                     onSettingsPress={handleOpenSettings}
//                     profileImage={profileImage}
//                     gemName={gemName}
//                     isGuest={!isLoggedIn}
//                     onLoginPress={handleLoginPress}
//                     // 5. Pass the onClose prop to your header so the 'X' works
//                     // You need to update ProfileHeader to accept an onClose prop
//                     onClose={onClose}
//                   />
//                 </View>

//                 <View className="px-5">
//                   <ScreenTimeCard />
//                   <SharePassCard onPress={handleViewRewards} />
//                   <LeaderboardCard />
//                   <FocusReportCard />
//                   <MilestonesCard />
//                   <CommunityCard />
//                   <JoinBoardCard />
//                   <FooterInfo />
//                 </View>
//               </ScrollView>

//               <RewardsSheet ref={rewardsSheetRef} />

//               <SettingsSheet
//                 ref={settingsSheetRef}
//                 onPickImage={pickImage}
//                 currentImage={profileImage}
//                 gemName={gemName}
//                 onEditGemName={() => setIsEditNameVisible(true)}
//                 onEmailPress={() => setEmailModalVisible(true)}
//                 onPasswordPress={() => setPasswordFlowVisible(true)}
//                 onPhonePress={() => setPhoneFlowVisible(true)}
//                 phoneNumber={phoneNumber}
//                 onFriendsPress={handleOpenFriends}
//                 onEnterReferralPress={handleOpenReferral}
//                 referrerName={referrerName}
//                 onNotificationsPress={() =>
//                   notificationSheetRef.current?.present()
//                 }
//                 onScanQRPress={() => qrSheetRef.current?.present()}
//                 onCustomizeBlockScreenPress={() =>
//                   customizationSheetRef.current?.present()
//                 }
//                 onSupportChatPress={() => setSupportChatVisible(true)}
//                 onFAQsPress={() => faqSheetRef.current?.present()}
//                 onLogoutPress={handleLogoutPress}
//               />

//               <LogoutModal
//                 visible={isLogoutModalVisible}
//                 onClose={() => setLogoutModalVisible(false)}
//                 onConfirm={handleConfirmLogout}
//               />

//               <AuthModal
//                 visible={isAuthModalVisible}
//                 onClose={() => setAuthModalVisible(false)}
//                 onLoginSuccess={handleLoginSuccess}
//               />

//               <EditGemNameModal
//                 visible={isEditNameVisible}
//                 initialName={gemName}
//                 onClose={() => setIsEditNameVisible(false)}
//                 onSave={handleSaveGemName}
//               />

//               <EmailVerificationModal
//                 visible={isEmailModalVisible}
//                 onClose={() => setEmailModalVisible(false)}
//                 onSendEmail={handleSendEmail}
//                 onEditEmail={handleEditEmail}
//               />
//               <ChangePasswordFlow
//                 visible={isPasswordFlowVisible}
//                 onClose={() => setPasswordFlowVisible(false)}
//                 email="alexsmith.mobbin+1@gmail.com"
//               />
//               <ChangePhoneFlow
//                 visible={isPhoneFlowVisible}
//                 onClose={() => setPhoneFlowVisible(false)}
//                 onSave={handleSavePhoneNumber}
//               />

//               <FriendsSheet
//                 ref={friendsSheetRef}
//                 onAddFriends={handleAddFriendsFromSheet}
//               />
//               <ReferralCodeSheet
//                 ref={referralSheetRef}
//                 onSuccess={handleReferralSuccess}
//               />
//               <NotificationSettingsSheet ref={notificationSheetRef} />
//               <QRCodeScannerSheet ref={qrSheetRef} />
//               <BlockScreenCustomizationSheet ref={customizationSheetRef} />
//               <SupportChatModal
//                 visible={isSupportChatVisible}
//                 onClose={() => setSupportChatVisible(false)}
//               />

//               <FAQSheet
//                 ref={faqSheetRef}
//                 onDeleteAccountRequest={handleDeleteRequest}
//               />

//               <DeleteAccountModal
//                 visible={isDeleteModalVisible}
//                 onClose={() => setDeleteModalVisible(false)}
//                 onConfirm={handleConfirmDelete}
//               />
//             </SafeAreaView>
//           </SafeAreaProvider>
//         </BottomSheetModalProvider>
//       </GestureHandlerRootView>
//     </Modal>
//   );
// };

// export default ProfileModal;
