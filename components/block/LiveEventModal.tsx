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
      <View className="flex-1 bg-slate-50">
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
            className="absolute top-12 left-4 w-10 h-10 bg-white/90 rounded-full items-center justify-center border border-slate-100 shadow-sm"
          >
            <Ionicons name="close" size={24} color="#0f172a" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-5 pt-6">
          {/* Event Title */}
          <Text className="text-slate-900 text-3xl font-extrabold mb-1">
            Live: Cowork with Opal
          </Text>
          
          <Text className="text-slate-500 text-base font-medium mb-6">
            Active since <Text className="text-emerald-600 font-bold">16 March 2023</Text>
          </Text>

          {/* Join Event Button */}
          <Pressable
            onPress={onJoin}
            className="bg-emerald-600 rounded-[24px] py-5 items-center justify-center mb-6 shadow-lg shadow-emerald-900/20"
            style={({ pressed }) => ({
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text className="text-white font-bold text-lg">Join Event</Text>
          </Pressable>

          {/* Message Card */}
          <View className="bg-white rounded-[28px] p-6 mb-8 border border-slate-200 shadow-sm">
            <Text className="text-slate-700 text-base font-medium leading-6">
              Hi gem! I'm Kenneth, Founder and CEO of Opal. Join me and other gems today to block distractions and focus on what matters.
            </Text>
          </View>

          {/* Organizer */}
          <View className="flex-row items-center gap-3 px-2">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
              }}
              className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm"
            />
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-slate-900 font-bold text-lg">Kenneth</Text>
                <View className="bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                  <Text className="text-emerald-700 text-[10px] font-black uppercase tracking-wider">Organizer</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default LiveEventModal;