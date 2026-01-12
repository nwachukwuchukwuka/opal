import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";

interface LiveEventModalProps {
  visible: boolean;
  onJoin: () => void;
  onClose: () => void;
}

export const LiveEventModal = ({
  visible,
  onJoin,
  onClose,
}: LiveEventModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        {/* Header Image */}
        <View className="relative">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
            }}
            className="w-full h-48"
            resizeMode="cover"
          />
          
          {/* Close Button */}
          <Pressable
            onPress={onClose}
            className="absolute top-12 left-4 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
          >
            <Ionicons name="close" size={20} color="white" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-5 pt-6">
          {/* Event Title */}
          <Text className="text-white text-2xl font-bold mb-1">
            Live: Cowork with Opal
          </Text>
          
          {/* Active Since */}
          <Text className="text-zinc-400 text-base mb-6">
            Active since <Text className="text-white font-medium">16 March 2023</Text>
          </Text>

          {/* Join Event Button */}
          <Pressable
            onPress={onJoin}
            className="bg-white rounded-full py-4 items-center justify-center mb-6"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text className="text-black font-bold text-base">Join Event</Text>
          </Pressable>

          {/* Message Card */}
          <View className="bg-zinc-800/80 rounded-2xl p-4 mb-6">
            <Text className="text-zinc-300 text-base leading-6">
              Hi gem! I'm Kenneth, Founder and CEO of Opal. Join me and other gems today to block distractions and focus on what matters.
            </Text>
          </View>

          {/* Organizer */}
          <View className="flex-row items-center gap-3">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
              }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-white font-semibold">kenneth</Text>
                <Text className="text-zinc-500 text-sm">Organizer</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default LiveEventModal;