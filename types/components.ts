// Component Props Types

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface OpalLogoProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export interface PhoneMockupProps {
  variant?: "apps" | "focus" | "stats";
  showBlockButton?: boolean;
}

export interface AppIconProps {
  app: { name: string; color: string; icon: string };
  blocked?: boolean;
}

export interface OnboardingSlideProps {
  variant: "splash" | "welcome" | "features" | "permissions";
  onGetStarted?: () => void;
  onSignIn?: () => void;
  onNext?: () => void;
  isActive?: boolean;
}

export interface PrivacyBottomSheetProps {
  onGivePermissions: () => void;
}

