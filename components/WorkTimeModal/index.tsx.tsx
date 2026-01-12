// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, Easing, Modal } from "react-native";
// import ActiveSessionOverlay from "../ActiveSessionOverlay";
// import { BreathingScreen } from "./BreathingScreen";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// const TOTAL_COUNTDOWN = 6; // Total seconds for the countdown
// const OVERLAY_FADE_DELAY = 2; // Seconds before dark overlay starts fading

// interface WorkTimeModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const WorkTimeModal = ({ visible, onClose }: WorkTimeModalProps) => {
//   const [showSession, setShowSession] = useState(false);
//   const [countdown, setCountdown] = useState(TOTAL_COUNTDOWN);
//   const [breatheIn, setBreatheIn] = useState(true);
//   const [canContinue, setCanContinue] = useState(false);

//   // Animations
//   const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
//   const breatheAnim = useRef(new Animated.Value(0.6)).current;
//   const progressAnim = useRef(new Animated.Value(0)).current;
//   const overlayFadeAnim = useRef(new Animated.Value(1)).current;

//   // Reset state when modal opens
//   useEffect(() => {
//     if (visible) {
//       setShowSession(false);
//       setCountdown(TOTAL_COUNTDOWN);
//       setBreatheIn(true);
//       setCanContinue(false);
//       slideAnim.setValue(SCREEN_HEIGHT);
//       overlayFadeAnim.setValue(1);
//       progressAnim.setValue(0);

//       // Slide in animation
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();

//       // Start overlay fade after delay
//       setTimeout(() => {
//         Animated.timing(overlayFadeAnim, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: true,
//         }).start();
//       }, OVERLAY_FADE_DELAY * 1000);
//     }
//   }, [visible]);

//   // Countdown timer
//   useEffect(() => {
//     if (!visible || showSession) return;

//     if (countdown > 0) {
//       const timer = setTimeout(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setCanContinue(true);
//     }
//   }, [countdown, visible, showSession]);

//   // Progress bar animation
//   useEffect(() => {
//     if (!visible || showSession) return;

//     const progress = 1 - countdown / TOTAL_COUNTDOWN;

//     Animated.timing(progressAnim, {
//       toValue: progress,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   }, [countdown, visible, showSession]);

//   // Breathing animation
//   useEffect(() => {
//     if (!visible || showSession) return;

//     const breatheCycle = () => {
//       setBreatheIn(true);
//       Animated.timing(breatheAnim, {
//         toValue: 1,
//         duration: 3000,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }).start(() => {
//         if (showSession) return;
//         setBreatheIn(false);
//         Animated.timing(breatheAnim, {
//           toValue: 0.6,
//           duration: 3000,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }).start(() => {
//           if (!showSession) {
//             breatheCycle();
//           }
//         });
//       });
//     };

//     breatheCycle();
//   }, [visible, showSession]);

//   const handleContinue = () => {
//     setShowSession(true);
//   };

//   const handleClose = () => {
//     Animated.timing(slideAnim, {
//       toValue: SCREEN_HEIGHT,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       onClose();
//     });
//   };

//   const handleSessionClose = () => {
//     setShowSession(false);
//     onClose();
//   };

//   return (
//     <>
//       <Modal
//         visible={visible && !showSession}
//         transparent
//         animationType="none"
//         onRequestClose={handleClose}
//       >
//         <Animated.View
//           className="flex-1"
//           style={{
//             transform: [{ translateY: slideAnim }],
//           }}
//         >
//           <BreathingScreen
//             countdown={countdown}
//             breatheIn={breatheIn}
//             canContinue={canContinue}
//             breatheAnim={breatheAnim}
//             progressAnim={progressAnim}
//             overlayFadeAnim={overlayFadeAnim}
//             onContinue={handleContinue}
//             onClose={handleClose}
//           />
//         </Animated.View>
//       </Modal>

//       <ActiveSessionOverlay
//         visible={showSession}
//         sessionName="Work Time"
//         duration={60}
//         difficulty="normal"
//         onSnooze={() => {}}
//         onLeaveEarly={() => handleSessionClose()}
//         onEdit={() => {}}
//         onClose={handleSessionClose}
//       />
//     </>
//   );
// };

// export default WorkTimeModal;


import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Modal } from "react-native";
import ActiveSessionOverlay from "../ActiveSessionOverlay";
import { BreathingScreen } from "./BreathingScreen";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const TOTAL_COUNTDOWN = 6; // Total seconds for the countdown
const OVERLAY_FADE_DELAY = 2; // Seconds before dark overlay starts fading

interface WorkTimeModalProps {
  visible: boolean;
  sessionName?: string;
  onClose: () => void;
}

const WorkTimeModal = ({ visible, sessionName = "Work Time", onClose }: WorkTimeModalProps) => {
  const [showSession, setShowSession] = useState(false);
  const [countdown, setCountdown] = useState(TOTAL_COUNTDOWN);
  const [breatheIn, setBreatheIn] = useState(true);
  const [canContinue, setCanContinue] = useState(false);

  // Animations
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const breatheAnim = useRef(new Animated.Value(0.6)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const overlayFadeAnim = useRef(new Animated.Value(1)).current;

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setShowSession(false);
      setCountdown(TOTAL_COUNTDOWN);
      setBreatheIn(true);
      setCanContinue(false);
      slideAnim.setValue(SCREEN_HEIGHT);
      overlayFadeAnim.setValue(1);
      progressAnim.setValue(0);

      // Slide in animation
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();

      // Start overlay fade after delay
      setTimeout(() => {
        Animated.timing(overlayFadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, OVERLAY_FADE_DELAY * 1000);
    }
  }, [visible]);

  // Countdown timer
  useEffect(() => {
    if (!visible || showSession) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanContinue(true);
    }
  }, [countdown, visible, showSession]);

  // Progress bar animation
  useEffect(() => {
    if (!visible || showSession) return;

    const progress = 1 - countdown / TOTAL_COUNTDOWN;

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [countdown, visible, showSession]);

  // Breathing animation
  useEffect(() => {
    if (!visible || showSession) return;

    const breatheCycle = () => {
      setBreatheIn(true);
      Animated.timing(breatheAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        if (showSession) return;
        setBreatheIn(false);
        Animated.timing(breatheAnim, {
          toValue: 0.6,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          if (!showSession) {
            breatheCycle();
          }
        });
      });
    };

    breatheCycle();
  }, [visible, showSession]);

  const handleContinue = () => {
    setShowSession(true);
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
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
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <BreathingScreen
            countdown={countdown}
            breatheIn={breatheIn}
            canContinue={canContinue}
            breatheAnim={breatheAnim}
            progressAnim={progressAnim}
            overlayFadeAnim={overlayFadeAnim}
            sessionName={sessionName}
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
        onLeaveEarly={() => handleSessionClose()}
        onEdit={() => {}}
        onClose={handleSessionClose}
      />
    </>
  );
};

export default WorkTimeModal;