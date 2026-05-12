import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { MOCK_BLOCK_LISTS } from "../../constants";
import { BlockList } from "../../types";
import { BlockListSection } from "./BlockListSection";
import { ChooseActivitiesSheet } from "./ChooseActivitiesSheet";
import { ConfirmationAlert } from "./ConfirmationAlert";
import { SwitchListMenu } from "./SwitchListMenu";

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
    setDraftList(JSON.parse(JSON.stringify(activeList)));
  }, [activeList]);

  // Expanded slightly to fit the new padded layout
  const snapPoints = useMemo(() => ["90%"], []);

  const handleSelectList = (listId: string) => {
    setActiveListId(listId);
    setSwitchMenuVisible(false);
    setToast({ visible: true, icon: "swap-horizontal", text: "List selected" });
  };

  const handleConfirmDelete = () => {
    const fallbackList = allLists.find((l) => l.id !== activeListId);
    if (!fallbackList) return;

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

  if (!draftList) return null;

  return (
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#f8fafc" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView className="flex-1 px-5 pt-2">

          {/* Bento Header Card */}
          <View className="bg-white border-2 border-slate-100 rounded-[36px] p-5 mb-4 flex-row justify-between items-center">
            <View className="flex-row items-center flex-1 gap-4">
              <View className="w-14 h-14 bg-emerald-50 rounded-[20px] items-center justify-center border border-emerald-100">
                <Text className="text-3xl">{draftList.icon}</Text>
              </View>
              <TextInput
                value={draftList.name}
                onChangeText={(name) => setDraftList({ ...draftList, name })}
                className="text-slate-900 text-2xl font-extrabold flex-1"
                placeholderTextColor="#94a3b8"
              />
            </View>
            <Pressable
              onPress={() => setSwitchMenuVisible(true)}
              className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl flex-row items-center gap-1.5 ml-2"
            >
              <Text className="text-slate-700 font-bold text-sm">Switch</Text>
              <Ionicons name="swap-vertical" size={16} color="#475569" />
            </Pressable>
          </View>

          <Text className="text-slate-500 font-medium mb-6 px-2 text-sm">
            Block List: Only these selected apps and categories will be blocked during your session.
          </Text>

          {/* Bento Sections Container */}
          <View className="flex-1 gap-4">

            {/* Categories Wrapper */}
            <View className="bg-white border-2 border-slate-100 rounded-[32px] p-5">
              <BlockListSection
                title="Categories"
                count={draftList.selectedCategories.length}
                onAddRemove={() => setChooseActivitiesVisible(true)}
              >
                {draftList.selectedCategories.length > 0 ? (
                  <View className="flex-row flex-wrap gap-2 pt-2">
                    {draftList.selectedCategories.map((catId) => (
                      <View key={catId} className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                        <Text className="text-slate-700 font-bold text-sm">
                          {catId}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-slate-400 font-medium pt-2">No categories selected</Text>
                )}
              </BlockListSection>
            </View>

            {/* Apps Wrapper */}
            <View className="bg-white border-2 border-slate-100 rounded-[32px] p-5">
              <BlockListSection
                title="Apps"
                count={draftList.selectedApps.length}
                total={349}
                onAddRemove={() => { }}
              >
                {draftList.selectedApps.length > 0 ? (
                  <View className="flex-row flex-wrap gap-2 pt-2">
                    {draftList.selectedApps.map((appId) => (
                      <View key={appId} className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                        <Text className="text-slate-700 font-bold text-sm capitalize">
                          {appId}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-slate-400 font-medium pt-2">No Apps selected</Text>
                )}
              </BlockListSection>
            </View>

            {/* Adult Blocking Card */}
            <View className="bg-white border-2 border-slate-100 rounded-[32px] p-5">
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-amber-50 rounded-2xl items-center justify-center border border-amber-100">
                    <Ionicons name="warning" size={20} color="#d97706" />
                  </View>
                  <Text className="text-slate-900 text-lg font-bold">Adult Blocking</Text>
                </View>
                <Switch
                  value={draftList.isAdultBlockingEnabled}
                  onValueChange={(val) =>
                    setDraftList({ ...draftList, isAdultBlockingEnabled: val })
                  }
                  trackColor={{ false: "#e2e8f0", true: "#10b981" }}
                  thumbColor="#ffffff"
                />
              </View>
              <View className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <Text className="text-slate-500 text-xs font-bold leading-5">
                  Please note: If Adult is selected, adult content will be actively filtered and blocked.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer Actions */}
          <View className="pb-8 pt-4 gap-3">
            <Pressable
              onPress={handleSave}
              className="w-full bg-emerald-600 border border-emerald-500 py-4 rounded-[24px] items-center justify-center"
            >
              <Text className="text-white text-lg font-bold">Save Changes</Text>
            </Pressable>

            <Pressable
              onPress={() => setDeleteAlertVisible(true)}
              className="w-full bg-rose-50 border border-rose-100 py-4 rounded-[24px] items-center justify-center"
            >
              <Text className="text-rose-600 text-base font-bold">Delete Block List</Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>

      <SwitchListMenu
        visible={isSwitchMenuVisible}
        activeListId={activeListId}
        blockLists={allLists}
        onSelectList={handleSelectList}
        onCreateNew={() => { }}
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
          <Text className="text-slate-500 text-center font-medium">
            Your block will switch to use "
            {allLists.find((l) => l.id !== activeListId)?.name}"
          </Text>
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlertVisible(false)}
      />
    </>
  );
});

export default BlockListSheet;