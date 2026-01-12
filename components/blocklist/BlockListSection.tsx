import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  title: string;
  count: number;
  total?: number;
  onAddRemove: () => void;
  children: React.ReactNode;
}

export const BlockListSection = ({
  title,
  count,
  total,
  onAddRemove,
  children,
}: Props) => (
  <View>
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-zinc-400">
        {title} · {count}
        {total ? `/${total} apps` : ""}
      </Text>
      <Pressable onPress={onAddRemove}>
        <Text className="text-blue-500">Add / Remove</Text>
      </Pressable>
    </View>
    <View className="bg-zinc-800 rounded-xl p-4 gap-4">{children}</View>
  </View>
);
