import { BlockList, RewardItem, ShareOption } from "@/types";
import { COLORS } from "./colors";

// Types
export interface AppUsage {
  id: string;
  name: string;
  icon: string;
  iconFamily:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "FontAwesome5"
    | "Feather"
    | "MaterialIcons";
  time: string;
  color: string;
  tag?: string;
  tagColor?: string;
  percentage: number;
  border?: boolean;
}

export interface ChartDataPoint {
  hour: string;
  value: number;
}

export interface ActiveSession {
  id: string;
  name: string;
  icon: string;
  iconFamily:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "FontAwesome5"
    | "Feather"
    | "MaterialIcons";
  time?: string;
  active: boolean;
}

export interface BlockSession {
  id: string;
  name: string;
  icon: string;
  iconFamily:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "FontAwesome5"
    | "Feather"
    | "MaterialIcons";
  isActive: boolean;
  remainingTime?: string;
  schedule: string;
  apps: string[];
  blockedApps: number;
  difficulty: string;
}

export interface AppCategory {
  id: string;
  name: string;
  icon: string;
  iconFamily:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "FontAwesome5"
    | "Feather"
    | "MaterialIcons";
  color: string;
  count: number;
}

export interface Milestone {
  id: number;
  name: string;
  icon: string;
  iconFamily:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "FontAwesome5"
    | "Feather"
    | "MaterialIcons";
  completed: boolean;
}

export interface SettingOption {
  id: string;
  label: string;
  icon: string;
  iconFamily:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "FontAwesome5"
    | "Feather"
    | "MaterialIcons";
}

// Home Screen Data
export const APP_USAGE_DATA: AppUsage[] = [
  {
    id: "offline",
    name: "Time Offline",
    icon: "cloud-outline",
    iconFamily: "Ionicons",
    time: "10h 38m",
    color: COLORS.success,
    percentage: 62,
  },
  {
    id: "opal",
    name: "Opal",
    icon: "diamond-outline",
    iconFamily: "Ionicons",
    time: "2h 28m",
    color: COLORS.primary,
    tag: "Focused",
    percentage: 15,
  },
  {
    id: "x",
    name: "X",
    icon: "twitter",
    iconFamily: "FontAwesome5",
    time: "1h 22m",
    color: COLORS.twitter,
    tag: "Distracting",
    tagColor: COLORS.danger,
    percentage: 8,
    border: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    iconFamily: "FontAwesome5",
    time: "57m 52s",
    color: COLORS.instagram,
    tag: "Distracting",
    tagColor: COLORS.danger,
    percentage: 6,
  },
  {
    id: "etsy",
    name: "Etsy",
    icon: "etsy",
    iconFamily: "FontAwesome5",
    time: "56m 34s",
    color: COLORS.etsy,
    tag: "Distracting",
    tagColor: COLORS.danger,
    percentage: 5,
  },
  {
    id: "settings",
    name: "Settings",
    icon: "settings-outline",
    iconFamily: "Ionicons",
    time: "25m 8s",
    color: COLORS.settings,
    tag: "Neutral",
    percentage: 2,
  },
  {
    id: "creme",
    name: "CREME",
    icon: "square",
    iconFamily: "Feather",
    time: "16m 46s",
    color: COLORS.black,
    tag: "Productive",
    tagColor: COLORS.success,
    percentage: 1,
    border: true,
  },
  {
    id: "messages",
    name: "Messages",
    icon: "chatbubble-outline",
    iconFamily: "Ionicons",
    time: "4m 5s",
    color: COLORS.messages,
    tag: "Distracting",
    tagColor: COLORS.danger,
    percentage: 1,
  },
  {
    id: "other",
    name: "Other",
    icon: "ellipsis-horizontal",
    iconFamily: "Ionicons",
    time: "2s",
    color: COLORS.zinc600,
    percentage: 0,
  },
];

export const CHART_DATA: ChartDataPoint[] = [
  { hour: "12AM", value: 10 },
  { hour: "4AM", value: 5 },
  { hour: "8AM", value: 45 },
  { hour: "12PM", value: 70 },
  { hour: "4PM", value: 85 },
  { hour: "8PM", value: 60 },
];

export const ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: "opal",
    name: "Opal",
    icon: "diamond-outline",
    iconFamily: "Ionicons",
    time: "64m 37s",
    active: false,
  },
  {
    id: "work",
    name: "Work Time",
    icon: "briefcase-outline",
    iconFamily: "Ionicons",
    time: "",
    active: true,
  },
];

// Blocks Screen Data
export const BLOCK_SESSIONS: BlockSession[] = [
  {
    id: "work",
    name: "Work Time",
    icon: "briefcase-outline",
    iconFamily: "Ionicons",
    isActive: true,
    remainingTime: "02:49:36",
    schedule: "9:00AM - 5:00PM",
    apps: ["Instagram", "TikTok", "Twitter"],
    blockedApps: 12,
    difficulty: "Normal",
  },
  {
    id: "sleep",
    name: "Sleep Time",
    icon: "moon-outline",
    iconFamily: "Ionicons",
    isActive: false,
    schedule: "10:00PM - 7:00AM",
    apps: ["All Apps"],
    blockedApps: 45,
    difficulty: "Strict",
  },
  {
    id: "focus",
    name: "Focus Session",
    icon: "flag-outline",
    iconFamily: "Ionicons",
    isActive: false,
    schedule: "On Demand",
    apps: ["Social Media"],
    blockedApps: 8,
    difficulty: "Normal",
  },
];

export const APP_CATEGORIES: AppCategory[] = [
  {
    id: "social",
    name: "Social",
    icon: "people-outline",
    iconFamily: "Ionicons",
    color: COLORS.social,
    count: 12,
  },
  {
    id: "games",
    name: "Games",
    icon: "game-controller-outline",
    iconFamily: "Ionicons",
    color: COLORS.games,
    count: 8,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "film-outline",
    iconFamily: "Ionicons",
    color: COLORS.entertainment,
    count: 6,
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "briefcase-outline",
    iconFamily: "Ionicons",
    color: COLORS.productivity,
    count: 15,
  },
];

// Profile Screen Data
export const USER_DATA = {
  gemName: "Sapphire",
  email: "user@example.com",
  memberSince: "January 2024",
  streak: 15,
  totalTimeSaved: "48h 32m",
  focusScore: 85,
  gems: 3,
};

export const MILESTONES: Milestone[] = [
  {
    id: 1,
    name: "First Gem",
    icon: "diamond-outline",
    iconFamily: "Ionicons",
    completed: true,
  },
  {
    id: 2,
    name: "7 Day Streak",
    icon: "flame-outline",
    iconFamily: "Ionicons",
    completed: true,
  },
  {
    id: 3,
    name: "Focus Master",
    icon: "flag-outline",
    iconFamily: "Ionicons",
    completed: true,
  },
  {
    id: 4,
    name: "Social Detox",
    icon: "phone-portrait-outline",
    iconFamily: "Ionicons",
    completed: false,
  },
  {
    id: 5,
    name: "30 Day Streak",
    icon: "flash-outline",
    iconFamily: "Ionicons",
    completed: false,
  },
  {
    id: 6,
    name: "Time Saver",
    icon: "time-outline",
    iconFamily: "Ionicons",
    completed: false,
  },
];

export const SETTINGS_OPTIONS: SettingOption[] = [
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications-outline",
    iconFamily: "Ionicons",
  },
  {
    id: "screentime",
    label: "Screen Time Access",
    icon: "bar-chart-outline",
    iconFamily: "Ionicons",
  },
  {
    id: "family",
    label: "Family Sharing",
    icon: "people-outline",
    iconFamily: "Ionicons",
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: "star-outline",
    iconFamily: "Ionicons",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: "help-circle-outline",
    iconFamily: "Ionicons",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    icon: "lock-closed-outline",
    iconFamily: "Ionicons",
  },
  {
    id: "terms",
    label: "Terms of Service",
    icon: "document-text-outline",
    iconFamily: "Ionicons",
  },
];

// Onboarding apps data
export const ONBOARDING_APPS = [
  {
    id: "safari",
    name: "Safari",
    icon: "compass-outline",
    iconFamily: "Ionicons" as const,
    color: COLORS.safari,
  },
  {
    id: "messages",
    name: "Messages",
    icon: "chatbubble-outline",
    iconFamily: "Ionicons" as const,
    color: COLORS.messages,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "musical-notes-outline",
    iconFamily: "Ionicons" as const,
    color: COLORS.tiktok,
    border: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    iconFamily: "FontAwesome5" as const,
    color: COLORS.instagram,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "spotify",
    iconFamily: "FontAwesome5" as const,
    color: COLORS.spotify,
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "snapchat",
    iconFamily: "FontAwesome5" as const,
    color: COLORS.snapchat,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "youtube",
    iconFamily: "FontAwesome5" as const,
    color: COLORS.youtube,
  },
  {
    id: "photos",
    name: "Photos",
    icon: "image-outline",
    iconFamily: "Ionicons" as const,
    color: COLORS.orange,
  },
  {
    id: "twitter",
    name: "X",
    icon: "twitter",
    iconFamily: "FontAwesome5" as const,
    color: COLORS.twitter,
    border: true,
  },
];

// Referral options
export const REFERRAL_OPTIONS = [
  { id: "search", label: "Search engine" },
  { id: "friend", label: "Through a Friend" },
  { id: "social", label: "Facebook or Instagram" },
  { id: "appstore", label: "App Store" },
  { id: "tiktok", label: "TikTok" },
  { id: "twitter", label: "Twitter" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "reddit", label: "Reddit or Blog" },
  { id: "youtube", label: "YouTube" },
  { id: "snapchat", label: "Snapchat" },
  { id: "other", label: "Other" },
];

export const SHARE_OPTIONS: ShareOption[] = [
  {
    id: "instagram-feed",
    name: "Instagram",
    icon: "instagram",
    color: "#E4405F",
  },
  {
    id: "instagram-stories",
    name: "Stories",
    icon: "plus-circle", // Placeholder, as IG Stories has a specific icon
    color: "#E4405F",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "twitter",
    color: "#1DA1F2",
  },
  {
    id: "sms",
    name: "SMS",
    icon: "message-processing",
    color: "#4FCE5D",
  },
  {
    id: "messenger",
    name: "Messenger",
    icon: "facebook-messenger",
    color: "#00B2FF",
  },
  {
    id: "more",
    name: "More",
    icon: "dots-horizontal",
    color: "#8e8e93",
  },
];

// Background images from Unsplash
export const BREATHING_BG =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80";

// Mock session data
export const MOCK_SESSION = {
  name: "Work Time",
  duration: 60, // minutes
  difficulty: "normal" as const,
};

// In constants/appData.ts

// For the Day of Week selector
export const DAYS_OF_WEEK = [
  { id: 1, label: "M" },
  { id: 2, label: "T" },
  { id: 3, label: "W" },
  { id: 4, label: "T" },
  { id: 5, label: "F" },
  { id: 6, label: "S" },
  { id: 0, label: "S" }, // Sunday is 0 in JS Date object
];

// For the Emoji Picker
export const EMOJI_CATEGORIES = [
  {
    name: "Smileys & People",
    emojis: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
      "😏",
      "😒",
      "😞",
      "😔",
      "😟",
      "😕",
      "🙁",
      "☹️",
      "😣",
      "😖",
      "😫",
      "😩",
      "🥺",
      "😢",
      "😭",
      "😤",
      "😠",
      "😡",
      "🤬",
      "🤯",
      "😳",
      "🥵",
      "🥶",
      "😱",
      "😨",
      "😰",
      "😥",
      "😓",
      "🤗",
      "🤔",
      "🤭",
      "🤫",
      "🤥",
      "😶",
      "😐",
      "😑",
      "😬",
      "🙄",
      "😯",
      "😦",
      "😧",
      "😮",
      "😲",
      "🥱",
      "😴",
      "🤤",
      "😪",
      "😵",
      "🤐",
      "🥴",
      "🤢",
      "🤮",
      "🤧",
      "😷",
      "🤒",
      "🤕",
      "🤑",
      "🤠",
    ],
  },
  {
    name: "Food & Drink",
    emojis: [
      "🍇",
      "🍈",
      "🍉",
      "🍊",
      "🍋",
      "🍌",
      "🍍",
      "🥭",
      "🍎",
      "🍏",
      "🍐",
      "🍑",
      "🍒",
      "🍓",
      "🥝",
      "🍅",
      "🥥",
      "🥑",
      "🍆",
      "🥔",
      "🥕",
      "🌽",
      "🌶️",
      "🥒",
      "🥬",
      "🥦",
      "🧄",
      "🧅",
      "🍄",
      "🥜",
      "🌰",
      "🍞",
      "🥐",
      "🥖",
      "🥨",
      "🥯",
      "🥞",
      "🧇",
      "🧀",
      "🍖",
      "🍗",
      "🥩",
      "🥓",
      "🍔",
      "🍟",
      "🍕",
      "🌭",
      "🥪",
      "🌮",
      "🌯",
      "🥙",
      "🧆",
      "🥚",
      "🍳",
      "🥘",
      "🍲",
      "🥣",
      "🥗",
      "🍿",
      "🧈",
      "🧂",
      "🥫",
      "🍱",
      "🍘",
      "🍙",
      "🍚",
      "🍛",
      "🍜",
      "🍝",
      "🍠",
      "🍢",
      "🍣",
      "🍤",
      "🍥",
      "🥮",
    ],
  },
  // ... Add 6 more categories to match the 8 dots ...
];




export const MOCK_BLOCK_LISTS: BlockList[] = [
  {
    id: 'bl_1',
    name: 'Block List',
    icon: '🚫',
    type: 'block',
    selectedCategories: [],
    selectedApps: ['facetime', 'tiktok', 'bereal'],
    isAdultBlockingEnabled: true,
  },
  {
    id: 'bl_2',
    name: 'Bad Apps',
    icon: '📛',
    type: 'block',
    selectedCategories: ['social'],
    selectedApps: [],
    isAdultBlockingEnabled: false,
  },
    {
    id: 'bl_3',
    name: 'Focused Castle',
    icon: '🏰',
    type: 'block',
    selectedCategories: ['social', 'games', 'entertainment'],
    selectedApps: [],
    isAdultBlockingEnabled: false,
  },
];



import { SessionConfig } from "../types";

// ==========================================================
// TYPES
// ==========================================================

export type BlockStatus = "active" | "upcoming" | "disabled";

export interface BlockItem {
  id: string;
  icon: string;
  name: string;
  status: BlockStatus;
  schedule: string;
  progress?: number;
  blockedApps?: string[];
  countdown?: string;
  disabledUntil?: string;
}

export interface BlockIdea {
  id: string;
  icon: string;
  name: string;
  schedule: string;
  isLive?: boolean;
}

// ==========================================================
// MOCK DATA
// ==========================================================

export const INITIAL_ACTIVE_BLOCKS: BlockItem[] = [
  {
    id: "1",
    icon: "💻",
    name: "Work Time",
    status: "active",
    schedule: "Remaining 0:05:56",
    progress: 85,
    blockedApps: ["app1", "app2"],
  },
];

export const INITIAL_UPCOMING_BLOCKS: BlockItem[] = [
  {
    id: "2",
    icon: "🐱",
    name: "Time with Gigi",
    status: "upcoming",
    schedule: "Tue-Sat, 9:00 PM - 9:20 PM",
    countdown: "Starting in 5h 56m",
  },
  {
    id: "3",
    icon: "🛋️",
    name: "Wind Down",
    status: "disabled",
    schedule: "Weekdays, 5:00 PM - 5:25 PM",
    disabledUntil: "5 Sep",
  },
];

export const BLOCK_IDEAS: BlockIdea[] = [
  {
    id: "live_event",
    icon: "🏛️",
    name: "Live: Cowork with Opal",
    schedule: "This event is live!",
    isLive: true,
  },
  {
    id: "idea_1",
    icon: "🌞",
    name: "Morning",
    schedule: "Every day, 6:00 AM - 9:00 AM",
  },
  {
    id: "idea_2",
    icon: "🕯️",
    name: "Deep Work Hour",
    schedule: "Every day, 2:00 PM - 3:00 PM",
  },
  {
    id: "idea_3",
    icon: "🛋️",
    name: "Wind Down",
    schedule: "Weekdays, 5:00 PM - 6:00 PM",
  },
  {
    id: "idea_4",
    icon: "🛌",
    name: "Good Sleep, Good Life",
    schedule: "Every day, 10:30 PM - 6:30 AM",
  },
  {
    id: "idea_5",
    icon: "🍽️",
    name: "Dinner With Family",
    schedule: "Sunday, 6:00 PM - 7:00 PM",
  },
];

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  id: "mock_id",
  name: "Default Name",
  icon: "❓",
  isEnabled: true,
  startTime: new Date(),
  endTime: new Date(),
  activeDays: [1, 2, 3, 4, 5],
  appsBlockedId: "list1",
  difficulty: "normal",
};


export const REFERRAL_CODE = ["P", "U", "M", "E", "A"];

export const REWARDS: RewardItem[] = [
  {
    id: "1",
    friendsRequired: 1,
    title: "Loyal Gem",
    description: "Unlock this special MileStone",
    type: "gem",
    status: "claimed",
    color: "#f59e0b",
  },
  {
    id: "2",
    friendsRequired: 3,
    title: "Soulful Gem",
    description: "Unlock this special MileStone",
    type: "gem",
    status: "claimable",
    color: "#10b981",
  },
  {
    id: "3",
    friendsRequired: 10,
    title: "Popular Gem",
    description: "Unlock this special MileStone",
    type: "gem",
    status: "locked",
    color: "#3b82f6",
  },
  {
    id: "4",
    friendsRequired: 20,
    title: "Lifetime of PRO",
    description: "Contact us to get a Lifetime of Opal PRO ($399 value)",
    type: "gift",
    status: "locked",
    color: "#f472b6",
  },
  {
    id: "5",
    friendsRequired: 100,
    title: "Life-Changing Gear",
    description:
      "Contact us for free specially designed Opal gear from https://shop.opal.so/ ($100 value)",
    type: "mystery",
    status: "locked",
    color: "#a1a1aa",
  },
];