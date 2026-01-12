import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    setShowSavedToast(true);
    setTimeout(() => {
      onSave(selected);
      setShowSavedToast(false);
    }, 1000); // Show toast for 1 sec then save and close
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-row justify-between items-center p-4 border-b border-zinc-800">
          <Pressable onPress={onCancel}>
            <Text className="text-blue-500 text-base">Cancel</Text>
          </Pressable>
          <Text className="text-white font-bold text-lg">
            Choose Activities
          </Text>
          <Pressable onPress={handleSave}>
            <Text className="text-blue-500 text-base font-bold">Save</Text>
          </Pressable>
        </View>

        {/* Search Bar Placeholder */}
        <View className="p-4">
          <View className="bg-zinc-800 rounded-lg h-10" />
        </View>

        <ScrollView className="px-4">
          <Text className="text-zinc-500 uppercase text-xs mb-2">
            Select up to 49 Apps
          </Text>
          {APP_CATEGORIES.map((category) => {
            const isSelected = selected.includes(category.id);
            return (
              <View
                key={category.id}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center gap-4">
                  <Pressable
                    onPress={() => toggleSelection(category.id)}
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? "bg-blue-500 border-blue-500" : "border-zinc-600"}`}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </Pressable>
                  <Ionicons
                    name={category.icon}
                    size={24}
                    color={category.iconColor}
                  />
                  <Text className="text-white text-base">{category.name}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </View>
            );
          })}
        </ScrollView> 
        <FeedbackToast
          visible={showSavedToast}
          icon="checkmark-circle-outline"
          text="Saved!"
          onHide={() => {}}
        />
      </SafeAreaView>
    </Modal>
  );
};
