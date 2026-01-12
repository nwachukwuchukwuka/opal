import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { BlockList } from "../../types";

interface Props {
  visible: boolean;
  activeListId: string;
  blockLists: BlockList[];
  onSelectList: (listId: string) => void;
  onCreateNew: (type: "block" | "allow") => void;
  onClose: () => void;
}

export const SwitchListMenu = ({
  visible,
  activeListId,
  blockLists,
  onSelectList,
  onCreateNew,
  onClose,
}: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <Pressable onPress={onClose} className="flex-1">
      <View className="absolute top-28 right-8 bg-zinc-700 rounded-lg w-56 shadow-lg">
        {blockLists.map((list) => (
          <Pressable
            key={list.id}
            onPress={() => onSelectList(list.id)}
            className="flex-row items-center justify-between p-3 border-b border-zinc-600"
          >
            <Text className="text-white">
              {list.icon} {list.name}
            </Text>
            {list.id === activeListId && (
              <Ionicons name="checkmark" size={20} color="white" />
            )}
          </Pressable>
        ))}
        <Pressable
          onPress={() => onCreateNew("block")}
          className="p-3 border-b border-zinc-600"
        >
          <Text className="text-white">+ New Block List</Text>
        </Pressable>
        <Pressable onPress={() => onCreateNew("allow")} className="p-3">
          <Text className="text-white">+ New Allow List</Text>
        </Pressable>
      </View>
    </Pressable>
  </Modal>
);
