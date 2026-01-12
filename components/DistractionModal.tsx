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

// Custom Distraction Slider Component
interface DistractionSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  levels: typeof DISTRACTION_LEVELS;
}

const THUMB_SIZE = 32;
const TRACK_HEIGHT = 8;
const DOT_SIZE = 12;

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

  // Calculate thumb position - account for thumb size so it stays within bounds
  const getThumbLeft = () => {
    if (sliderWidth === 0) return 0;
    const usableWidth = sliderWidth - THUMB_SIZE;
    return (value / numSteps) * usableWidth;
  };

  // Calculate dot positions to align with thumb center positions
  const getDotLeft = (index: number) => {
    if (sliderWidth === 0) return 0;
    const usableWidth = sliderWidth - THUMB_SIZE;
    const position = (index / numSteps) * usableWidth;
    return position + THUMB_SIZE / 2 - DOT_SIZE / 2;
  };

  return (
    <View className="my-8">
      <View
        className="h-12 justify-center"
        onLayout={handleLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
      >
        {/* Gradient Track */}
        <View
          className="absolute"
          style={{
            left: THUMB_SIZE / 2,
            right: THUMB_SIZE / 2,
            height: TRACK_HEIGHT,
            borderRadius: TRACK_HEIGHT / 2,
            overflow: "hidden",
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

        {/* Step Dots */}
        {levels.map((level, index) => {
          const isActive = index <= value;
          return (
            <View
              key={level.value}
              className="absolute rounded-full"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                left: getDotLeft(index),
                backgroundColor: isActive ? level.color : "#52525b",
              }}
            />
          );
        })}

        {/* Thumb */}
        <View
          className="absolute rounded-full"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            left: getThumbLeft(),
            backgroundColor: currentColor,
            shadowColor: currentColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.7,
            shadowRadius: 10,
            elevation: 8,
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
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        className="flex-1 justify-center items-center bg-black/70"
      >
        {/* Modal Content Card */}
        <Pressable
          className="bg-zinc-800 rounded-3xl p-6 h-[60%] w-[90%]"
          // style={{ height: 420 }}
        >
          {/* App Header */}
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-zinc-700 rounded-xl items-center justify-center mr-4">
              <Ionicons name="apps" size={24} color="white" />
            </View>
            <Text className="text-white text-2xl font-bold">{app.name}</Text>
          </View>

          {/* Title and Dynamic Description */}
          <View className="h-40">
            <Text className="text-white text-2xl font-bold mb-2">
              How distracting is this app?
            </Text>
            <Text className="text-zinc-400 text-base leading-6">
              {activeLevel.description.split(activeLevel.label)[0]}
              <Text style={{ color: activeLevel.color, fontWeight: "bold" }}>
                {activeLevel.label}
              </Text>
              {activeLevel.description.split(activeLevel.label)[1]}
            </Text>

            {activeLevel.id === "neutral" && (
              <View className="bg-zinc-700/50 rounded-lg p-3 flex-row items-center mt-4">
                <Feather name="info" size={16} color="#67e8f9" />
                <Text className="text-cyan-300 ml-2">
                  Not counted towards your screen time
                </Text>
              </View>
            )}
          </View>
          {/* Custom Slider */}
          <DistractionSlider
            value={currentValue}
            onValueChange={setCurrentValue}
            levels={DISTRACTION_LEVELS}
          />

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleSave}
              className="bg-white rounded-full py-4 items-center justify-center"
            >
              <Text className="text-black text-lg font-bold">Save</Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              className="bg-zinc-700/50 rounded-full py-4 items-center justify-center"
            >
              <Text className="text-white text-lg font-semibold">
                Learn More
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DistractionModal;
