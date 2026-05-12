

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import WorkTimeModal from "../WorkTimeModal/index.tsx";

export const SessionInfoCard = () => {
  const [workTimeModalVisible, setWorkTimeModalVisible] = useState(false);
  const remainingTime = "0:42:29";
  const progress = 35;

  return (
    <>
      <View className="bg-white rounded-[32px] border border-slate-200 shadow-sm shadow-slate-900/5 overflow-hidden">
        <Pressable
          onPress={() => setWorkTimeModalVisible(true)}
          className="p-5"
        >
          <View className="flex-row items-center justify-between mb-4">

            <View className="flex-row items-center flex-1 gap-4">
              <View className="w-12 h-12 bg-emerald-50 rounded-[20px] items-center justify-center border border-emerald-100">
                <Ionicons name="briefcase" size={20} color="#059669" />
              </View>

              <View className="flex-1">
                <Text className="text-slate-900 text-lg font-extrabold mb-1">
                  Work Time
                </Text>

                {/* Custom separator dots and layout for metadata */}
                <View className="flex-row items-center">
                  <Text className="text-slate-500 text-xs font-bold">Session</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-slate-200 mx-2" />

                  <Ionicons name="time" size={12} color="#94a3b8" />
                  <Text className="text-slate-500 text-xs font-bold ml-1">3</Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-slate-200 mx-2" />

                  <Text className="text-emerald-600 text-xs font-bold">
                    {remainingTime} left
                  </Text>
                </View>
              </View>
            </View>

            {/* Floating Action Chevron */}
            <View className="w-10 h-10 bg-slate-50 rounded-[16px] items-center justify-center border border-slate-100">
              <Ionicons name="chevron-up" size={20} color="#64748b" />
            </View>
          </View>

          <View className="h-2.5 bg-emerald-50 rounded-full overflow-hidden w-full">
            <View
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </Pressable>
      </View>

      <WorkTimeModal
        visible={workTimeModalVisible}
        onClose={() => setWorkTimeModalVisible(false)}
        sessionName="Work Time"
      />
    </>
  );
};