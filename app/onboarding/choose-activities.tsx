import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

interface App {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  apps: App[];
}

const categories: Category[] = [
  {
    id: "social",
    name: "Social",
    icon: "👥",
    color: "#FF6B6B",
    apps: [
      { id: "bereal", name: "BeReal", icon: "👁️", color: "#000000", category: "Social" },
      { id: "facetime", name: "FaceTime", icon: "📹", color: "#34C759", category: "Social" },
      { id: "id", name: "ID", icon: "🪪", color: "#007AFF", category: "Social" },
      { id: "instagram", name: "Instagram", icon: "📷", color: "#E4405F", category: "Social" },
      { id: "meet", name: "Meet", icon: "📞", color: "#00897B", category: "Social" },
      { id: "messages", name: "Messages", icon: "💬", color: "#34C759", category: "Social" },
      { id: "numero", name: "Numero", icon: "📱", color: "#FF9500", category: "Social" },
      { id: "telegram", name: "Telegram", icon: "✈️", color: "#0088CC", category: "Social" },
      { id: "threads", name: "Threads", icon: "🧵", color: "#000000", category: "Social" },
      { id: "tiktok", name: "TikTok", icon: "🎵", color: "#000000", category: "Social" },
      { id: "x", name: "X", icon: "𝕏", color: "#000000", category: "Social" },
    ],
  },
  {
    id: "games",
    name: "Games",
    icon: "🎮",
    color: "#FF4757",
    apps: [
      { id: "game1", name: "Game Center", icon: "🎯", color: "#FF4757", category: "Games" },
      { id: "game2", name: "Arcade", icon: "👾", color: "#5352ED", category: "Games" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎬",
    color: "#A55EEA",
    apps: [
      { id: "netflix", name: "Netflix", icon: "🎬", color: "#E50914", category: "Entertainment" },
      { id: "youtube", name: "YouTube", icon: "▶️", color: "#FF0000", category: "Entertainment" },
      { id: "spotify", name: "Spotify", icon: "🎧", color: "#1DB954", category: "Entertainment" },
      { id: "hulu", name: "Hulu", icon: "📺", color: "#1CE783", category: "Entertainment" },
    ],
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: "🎨",
    color: "#FF9F43",
    apps: [
      { id: "camera", name: "Camera", icon: "📸", color: "#3f3f46", category: "Creativity" },
      { id: "clips", name: "Clips", icon: "🎞️", color: "#FF2D55", category: "Creativity" },
      { id: "epoccam", name: "EpocCam", icon: "📷", color: "#007AFF", category: "Creativity" },
      { id: "freeform", name: "Freeform", icon: "✏️", color: "#FF9500", category: "Creativity" },
      { id: "garageband", name: "GarageBand", icon: "🎸", color: "#FF9500", category: "Creativity" },
      { id: "photos", name: "Photos", icon: "🖼️", color: "#FF9500", category: "Creativity" },
      { id: "imovie", name: "iMovie", icon: "🎬", color: "#5856D6", category: "Creativity" },
    ],
  },
  {
    id: "education",
    name: "Education",
    icon: "📚",
    color: "#2ED573",
    apps: [
      { id: "speak", name: "Speak", icon: "🗣️", color: "#FF6B6B", category: "Education" },
    ],
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: "❤️",
    color: "#FF6B81",
    apps: [],
  },
  {
    id: "information",
    name: "Information & Reading",
    icon: "📖",
    color: "#5352ED",
    apps: [],
  },
  {
    id: "productivity",
    name: "Productivity & Finance",
    icon: "💼",
    color: "#1E90FF",
    apps: [],
  },
  {
    id: "shopping",
    name: "Shopping & Food",
    icon: "🛒",
    color: "#FF4757",
    apps: [],
  },
  {
    id: "travel",
    name: "Travel",
    icon: "✈️",
    color: "#00D2D3",
    apps: [],
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "🔧",
    color: "#747D8C",
    apps: [],
  },
  {
    id: "other",
    name: "Other",
    icon: "•••",
    color: "#57606F",
    apps: [],
  },
];

export default function ChooseActivitiesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["social"]);
  const [allSelected, setAllSelected] = useState(false);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      // Also remove all apps from this category
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        setSelectedApps(selectedApps.filter(appId => 
          !category.apps.some(app => app.id === appId)
        ));
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      // Also select all apps from this category
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const newAppIds = category.apps.map(app => app.id);
        setSelectedApps([...new Set([...selectedApps, ...newAppIds])]);
      }
    }
  };

  const toggleApp = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const toggleExpanded = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
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
      setSelectedCategories(categories.map(c => c.id));
      setSelectedApps(categories.flatMap(c => c.apps.map(a => a.id)));
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleDone = () => {
    router.push("/onboarding/notifications");
  };

  // Filter categories and apps based on search
  const filteredCategories = categories.map(category => ({
    ...category,
    apps: category.apps.filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => 
    searchQuery === "" || 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.apps.length > 0
  );

  // Get count of selected items for a category
  const getSelectedCount = (category: Category) => {
    const selectedAppCount = category.apps.filter(app => 
      selectedApps.includes(app.id)
    ).length;
    return selectedAppCount > 0 ? `${selectedAppCount}` : "";
  };

  return (
    <View className="flex-1 bg-zinc-900">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-14 pb-3 border-b border-zinc-800">
        <Pressable onPress={handleCancel}>
          <Text className="text-blue-500 text-base">Cancel</Text>
        </Pressable>
        <Text className="text-white text-base font-semibold">Choose Activities</Text>
        <Pressable onPress={handleDone}>
          <Text className="text-blue-500 text-base font-semibold">Done</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3">
        <View className="bg-zinc-800 rounded-xl px-4 py-2.5 flex-row items-center">
          <Text className="text-zinc-500 mr-2">🔍</Text>
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
                <Text className="text-zinc-300 text-xs">✕</Text>
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
          <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
            allSelected ? "bg-blue-500 border-blue-500" : "border-zinc-600"
          }`}>
            {allSelected && <Text className="text-white text-xs">✓</Text>}
          </View>
          <Text className="text-zinc-400 text-base">📱</Text>
          <Text className="text-white text-base ml-3 flex-1">All Apps & Categories</Text>
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
                  <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                    isSelected ? "bg-blue-500 border-blue-500" : "border-zinc-600"
                  }`}>
                    {isSelected && <Text className="text-white text-xs">✓</Text>}
                  </View>
                  <View 
                    className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                    style={{ backgroundColor: category.color }}
                  >
                    <Text className="text-white text-sm">{category.icon}</Text>
                  </View>
                  <Text className="text-white text-base flex-1">{category.name}</Text>
                  {selectedCount && (
                    <Text className="text-zinc-500 text-sm mr-2">{selectedCount}</Text>
                  )}
                </Pressable>
                {category.apps.length > 0 && (
                  <Pressable 
                    onPress={() => toggleExpanded(category.id)}
                    className="px-4 py-3"
                  >
                    <Text className="text-zinc-500 text-lg">
                      {isExpanded ? "∨" : ">"}
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Apps within category */}
              {isExpanded && category.apps.map((app) => {
                const isAppSelected = selectedApps.includes(app.id);
                return (
                  <Pressable
                    key={app.id}
                    onPress={() => toggleApp(app.id)}
                    className="flex-row items-center px-4 py-2.5 pl-14 border-b border-zinc-800/50"
                  >
                    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                      isAppSelected ? "bg-blue-500 border-blue-500" : "border-zinc-600"
                    }`}>
                      {isAppSelected && <Text className="text-white text-xs">✓</Text>}
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
    </View>
  );
}

