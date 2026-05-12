import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import {
  COLORS,
  DETAILED_CHART_DATA,
  INITIAL_CHART_DATA,
} from "../../constants";
import { HomeAppUsageItem } from "../../types";
import { AppUsageRow } from "./AppUsageRow";

interface StatsDashboardProps {
  showDetailedStats: boolean;
  appUsageData: HomeAppUsageItem[];
  onAppPress: (app: HomeAppUsageItem) => void;
}

export const StatsDashboard = ({
  showDetailedStats,
  appUsageData,
  onAppPress,
}: StatsDashboardProps) => {
  return (
    <View className="px-6">
      {/* Radical Bento Hero - Flat Border Style */}
      <View className="bg-white rounded-[44px] p-8 border border-slate-200 mb-8 items-center overflow-hidden">
        {/* Ambient background decoration */}
        <View className="absolute top-[-40] left-[-40] w-64 h-64 bg-emerald-50 rounded-full" />
        
        <View className="w-24 h-24 bg-emerald-50 rounded-[32px] items-center justify-center mb-6 border border-emerald-100">
          <Ionicons
            name="diamond"
            size={48}
            color={showDetailedStats ? "#06b6d4" : "#059669"}
          />
        </View>

        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-[2px] mb-2">
          Daily screen time
        </Text>
        <Text className="text-slate-900 text-5xl font-bold tracking-tighter">
          {showDetailedStats ? "3h 37m" : "9m 45s"}
        </Text>
        
        <View className="flex-row items-center mt-6 gap-2">
           <View className="w-2 h-2 bg-emerald-500 rounded-full" />
           <Text className="text-emerald-600 font-bold text-sm">
             {showDetailedStats ? "80% focus score" : "99% focus score"}
           </Text>
        </View>
      </View>

      {/* Bento Grid Stats - Flat Border Style */}
      <View className="flex-row gap-4 mb-8">
        <View className="flex-1 bg-white rounded-[32px] p-6 border border-slate-200">
          <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Pickups</Text>
          <View className="flex-row items-end">
            <Text className="text-slate-900 text-3xl font-bold">{showDetailedStats ? "3" : "0"}</Text>
            <Text className="text-slate-400 text-xs font-bold mb-1 ml-1">Today</Text>
          </View>
        </View>
        <View className="flex-1 bg-white rounded-[32px] p-6 border border-slate-200">
          <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Most used</Text>
          <View className="flex-row items-center gap-2">
            <View className="w-7 h-7 rounded-xl bg-slate-100 items-center justify-center border border-slate-200/50">
              <Ionicons name="logo-apple" size={16} color="#334155" />
            </View>
            <View className="w-7 h-7 rounded-xl bg-slate-50 items-center justify-center border border-slate-200">
              <FontAwesome5 name="twitter" size={14} color="#334155" />
            </View>
          </View>
        </View>
      </View>

      {/* Modernized Distribution Waveform - Radical New Chart Type */}
      <View className="bg-white rounded-[32px] p-6 border border-slate-200 mb-8">
        <View className="flex-row justify-between items-center mb-8">
           <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Usage distribution</Text>
           <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
              <Text className="text-slate-600 text-[9px] font-bold uppercase">Focus wave</Text>
           </View>
        </View>

        <View className="h-32 flex-row items-end justify-between px-1">
          {/* Simulated Waveform / Area Chart using high-density bars */}
          {Array.from({ length: 40 }).map((_, i) => {
            const baseHeight = showDetailedStats 
              ? (Math.sin(i * 0.3) * 30 + 50 + Math.random() * 20) 
              : (Math.cos(i * 0.2) * 20 + 40 + Math.random() * 10);
            
            return (
              <View 
                key={i} 
                className="w-[2px] rounded-full bg-emerald-500/10" 
                style={{ height: '100%', position: 'relative' }}
              >
                <View 
                  className="w-full rounded-full bg-emerald-500/80 absolute bottom-0"
                  style={{ height: `${Math.max(10, baseHeight)}%` }}
                />
              </View>
            );
          })}
        </View>

        <View className="flex-row justify-between mt-6 px-1">
          <Text className="text-slate-400 text-[10px] font-bold">9am</Text>
          <Text className="text-slate-400 text-[10px] font-bold">1pm</Text>
          <Text className="text-slate-400 text-[10px] font-bold">5pm</Text>
          <Text className="text-slate-400 text-[10px] font-bold">9pm</Text>
        </View>
      </View>

      {/* Integrated App List Section - Radical Bento Grid Layout */}
      <View className="mb-10">
        <View className="flex-row justify-between items-center mb-6 px-2">
           <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Detailed breakdown</Text>
           <Ionicons name="filter" size={14} color="#94a3b8" />
        </View>

        {showDetailedStats ? (
          <View className="flex-row flex-wrap justify-between">
            {appUsageData.map((app, index) => (
              <AppUsageRow
                key={app.id}
                app={app}
                isLastItem={index === appUsageData.length - 1}
                onPress={onAppPress} 
              />
            ))}
            <View className="w-full">
              <Text className="text-slate-400 text-[10px] font-bold text-center py-4 uppercase tracking-[2px]">
                Apps with less than 1m usage
              </Text>
            </View>
          </View>
        ) : (
          <View className="bg-white rounded-[40px] p-8 border border-slate-200 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center mr-4 border border-emerald-100">
                <Ionicons name="sparkles" size={24} color="#059669" />
              </View>
              <View>
                <Text className="text-slate-900 font-bold text-lg">Opal baseline</Text>
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Standard tracking</Text>
              </View>
            </View>
            <Text className="text-slate-900 font-bold text-xl">54m 37s</Text>
          </View>
        )}
      </View>
    </View>
  );
};
