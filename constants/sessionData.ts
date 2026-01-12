import { DifficultyLevel, DifficultyOption } from "../types";

// Difficulty options for session
export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    id: "normal",
    name: "Normal",
    description: "You can snooze and cancel this session",
  },
  {
    id: "timeout",
    name: "Timeout",
    description: "There will be increasing delays before you can snooze again",
    showInfo: true,
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    description: "You can't snooze or end the session early",
  },
];

// Difficulty labels for display
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  normal: "Normal",
  timeout: "Timeout",
  "deep-focus": "Deep Focus",
};

// Difficulty warning messages
export const DIFFICULTY_WARNINGS: Record<DifficultyLevel, string> = {
  normal: "You can snooze and cancel this session",
  timeout: "There will be increasing delays before you can snooze again",
  "deep-focus": "",
};

// Default session values
export const DEFAULT_SESSION = {
  name: "Focus Session",
  duration: { hours: 0, minutes: 20 },
  difficulty: "normal" as DifficultyLevel,
  isAlwaysOn: false,
};

// Snooze duration options (in minutes)
export const SNOOZE_MINUTES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30];

