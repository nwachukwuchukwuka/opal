import { DistractionLevel } from "@/types";
import { COLORS } from "./colors";

// Types
export interface InitialChartDataPoint {
  hour: string;
  value: number;
  color: string;
}

export interface DetailedChartBar {
  height: number;
  color: string;
}

export interface DetailedChartDataPoint {
  hour: string;
  values: DetailedChartBar[];
}

export interface HomeAppUsageItem {
  id: string;
  name: string;
  icon: string;
  iconType: "ionicons" | "fontawesome" | "text";
  time: string;
  subtitle?: string;
  tag?: string;
  tagColor?: string;
  timeColor?: string;
  barColor?: string;
  barWidth?: number;
  iconBgColor: string;
  iconColor: string;
  border?: boolean;
  distractionLevelValue: number;
}

// Initial chart data (all green - for analyzing state)
export const INITIAL_CHART_DATA: InitialChartDataPoint[] = [
  { hour: "12AM", value: 85, color: COLORS.success },
  { hour: "4AM", value: 90, color: COLORS.success },
  { hour: "8AM", value: 75, color: COLORS.success },
  { hour: "12PM", value: 60, color: COLORS.success },
  { hour: "4PM", value: 40, color: COLORS.success },
  { hour: "8PM", value: 20, color: COLORS.success },
];

// Detailed chart data (mixed colors - for detailed stats view)
export const DETAILED_CHART_DATA: DetailedChartDataPoint[] = [
  {
    hour: "9AM",
    values: [
      { height: 30, color: COLORS.danger },
      { height: 20, color: COLORS.success },
    ],
  },
  {
    hour: "",
    values: [
      { height: 25, color: COLORS.danger },
      { height: 15, color: COLORS.primary },
    ],
  },
  {
    hour: "1PM",
    values: [
      { height: 35, color: COLORS.danger },
      { height: 25, color: COLORS.warning },
      { height: 10, color: COLORS.success },
    ],
  },
  {
    hour: "",
    values: [
      { height: 20, color: COLORS.danger },
      { height: 30, color: COLORS.primary },
    ],
  },
  {
    hour: "5PM",
    values: [
      { height: 15, color: COLORS.warning },
      { height: 25, color: COLORS.primary },
    ],
  },
  { hour: "", values: [{ height: 10, color: COLORS.danger }] },
  { hour: "9PM", values: [] },
  { hour: "", values: [] },
];

// App usage data for scrollable list
export const HOME_APP_USAGE_DATA: HomeAppUsageItem[] = [
  {
    id: "offline",
    name: "Time Offline",
    icon: "cloud",
    iconType: "ionicons",
    time: "10h 38m",
    subtitle: "62% of your day",
    barColor: COLORS.success,
    barWidth: 80,
    iconBgColor: COLORS.zinc800,
    iconColor: COLORS.success,
    distractionLevelValue: 0,
  },
  {
    id: "opal",
    name: "Opal",
    icon: "diamond-outline",
    iconType: "ionicons",
    time: "2h 28m",
    tag: "Neutral",
    tagColor: COLORS.success,
    barColor: COLORS.primary,
    barWidth: 50,
    iconBgColor: COLORS.blue,
    iconColor: COLORS.white,
    distractionLevelValue: 2,
  },
  {
    id: "x",
    name: "X",
    icon: "twitter",
    iconType: "fontawesome",
    time: "1h 22m",
    tag: "Distracting",
    tagColor: COLORS.danger,
    barColor: COLORS.danger,
    barWidth: 35,
    iconBgColor: COLORS.black,
    iconColor: COLORS.white,
    border: true,
    distractionLevelValue: 4,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    iconType: "fontawesome",
    time: "57m 52s",
    timeColor: COLORS.danger,
    tag: "Distracting",
    tagColor: COLORS.danger,
    barColor: COLORS.danger,
    barWidth: 25,
    iconBgColor: COLORS.instagram,
    iconColor: COLORS.white,
    distractionLevelValue: 4,
  },
  {
    id: "etsy",
    name: "Etsy",
    icon: "etsy",
    iconType: "fontawesome",
    time: "56m 34s",
    timeColor: COLORS.danger,
    tag: "Distracting",
    tagColor: COLORS.danger,
    barColor: COLORS.danger,
    barWidth: 24,
    iconBgColor: COLORS.etsy,
    iconColor: COLORS.white,
    distractionLevelValue: 4,
  },
  {
    id: "settings",
    name: "Settings",
    icon: "S",
    iconType: "text",
    time: "25m 8s",
    tag: "Neutral",
    tagColor: COLORS.success,
    barColor: COLORS.success,
    barWidth: 15,
    iconBgColor: COLORS.zinc600,
    iconColor: COLORS.white,
    distractionLevelValue: 4,
  },
  {
    id: "creme",
    name: "CREME",
    icon: "C",
    iconType: "text",
    time: "16m 46s",
    tag: "Productive",
    tagColor: COLORS.success,
    iconBgColor: COLORS.black,
    iconColor: COLORS.white,
    border: true,
    distractionLevelValue: 0,
  },
  {
    id: "messages",
    name: "Messages",
    icon: "chatbubble",
    iconType: "ionicons",
    time: "4m 5s",
    timeColor: COLORS.danger,
    tag: "Distracting",
    tagColor: COLORS.danger,
    iconBgColor: COLORS.success,
    iconColor: COLORS.white,
    distractionLevelValue: 0,
  },
  {
    id: "other",
    name: "Other",
    icon: "star",
    iconType: "ionicons",
    time: "2s",
    iconBgColor: COLORS.zinc600,
    iconColor: COLORS.yellow,
    distractionLevelValue: 0,
  },
];

export const DISTRACTION_LEVELS: DistractionLevel[] = [
  {
    id: "productive",
    value: 0,
    label: "Productive",
    description: "Apps that directly contribute to your goals and efficiency.",
    color: "#22c55e",
  },
  {
    id: "slightly_productive",
    value: 1,
    label: "Slightly Productive",
    description:
      "Apps that offer minor aids or enhancements to tasks, fostering some efficiency.",
    color: "#6ee7b7",
  },
  {
    id: "neutral",
    value: 2,
    label: "Neutral",
    description:
      "Apps that neither hinder nor enhance productivity are not counted towards your screen time.",
    color: "#67e8f9",
  },
  {
    id: "slightly_distracting",
    value: 3,
    label: "Slightly Distracting",
    description:
      "Apps with minor distractions that may pull your attention occasionally.",
    color: "#a5b4fc",
  },
  {
    id: "distracting",
    value: 4,
    label: "Distracting",
    description:
      "Apps that frequently interrupt your workflow and reduce focus.",
    color: "#f87171",
  },
  {
    id: "very_distracting",
    value: 5,
    label: "Very Distracting",
    description:
      "Apps incessantly clamoring for attention, often sidetracking you from tasks.",
    color: "#ef4444",
  },
];
