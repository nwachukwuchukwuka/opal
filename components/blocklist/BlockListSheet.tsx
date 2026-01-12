import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { MOCK_BLOCK_LISTS } from "../../constants";
import { BlockList } from "../../types";
import { BlockListSection } from "./BlockListSection";
import { ChooseActivitiesSheet } from "./ChooseActivitiesSheet";
import { ConfirmationAlert } from "./ConfirmationAlert";
// import { FeedbackToast } from "./FeedbackToast";
import { SwitchListMenu } from "./SwitchListMenu";
// import { FeedbackToast } from "./FeedbackToast";
// import { BlockListSection } from "./BlockListSection";
// import { ChooseActivitiesSheet } from "./ChooseActivitiesSheet";
// import { ConfirmationAlert } from "./ConfirmationAlert";
// import { FeedbackToast } from "./FeedbackToast";
// import { SwitchListMenu } from "./SwitchListMenu";

export type BlockListSheetRef = BottomSheetModal;

const BlockListSheet = forwardRef<BlockListSheetRef>((props, ref) => {
  const [allLists, setAllLists] = useState<BlockList[]>(MOCK_BLOCK_LISTS);
  const [activeListId, setActiveListId] = useState<string>(
    MOCK_BLOCK_LISTS[0].id
  );
  const [draftList, setDraftList] = useState<BlockList | null>(null);

  const [isSwitchMenuVisible, setSwitchMenuVisible] = useState(false);
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [isChooseActivitiesVisible, setChooseActivitiesVisible] =
    useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    icon: any;
    text: string;
  }>({ visible: false, icon: "checkmark", text: "" });

  const activeList = useMemo(
    () => allLists.find((l) => l.id === activeListId)!,
    [allLists, activeListId]
  );

  useEffect(() => {
    // When the active list changes, update the draft for editing
    setDraftList(JSON.parse(JSON.stringify(activeList)));
  }, [activeList]);

  const snapPoints = useMemo(() => ["90%"], []);

  const handleSelectList = (listId: string) => {
    setActiveListId(listId);
    setSwitchMenuVisible(false);
    setToast({ visible: true, icon: "swap-horizontal", text: "List selected" });
  };

  const handleConfirmDelete = () => {
    const fallbackList = allLists.find((l) => l.id !== activeListId);
    if (!fallbackList) return; // Cannot delete the last list

    setAllLists((prev) => prev.filter((l) => l.id !== activeListId));
    setActiveListId(fallbackList.id);
    setDeleteAlertVisible(false);
    setToast({ visible: true, icon: "swap-horizontal", text: "List selected" });
  };

  const handleSaveActivities = (selectedCategoryIds: string[]) => {
    if (!draftList) return;
    setDraftList({ ...draftList, selectedCategories: selectedCategoryIds });
    setChooseActivitiesVisible(false);
  };

  const handleSave = () => {
    if (!draftList) return;
    setAllLists((prev) =>
      prev.map((l) => (l.id === draftList.id ? draftList : l))
    );
    if (ref && "current" in ref) ref.current?.dismiss();
  };

  if (!draftList) return null; // Wait for draft to be ready

  return (
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <BottomSheetView className="flex-1 px-5 pt-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center gap-3">
              <Text className="text-3xl">{draftList.icon}</Text>
              <TextInput
                value={draftList.name}
                onChangeText={(name) => setDraftList({ ...draftList, name })}
                className="text-white text-2xl font-bold"
              />
            </View>
            <Pressable
              onPress={() => setSwitchMenuVisible(true)}
              className="flex-row items-center gap-1 bg-zinc-700 px-3 py-1.5 rounded-lg"
            >
              <Text className="text-white">Switch</Text>
              <Ionicons name="chevron-down" size={16} color="white" />
            </Pressable>
          </View>
          <Text className="text-zinc-400 mb-6">
            Block List: only these apps will be blocked...
          </Text>

          {/* Sections */}
          <View className="flex-1 gap-6">
            <BlockListSection
              title="Categories"
              count={draftList.selectedCategories.length}
              onAddRemove={() => setChooseActivitiesVisible(true)}
            >
              {draftList.selectedCategories.length > 0 ? (
                draftList.selectedCategories.map((catId) => (
                  <Text key={catId} className="text-white">
                    {catId}
                  </Text>
                ))
              ) : (
                <Text className="text-zinc-500">No categories selected</Text>
              )}
            </BlockListSection>

            <BlockListSection
              title="Apps"
              count={draftList.selectedApps.length}
              total={349}
              onAddRemove={() => {}}
            >
              {draftList.selectedApps.length > 0 ? (
                draftList.selectedApps.map((appId) => (
                  <Text key={appId} className="text-white capitalize">
                    {appId}
                  </Text>
                ))
              ) : (
                <Text className="text-zinc-500">No Apps selected</Text>
              )}
            </BlockListSection>

            <View className="bg-zinc-800 rounded-xl p-4 gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-white">Adult Blocking</Text>
                <Switch
                  value={draftList.isAdultBlockingEnabled}
                  onValueChange={(val) =>
                    setDraftList({ ...draftList, isAdultBlockingEnabled: val })
                  }
                />
              </View>
              <Text className="text-yellow-500 text-xs">
                Please note: If Adult is selected...
              </Text>
            </View>
          </View>

          {/* Footer Actions */}
          <View className="pb-6 gap-3">
            <Pressable
              onPress={handleSave}
              className="w-full py-4 rounded-full bg-gradient-to-r from-green-300 to-cyan-400 items-center"
            >
              <Text className="text-black text-lg font-bold">Save</Text>
            </Pressable>
            <Pressable
              onPress={() => setDeleteAlertVisible(true)}
              className="items-center py-2"
            >
              <Text className="text-red-500 text-base">Delete Block List</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Modals & Menus controlled by this sheet */}
      <SwitchListMenu
        visible={isSwitchMenuVisible}
        activeListId={activeListId}
        blockLists={allLists}
        onSelectList={handleSelectList}
        onCreateNew={() => {}}
        onClose={() => setSwitchMenuVisible(false)}
      />
      <ChooseActivitiesSheet
        visible={isChooseActivitiesVisible}
        initialSelectedCategories={draftList.selectedCategories}
        onSave={handleSaveActivities}
        onCancel={() => setChooseActivitiesVisible(false)}
      />
      <ConfirmationAlert
        visible={isDeleteAlertVisible}
        title="Are you sure you want to delete this app list?"
        message={
          <Text className="text-zinc-400 text-center">
            Your block will switch to use "
            {allLists.find((l) => l.id !== activeListId)?.name}"
          </Text>
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlertVisible(false)}
      />
      {/* <FeedbackToast
        visible={toast.visible}
        icon={toast.icon}
        text={toast.text}
        onHide={() => setToast({ ...toast, visible: false })}
      /> */}
    </>
  );
});

export default BlockListSheet;
