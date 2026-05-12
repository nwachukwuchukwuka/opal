import { categories, Category } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChooseActivitiesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "social",
  ]);
  const [allSelected, setAllSelected] = useState(false);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        setSelectedApps(
          selectedApps.filter(
            (appId) => !category.apps.some((app) => app.id === appId)
          )
        );
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        const newAppIds = category.apps.map((app) => app.id);
        setSelectedApps([...new Set([...selectedApps, ...newAppIds])]);
      }
    }
  };

  const toggleApp = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter((id) => id !== appId));
    } else {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const toggleExpanded = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedCategories([]);
      setSelectedApps([]);
    } else {
      setAllSelected(true);
      setSelectedCategories(categories.map((c) => c.id));
      setSelectedApps(categories.flatMap((c) => c.apps.map((a) => a.id)));
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleDone = () => {
    router.push("/onboarding/notifications");
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      apps: category.apps.filter((app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        searchQuery === "" ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.apps.length > 0
    );

  const getSelectedCount = (category: Category) => {
    const selectedAppCount = category.apps.filter((app) =>
      selectedApps.includes(app.id)
    ).length;
    return selectedAppCount > 0 ? `${selectedAppCount}` : "";
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">

      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-slate-100">
        <Pressable onPress={handleCancel} className="py-2 px-4">
          <Text className="text-slate-400 text-base font-bold">Cancel</Text>
        </Pressable>
        <Text className="text-slate-900 text-lg font-bold">
          Choose Activities
        </Text>
        <Pressable onPress={handleDone} className="bg-emerald-600 py-2 px-6 rounded-full">
          <Text className="text-white text-base font-bold">Done</Text>
        </Pressable>
      </View>

      {/* Search Bar Bento */}
      <View className="px-8 py-6">
        <View className="bg-white rounded-[24px] px-5 py-4 flex-row items-center border border-slate-100 shadow-sm shadow-slate-200/50">
          <Ionicons
            name="search"
            size={20}
            color="#94a3b8"
            style={{ marginRight: 12 }}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search apps or categories"
            placeholderTextColor="#94a3b8"
            className="flex-1 text-slate-900 text-lg font-medium"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")} className="ml-2">
              <View className="w-6 h-6 bg-slate-100 rounded-full items-center justify-center">
                <Ionicons name="close" size={16} color="#64748b" />
              </View>
            </Pressable>
          )}
        </View>
      </View>

      {/* Categories List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 40 }}
      >
        {/* All Apps & Categories Module */}
        <Pressable
          onPress={toggleAll}
          className="flex-row items-center bg-white p-5 rounded-[24px] border border-slate-100 mb-6 active:scale-[0.98] transition-transform"
        >
          <View
            className={`w-8 h-8 rounded-full border-2 items-center justify-center mr-4 ${allSelected ? "bg-emerald-600 border-emerald-600" : "border-slate-200"
              }`}
          >
            {allSelected && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          <View className="w-10 h-10 bg-slate-50 rounded-xl items-center justify-center mr-4">
            <Ionicons name="apps" size={20} color="#64748b" />
          </View>
          <Text className="text-slate-900 text-lg font-bold flex-1">
            All apps & categories
          </Text>
        </Pressable>

        <Text className="text-slate-400 text-sm font-bold mb-4 ml-2 uppercase">Categories</Text>

        {/* Category items */}
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const isSelected = selectedCategories.includes(category.id);
          const selectedCount = getSelectedCount(category);

          return (
            <View key={category.id} className="mb-4">
              {/* Category Card */}
              <View className={`bg-white rounded-[24px] border border-slate-100 overflow-hidden ${isExpanded ? 'border-emerald-100' : ''}`}>
                <View className="flex-row items-center">
                  <Pressable
                    onPress={() => toggleCategory(category.id)}
                    className="flex-row items-center flex-1 p-5"
                  >
                    <View
                      className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-4 ${isSelected
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-slate-200"
                        }`}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={14} color="white" />
                      )}
                    </View>
                    <View
                      className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <Text className="text-xl">{category.icon}</Text>
                    </View>
                    <Text className="text-slate-900 text-lg font-bold flex-1">
                      {category.name}
                    </Text>
                    {selectedCount && !isExpanded && (
                      <View className="bg-emerald-50 px-3 py-1 rounded-full mr-2">
                        <Text className="text-emerald-600 text-xs font-bold">
                          {selectedCount}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                  {category.apps.length > 0 && (
                    <Pressable
                      onPress={() => toggleExpanded(category.id)}
                      className="p-5"
                    >
                      <Ionicons
                        name={isExpanded ? "chevron-down" : "chevron-forward"}
                        size={20}
                        color="#cbd5e1"
                      />
                    </Pressable>
                  )}
                </View>

                {/* Apps within category */}
                {isExpanded && (
                  <View className="bg-slate-50/50 pt-2 pb-4">
                    {category.apps.map((app) => {
                      const isAppSelected = selectedApps.includes(app.id);
                      return (
                        <Pressable
                          key={app.id}
                          onPress={() => toggleApp(app.id)}
                          className="flex-row items-center py-4 px-14 border-t border-slate-100"
                        >
                          <View
                            className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${isAppSelected
                              ? "bg-emerald-600 border-emerald-600"
                              : "border-slate-200"
                              }`}
                          >
                            {isAppSelected && (
                              <Ionicons name="checkmark" size={12} color="white" />
                            )}
                          </View>
                          <View
                            className="w-10 h-10 rounded-xl items-center justify-center mr-4 bg-white border border-slate-100"
                          >
                            <Text className="text-lg">{app.icon}</Text>
                          </View>
                          <Text className="text-slate-700 text-base font-bold">{app.name}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
