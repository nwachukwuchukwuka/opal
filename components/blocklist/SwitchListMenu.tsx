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
    <Pressable
      onPress={onClose}
      className="flex-1 bg-slate-900/40 justify-end px-5 pb-10"
    >
      <Pressable
        onPress={() => { }}
        className="bg-slate-50 border-2 border-slate-100 rounded-[40px] p-6"
      >

        <View className="mb-6 flex-row justify-between items-center">
          <Text className="text-slate-900 text-2xl font-extrabold">Switch List</Text>
          <Pressable
            onPress={onClose}
            className="w-10 h-10 bg-white rounded-[16px] items-center justify-center border border-slate-200"
          >
            <Ionicons name="close" size={20} color="#64748b" />
          </Pressable>
        </View>

        <View className="mb-8">
          <Text className="text-slate-500 text-sm font-bold mb-3 ml-2">
            Your lists
          </Text>
          <View className="gap-3">
            {blockLists.map((list) => {
              const isActive = list.id === activeListId;
              return (
                <Pressable
                  key={list.id}
                  onPress={() => onSelectList(list.id)}
                  className={`flex-row items-center justify-between p-4 rounded-[28px] border-2 ${isActive
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-white border-slate-100"
                    }`}
                >
                  <View className="flex-row items-center gap-4">
                    <View
                      className={`w-12 h-12 rounded-[20px] items-center justify-center border ${isActive ? "bg-emerald-100 border-emerald-200" : "bg-slate-50 border-slate-100"
                        }`}
                    >
                      <Text className="text-2xl">{list.icon}</Text>
                    </View>
                    <Text
                      className={`text-lg font-bold ${isActive ? "text-emerald-950" : "text-slate-900"
                        }`}
                    >
                      {list.name}
                    </Text>
                  </View>

                  {/* Custom Checkmark Indicator */}
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center border-2 ${isActive
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-slate-50 border-slate-200"
                      }`}
                  >
                    {isActive && (
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text className="text-slate-500 text-sm font-bold mb-3 ml-2">
            Create new
          </Text>
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => onCreateNew("block")}
              className="flex-1 bg-white border-2 border-slate-100 rounded-[28px] p-5 items-center justify-center"
            >
              <View className="w-10 h-10 rounded-[16px] bg-slate-50 items-center justify-center border border-slate-100 mb-3">
                <Ionicons name="shield-half" size={20} color="#0f172a" />
              </View>
              <Text className="text-slate-900 font-bold text-sm">Block list</Text>
            </Pressable>

            <Pressable
              onPress={() => onCreateNew("allow")}
              className="flex-1 bg-white border-2 border-slate-100 rounded-[28px] p-5 items-center justify-center"
            >
              <View className="w-10 h-10 rounded-[16px] bg-emerald-50 items-center justify-center border border-emerald-100 mb-3">
                <Ionicons name="checkmark-circle" size={20} color="#059669" />
              </View>
              <Text className="text-emerald-700 font-bold text-sm">Allow list</Text>
            </Pressable>
          </View>
        </View>

      </Pressable>
    </Pressable>
  </Modal>
);