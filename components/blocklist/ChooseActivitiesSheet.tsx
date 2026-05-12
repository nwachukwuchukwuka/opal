import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { APP_CATEGORIES } from "../../constants";
import { FeedbackToast } from "./FeedbackToast";

interface Props {
  visible: boolean;
  initialSelectedCategories: string[];
  onSave: (selected: string[]) => void;
  onCancel: () => void;
}

export const ChooseActivitiesSheet = ({
  visible,
  initialSelectedCategories,
  onSave,
  onCancel,
}: Props) => {
  const [selected, setSelected] = useState(initialSelectedCategories);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave(selected);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50 relative">
          <View className="px-6 pt-6 pb-4">
            <Text className="text-slate-900 text-3xl font-extrabold mb-1.5">
              Choose Activities
            </Text>
            <Text className="text-slate-500 text-sm font-medium">
              Select the categories you want to restrict.
            </Text>
          </View>

          {/* Redesigned Search Placeholder */}
          <View className="px-6 mb-6">
            <View className="bg-white border-2 border-slate-100 h-14 rounded-[20px] flex-row items-center px-4">
              <Ionicons name="search" size={20} color="#94a3b8" />
              <Text className="text-slate-400 ml-3 font-bold text-sm">
                Search categories...
              </Text>
            </View>
          </View>

          {/* Scrollable Content Area */}
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120, gap: 12 }}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-slate-400 font-bold text-xs mb-2 ml-2">
              Select up to 49 apps
            </Text>

            {APP_CATEGORIES.map((category) => {
              const isSelected = selected.includes(category.id);
              return (
                <Pressable
                  key={category.id}
                  onPress={() => toggleSelection(category.id)}
                  className={`flex-row items-center justify-between p-4 rounded-[24px] border-2 ${isSelected
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-white border-slate-100"
                    }`}
                >
                  {/* Left Side: Icon & Title */}
                  <View className="flex-row items-center gap-4">
                    <View
                      className={`w-12 h-12 rounded-[16px] items-center justify-center border ${isSelected ? "bg-emerald-100 border-emerald-200" : "bg-slate-50 border-slate-100"
                        }`}
                    >
                      <Ionicons
                        name={category.icon as keyof typeof Ionicons.glyphMap}
                        size={24}
                        color={isSelected ? "#059669" : category.color}
                      />
                    </View>
                    <Text
                      className={`text-lg font-bold ${isSelected ? "text-emerald-950" : "text-slate-900"
                        }`}
                    >
                      {category.name}
                    </Text>
                  </View>

                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center border-2 ${isSelected
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-slate-50 border-slate-200"
                      }`}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          <View className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-6 flex-row gap-4 pb-10">
            <Pressable
              onPress={onCancel}
              className="flex-1 bg-slate-50 border border-slate-200 py-4 rounded-[24px] items-center justify-center"
            >
              <Text className="text-slate-600 font-bold text-base">Cancel</Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              className="flex-1 bg-emerald-600 border border-emerald-500 py-4 rounded-[24px] items-center justify-center"
            >
              <Text className="text-white font-bold text-base">Save Selection</Text>
            </Pressable>
          </View>

          <FeedbackToast
            visible={showSavedToast}
            icon="checkmark-circle"
            text="Selection saved successfully"
            onHide={() => { }}
          />
        </SafeAreaView>
      </SafeAreaProvider>

    </Modal>
  );
};