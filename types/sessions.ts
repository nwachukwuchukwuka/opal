// Session Types

import { Ionicons } from "@expo/vector-icons";

export type DifficultyLevel = "normal" | "timeout" | "deep-focus";

export interface DifficultyOption {
  id: DifficultyLevel;
  name: string;
  description: string;
  showInfo?: boolean;
}

export interface FocusSession {
  name: string;
  duration: number;
  difficulty: DifficultyLevel;
  isAlwaysOn: boolean;
}

export interface DifficultySelectorProps {
  selectedDifficulty: DifficultyLevel;
  onSelect: (difficulty: DifficultyLevel) => void;
  onClose: () => void;
}

export interface DurationPickerProps {
  initialHours: number;
  initialMinutes: number;
  onConfirm: (hours: number, minutes: number) => void;
  onAlwaysOn: () => void;
  onClose: () => void;
}

export interface FocusSessionSheetProps {
  onStartSession: (session: FocusSession) => void;
  onClose: () => void;
}

export interface SessionNameSheetProps {
  initialName: string;
  onConfirm: (name: string) => void;
  onClose: () => void;
}

export interface ActiveSessionProps {
  visible: boolean;
  sessionName: string;
  duration: number;
  difficulty: DifficultyLevel;
  onSnooze: () => void;
  onLeaveEarly: () => void;
  onEdit: () => void;
  onClose: () => void;
}

export interface SnoozeSheetProps {
  onSnooze: (minutes: number) => void;
  onClose: () => void;
}




export interface ShareOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface SessionStats {
  distractionFreeTime: number;
  intentionalUseToday: number; // in sessions
  funFact: string;
}


// Add this new type
export interface DistractionLevel {
  id: string;
  value: number;
  label: string;
  description: string;
  color: string;
}

export interface HomeAppUsageItem {
  id: string;
  name: string;
  icon: string;
  iconType: "text" | "fontawesome" | "ionicons";
  iconColor: string;
  iconBgColor: string;
  time: string;
  timeColor?: string;
  distractionLevelValue: number;
}


// In your main types file (e.g., types.ts or types/session.ts)
// export interface SessionConfig {
//   id: string;
//   name: string;
//   icon: string; // This will be the emoji character, e.g., '💻'
//   isEnabled: boolean;
//   startTime: Date;
//   endTime: Date;
//   activeDays: number[]; // e.g., [1, 2, 3, 4, 5] for Monday-Friday
//   // Placeholders for future implementation
//   appsBlockedId: string;
//   difficulty: 'normal' | 'deep-focus';
// }

export interface SessionConfig {
  id: string;
  name: string;
  icon: string;
  isEnabled: boolean;
  startTime: Date;
  endTime: Date;
  activeDays: number[];
  appsBlockedId: string;
  difficulty: 'normal' | 'deep-focus';
  disabledUntil?: Date | 'indefinitely';
}

export interface BlockList {
  id: string;
  name: string;
  icon: string;
  type: 'block' | 'allow';
  selectedCategories: string[]; // Array of category IDs
  selectedApps: string[];       // Array of app IDs
  isAdultBlockingEnabled: boolean;
}

export interface AppCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}


export interface RewardItem {
  id: string;
  friendsRequired: number;
  title: string;
  description: string;
  type: "gem" | "gift" | "mystery";
  status: "locked" | "claimable" | "claimed";
  color: string;
}