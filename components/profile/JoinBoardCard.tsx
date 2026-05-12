import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

export const JoinBoardCard = () => (
    <View className="bg-white border border-slate-200 rounded-[44px] p-2 mb-2 overflow-hidden">
        <View className="p-7">
            <View className="items-center mb-6">
                <View className="w-16 h-16 bg-emerald-600 rounded-[28px] items-center justify-center mb-4">
                    <Ionicons name="chatbubbles" size={32} color="white" />
                </View>
                <View className="bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                    <Text className="text-slate-900 text-[10px] font-bold">New Community Hub</Text>
                </View>
            </View>

            <View className="items-center mb-8">
                <Text className="text-slate-900 text-2xl font-semibold text-center mb-3">Join Community Board</Text>
                <Text className="text-slate-400 text-sm leading-6 text-center px-4">
                    Chat and read the latest Opal news, ask for new features, learn from each other and share about Focus.
                </Text>
            </View>

            <Pressable
                className="bg-emerald-600 rounded-[28px] py-5 items-center justify-center"
                onPress={() => Linking.openURL('https://community.opal.so')}
            >
                <Text className="text-white font-bold text-base">Discover Board</Text>
            </Pressable>
        </View>
    </View>
);