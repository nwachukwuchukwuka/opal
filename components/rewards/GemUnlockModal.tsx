import { RewardItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface GemUnlockModalProps {
  visible: boolean;
  onClose: () => void;
  item: RewardItem | null;
}

export const GemUnlockModal = ({
  visible,
  onClose,
  item,
}: GemUnlockModalProps) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true} 
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center px-6">
        
        <View className="bg-[#121214] w-full rounded-[32px] border border-zinc-800 overflow-hidden relative py-10">
          
          <View className="flex-row justify-between items-center px-6 absolute top-4 left-0 right-0 z-10">
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center bg-zinc-800/50 rounded-full"
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onClose}>
              <Text className="text-zinc-500 font-bold text-[10px] tracking-widest">
                SKIP
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-center justify-center pt-8">
            <Text className="text-white text-2xl font-bold mb-8 font-sans">
              Gem Unlocked
            </Text>

            <View className="items-center justify-center mb-8 relative">
              <View className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
                }}
                className="w-48 h-48 rounded-2xl z-10"
                style={{ resizeMode: "contain" }}
              />
              
              <View className="w-32 h-4 bg-black/50 blur-xl mt-2 rounded-[100%]" />
            </View>

            <Text className="text-zinc-500 text-[10px] font-bold tracking-widest mt-4 uppercase">
              Tap to reveal your gem
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};