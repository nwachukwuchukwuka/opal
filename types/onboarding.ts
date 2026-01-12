// Onboarding Types

export interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: string;
}

export interface ScreenTimeOption {
  id: string;
  label: string;
}

export interface AgeOption {
  id: string;
  label: string;
}

export interface OccupationOption {
  id: string;
  label: string;
  icon: string;
}

export interface Friend {
  id: number;
  name: string;
  time?: string;
  rank?: number;
  inContacts?: boolean;
}

export interface Benefit {
  id: number;
  icon: string;
  text: string;
}

export interface TimelineStep {
  id: number;
  icon: string;
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
  upcoming?: boolean;
}

