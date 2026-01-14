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
    <SafeAreaView edges={["top"]} className="flex-1 bg-zinc-900">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pb-3 border-b border-zinc-800">
        <Pressable onPress={handleCancel}>
          <Text className="text-blue-500 text-base">Cancel</Text>
        </Pressable>
        <Text className="text-white text-base font-semibold">
          Choose Activities
        </Text>
        <Pressable onPress={handleDone}>
          <Text className="text-blue-500 text-base font-semibold">Done</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3">
        <View className="bg-zinc-800 rounded-xl px-4 py-2.5 flex-row items-center">
          <Ionicons
            name="search"
            size={18}
            color="#71717a"
            style={{ marginRight: 8 }}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor="#71717a"
            className="flex-1 text-white text-base"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <View className="w-5 h-5 bg-zinc-600 rounded-full items-center justify-center">
                <Ionicons name="close" size={18} color="#71717a" />
              </View>
            </Pressable>
          )}
        </View>
      </View>

      {/* Categories List */}
      <ScrollView className="flex-1">
        {/* All Apps & Categories */}
        <Pressable
          onPress={toggleAll}
          className="flex-row items-center px-4 py-3 border-b border-zinc-800"
        >
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
              allSelected ? "bg-blue-500 border-blue-500" : "border-zinc-600"
            }`}
          >
            {allSelected && (
              <Ionicons name="checkmark" size={14} color="white" />
            )}
          </View>
          <Ionicons name="apps" size={18} color="#a1a1aa" />
          <Text className="text-white text-base ml-3 flex-1">
            All Apps & Categories
          </Text>
        </Pressable>

        {/* Category items */}
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const isSelected = selectedCategories.includes(category.id);
          const selectedCount = getSelectedCount(category);

          return (
            <View key={category.id}>
              {/* Category row */}
              <View className="flex-row items-center border-b border-zinc-800">
                <Pressable
                  onPress={() => toggleCategory(category.id)}
                  className="flex-row items-center flex-1 px-4 py-3"
                >
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                      isSelected
                        ? "bg-blue-500 border-blue-500"
                        : "border-zinc-600"
                    }`}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                  <View
                    className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                    style={{ backgroundColor: category.color }}
                  >
                    <Text className="text-white text-sm">{category.icon}</Text>
                  </View>
                  <Text className="text-white text-base flex-1">
                    {category.name}
                  </Text>
                  {selectedCount && (
                    <Text className="text-zinc-500 text-sm mr-2">
                      {selectedCount}
                    </Text>
                  )}
                </Pressable>
                {category.apps.length > 0 && (
                  <Pressable
                    onPress={() => toggleExpanded(category.id)}
                    className="px-4 py-3"
                  >
                    <Text className="text-zinc-500 text-lg">
                      {isExpanded ? (
                        <Ionicons
                          name="chevron-down"
                          size={18}
                          color="#71717a"
                        />
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color="#71717a"
                        />
                      )}
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Apps within category */}
              {isExpanded &&
                category.apps.map((app) => {
                  const isAppSelected = selectedApps.includes(app.id);
                  return (
                    <Pressable
                      key={app.id}
                      onPress={() => toggleApp(app.id)}
                      className="flex-row items-center px-4 py-2.5 pl-14 border-b border-zinc-800/50"
                    >
                      <View
                        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                          isAppSelected
                            ? "bg-blue-500 border-blue-500"
                            : "border-zinc-600"
                        }`}
                      >
                        {isAppSelected && (
                          <Text className="text-white text-xs">✓</Text>
                        )}
                      </View>
                      <View
                        className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                        style={{ backgroundColor: app.color }}
                      >
                        <Text className="text-white text-sm">{app.icon}</Text>
                      </View>
                      <Text className="text-white text-base">{app.name}</Text>
                    </Pressable>
                  );
                })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
