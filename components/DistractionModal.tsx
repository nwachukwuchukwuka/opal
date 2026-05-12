import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useState } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { DISTRACTION_LEVELS } from "../constants";
import { HomeAppUsageItem } from "../types";

interface DistractionModalProps {
  visible: boolean;
  app: HomeAppUsageItem | null;
  onSave: (appId: string, newLevelValue: number) => void;
  onClose: () => void;
}

interface DistractionSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  levels: typeof DISTRACTION_LEVELS;
}

const THUMB_SIZE = 36;
const TRACK_HEIGHT = 12;
const DOT_SIZE = 16;

const DistractionSlider = ({
  value,
  onValueChange,
  levels,
}: DistractionSliderProps) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const numSteps = levels.length - 1;

  const currentColor = useMemo(() => {
    const level = levels.find((l) => l.value === Math.round(value));
    return level?.color || levels[0].color;
  }, [value, levels]);

  const gradientColors = useMemo(
    () => levels.map((level) => level.color) as [string, string, ...string[]],
    [levels]
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  const calculateValueFromX = (pageX: number, containerX: number) => {
    const x = pageX - containerX;
    const clampedX = Math.max(0, Math.min(sliderWidth, x));
    const stepWidth = sliderWidth / numSteps;
    const newValue = Math.round(clampedX / stepWidth);
    return Math.max(0, Math.min(numSteps, newValue));
  };

  const [containerX, setContainerX] = useState(0);

  const handleTouchStart = (e: GestureResponderEvent) => {
    e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
      setContainerX(pageX);
      const newValue = calculateValueFromX(e.nativeEvent.pageX, pageX);
      onValueChange(newValue);
    });
  };

  const handleTouchMove = (e: GestureResponderEvent) => {
    if (containerX > 0 && sliderWidth > 0) {
      const newValue = calculateValueFromX(e.nativeEvent.pageX, containerX);
      onValueChange(newValue);
    }
  };

  const getThumbLeft = () => {
    if (sliderWidth === 0) return 0;
    const usableWidth = sliderWidth - THUMB_SIZE;
    return (value / numSteps) * usableWidth;
  };

  const getDotLeft = (index: number) => {
    if (sliderWidth === 0) return 0;
    const usableWidth = sliderWidth - THUMB_SIZE;
    const position = (index / numSteps) * usableWidth;
    return position + THUMB_SIZE / 2 - DOT_SIZE / 2;
  };

  return (
    <View className="my-10 px-2">
      <View
        className="h-14 justify-center"
        onLayout={handleLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
      >
        <View
          className="absolute"
          style={{
            left: THUMB_SIZE / 2,
            right: THUMB_SIZE / 2,
            height: TRACK_HEIGHT,
            borderRadius: TRACK_HEIGHT / 2,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#e2e8f0", // Slate 200
          }}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        {levels.map((level, index) => {
          const isActive = index <= value;
          return (
            <View
              key={level.value}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                left: getDotLeft(index),
                backgroundColor: isActive ? level.color : "#cbd5e1", // Slate 300
              }}
            />
          );
        })}

        <View
          className="absolute rounded-full border-[4px] border-white"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            left: getThumbLeft(),
            backgroundColor: currentColor,
          }}
          pointerEvents="none"
        />
      </View>
    </View>
  );
};

const DistractionModal = ({
  visible,
  app,
  onSave,
  onClose,
}: DistractionModalProps) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (app) {
      setCurrentValue(app.distractionLevelValue);
    }
  }, [app]);

  const activeLevel = useMemo(
    () =>
      DISTRACTION_LEVELS.find(
        (level) => level.value === Math.round(currentValue)
      ) || DISTRACTION_LEVELS[0],
    [currentValue]
  );

  const handleSave = () => {
    if (app) {
      onSave(app.id, Math.round(currentValue));
    }
    onClose();
  };

  if (!app) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 justify-center items-center bg-slate-900/40 pb-10 px-5"
      >
        <Pressable className="bg-white border-2 border-slate-100 rounded-[40px] p-6 w-full">

          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center gap-3">
              <View className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-[20px] items-center justify-center">
                <Ionicons name="apps" size={28} color="#0f172a" />
              </View>
              <Text className="text-slate-900 text-2xl font-extrabold">
                {app.name}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-[16px] items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </Pressable>
          </View>

          <View className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 mb-6 h-48 justify-center">
            <Text className="text-slate-900 text-xl font-bold mb-3 text-center">
              How distracting is this app?
            </Text>
            <Text className="text-slate-500 text-base leading-6 text-center font-medium">
              {activeLevel.description.split(activeLevel.label)[0]}
              <Text style={{ color: activeLevel.color, fontWeight: "bold" }}>
                {activeLevel.label}
              </Text>
              {activeLevel.description.split(activeLevel.label)[1]}
            </Text>

            {activeLevel.id === "neutral" && (
              <View className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex-row items-center justify-center mt-4">
                <Feather name="info" size={16} color="#059669" />
                <Text className="text-emerald-700 font-bold ml-2 text-xs">
                  Not counted towards your screen time
                </Text>
              </View>
            )}
          </View>

          <DistractionSlider
            value={currentValue}
            onValueChange={setCurrentValue}
            levels={DISTRACTION_LEVELS}
          />

          <View className="flex-row gap-4 mt-4">
            <Pressable
              onPress={onClose}
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-[24px] py-4 items-center justify-center"
            >
              <Text className="text-slate-600 text-base font-bold">
                Learn More
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              className="flex-1 bg-emerald-600 border border-emerald-500 rounded-[24px] py-4 items-center justify-center"
            >
              <Text className="text-white text-base font-bold">
                Save
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DistractionModal;