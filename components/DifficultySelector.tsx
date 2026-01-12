import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, DIFFICULTY_OPTIONS } from "../constants";
import { DifficultyLevel, DifficultySelectorProps } from "../types";

const DifficultySelector = forwardRef<BottomSheetModal, DifficultySelectorProps>(
  ({ selectedDifficulty, onSelect, onClose }, ref) => {
    const snapPoints = useMemo(() => ["45%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    const handleSelect = (difficulty: DifficultyLevel) => {
      onSelect(difficulty);
      onClose();
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#18181b" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
      >
        <BottomSheetView className="flex-1 px-5">
          {/* Title */}
          <Text className="text-white text-xl font-semibold mb-6">
            Session Difficulty
          </Text>

          {/* Options */}
          {DIFFICULTY_OPTIONS.map((option) => {
            const isSelected = selectedDifficulty === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => handleSelect(option.id)}
                className="flex-row items-start py-4 border-b border-zinc-800"
              >
                {/* Radio circle */}
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 mt-0.5 ${
                    isSelected ? "border-blue-500 bg-blue-500" : "border-zinc-600"
                  }`}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color={COLORS.white} />
                  )}
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-white text-base font-medium">
                      {option.name}
                    </Text>
                    {option.showInfo && (
                      <Ionicons
                        name="information-circle-outline"
                        size={18}
                        color={COLORS.zinc500}
                        style={{ marginLeft: 6 }}
                      />
                    )}
                  </View>
                  <Text className="text-zinc-500 text-sm mt-1 leading-5">
                    {option.description}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

DifficultySelector.displayName = "DifficultySelector";

export default DifficultySelector;

