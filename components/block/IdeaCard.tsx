import React from "react";
import { Pressable, Text, View } from "react-native";
import { BlockIdea } from "../../constants/appData";

interface IdeaCardProps {
  idea: BlockIdea;
  onPress?: () => void;
}

export const IdeaCard = ({ idea, onPress }: IdeaCardProps) => (
  <Pressable
    onPress={onPress}
    className="bg-zinc-800 rounded-2xl p-4 flex-row justify-between items-center"
  >
    <View className="flex-row items-center gap-4 flex-1">
      <Text className="text-3xl">{idea.icon}</Text>
      <View className="flex-1">
        <Text className="text-white font-semibold text-base">{idea.name}</Text>
        {idea.isLive ? (
          <View className="flex-row items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-emerald-400" />
            <Text className="text-emerald-400 text-xs">{idea.schedule}</Text>
          </View>
        ) : (
          <Text className="text-zinc-400 text-xs">{idea.schedule}</Text>
        )}
      </View>
    </View>
    <Pressable
      onPress={onPress}
      className="rounded-full px-4 py-1.5 bg-zinc-700"
    >
      <Text className="text-white font-semibold text-sm">
        {idea.isLive ? "Join" : "+ Add"}
      </Text>
    </Pressable>
  </Pressable>
);

export default IdeaCard;