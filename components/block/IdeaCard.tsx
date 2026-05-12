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
    className="bg-white rounded-[28px] p-4 border border-slate-200 flex-row items-center"
  >
    <View className="w-16 h-16 bg-slate-50 rounded-[20px] items-center justify-center border border-slate-200 mr-4">
      <Text className="text-3xl">{idea.icon}</Text>
    </View>

    <View className="flex-1 pr-3">
      <Text className="text-slate-900 font-bold text-lg mb-1.5">
        {idea.name}
      </Text>

      {idea.isLive ? (
        <View className="flex-row items-center gap-2 bg-emerald-50 self-start px-2.5 py-1 rounded-xl border border-emerald-100">
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
          <Text className="text-emerald-800 text-xs font-semibold">
            {idea.schedule}
          </Text>
        </View>
      ) : (
        <Text className="text-slate-500 text-sm font-medium">
          {idea.schedule}
        </Text>
      )}
    </View>

    <View
      className={`px-5 py-2.5 rounded-2xl border ${idea.isLive
        ? "bg-emerald-600 border-emerald-500"
        : "bg-slate-50 border-slate-200"
        }`}
    >
      <Text
        className={`font-bold text-sm ${idea.isLive ? "text-white" : "text-slate-700"
          }`}
      >
        {idea.isLive ? "Join" : "Add"}
      </Text>
    </View>
  </Pressable>
);

export default IdeaCard;