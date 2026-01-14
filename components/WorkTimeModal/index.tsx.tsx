import ActiveSessionOverlay from "@/components/ActiveSessionOverlay";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Modal } from "react-native";
import { BreathingScreen } from "./BreathingScreen";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const TOTAL_DURATION_SEC = 6;

interface WorkTimeModalProps {
  visible: boolean;
  sessionName?: string;
  remainingTime?: string;
  onClose: () => void;
}

const WorkTimeModal = ({
  visible,
  sessionName = "Work Time",
  remainingTime = "0:00:00",
  onClose,
}: WorkTimeModalProps) => {
  const [showSession, setShowSession] = useState(false);
  const [breatheIn, setBreatheIn] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const [countdown, setCountdown] = useState(TOTAL_DURATION_SEC);

  // Animations
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const overlayFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowSession(false);
      setBreatheIn(true);
      setCanContinue(false);
      setCountdown(TOTAL_DURATION_SEC);

      // Reset Anims
      slideAnim.setValue(SCREEN_HEIGHT);
      overlayFadeAnim.setValue(0);
      progressAnim.setValue(0);
      breatheAnim.setValue(1);

      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();

      const totalDurationMs = TOTAL_DURATION_SEC * 1000;

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: totalDurationMs,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const breatheToggleTimer = setTimeout(() => {
        setBreatheIn(false);
      }, totalDurationMs / 2);

      const finishTimer = setTimeout(() => {
        setCanContinue(true);
      }, totalDurationMs);

      return () => {
        clearTimeout(finishTimer);
        clearTimeout(breatheToggleTimer);
        clearInterval(countdownInterval);
      };
    }
  }, [visible]);

  const handleContinue = () => setShowSession(true);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const handleSessionClose = () => {
    setShowSession(false);
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible && !showSession}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <Animated.View
          className="flex-1"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <BreathingScreen
            countdown={countdown}
            breatheIn={breatheIn}
            canContinue={canContinue}
            breatheAnim={breatheAnim}
            progressAnim={progressAnim}
            overlayFadeAnim={overlayFadeAnim}
            sessionName={sessionName}
            remainingTime={remainingTime}
            onContinue={handleContinue}
            onClose={handleClose}
          />
        </Animated.View>
      </Modal>

      <ActiveSessionOverlay
        visible={showSession}
        sessionName={sessionName}
        duration={60}
        difficulty="normal"
        onSnooze={() => {}}
        onLeaveEarly={handleSessionClose}
        onEdit={() => {}}
        onClose={handleSessionClose}
      />
    </>
  );
};

export default WorkTimeModal;
