import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { DIFFICULTY_OPTIONS } from "../constants";
import { DifficultyLevel, DifficultySelectorProps } from "../types";

const DifficultySelector = forwardRef<BottomSheetModal, DifficultySelectorProps>(
  ({ selectedDifficulty, onSelect, onClose }, ref) => {
    const snapPoints = useMemo(() => ["60%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ), []
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
        backgroundStyle={{ backgroundColor: "#f8fafc" }} // Slate 50
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }} // Slate 300
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-6 pt-2">

          {/* Redesigned Header */}
          <View className="mb-6">
            <Text className="text-slate-900 text-2xl font-extrabold">
              Session Difficulty
            </Text>
            <Text className="text-slate-500 text-sm font-medium mt-1.5">
              Choose how strictly you want to block apps.
            </Text>
          </View>

          {/* Bento Box Style Options */}
          <View className="gap-4">
            {DIFFICULTY_OPTIONS.map((option) => {
              const isSelected = selectedDifficulty === option.id;

              return (
                <Pressable
                  key={option.id}
                  onPress={() => handleSelect(option.id)}
                  className={`flex-row items-center p-5 rounded-[28px] border-2 ${isSelected
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-white border-slate-100"
                    }`}
                >
                  {/* Redesigned Checkbox / Radio Indicator */}
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center mr-4 ${isSelected
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-slate-50 border-2 border-slate-200"
                      }`}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    )}
                  </View>

                  {/* Content Area */}
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text
                        className={`text-base font-bold ${isSelected ? "text-emerald-950" : "text-slate-900"
                          }`}
                      >
                        {option.name}
                      </Text>

                      {option.showInfo && (
                        <View className="ml-2 bg-slate-100 w-5 h-5 rounded-full items-center justify-center">
                          <Ionicons
                            name="information"
                            size={14}
                            color="#64748b" // Slate 500
                          />
                        </View>
                      )}
                    </View>

                    <Text
                      className={`text-sm font-medium leading-5 mt-0.5 ${isSelected ? "text-emerald-700" : "text-slate-500"
                        }`}
                    >
                      {option.description}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

DifficultySelector.displayName = "DifficultySelector";

export default DifficultySelector;