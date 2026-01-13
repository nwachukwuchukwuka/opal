// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, Easing, Modal } from "react-native";
// import ActiveSessionOverlay from "../ActiveSessionOverlay";
// import { BreathingScreen } from "./BreathingScreen";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// const TOTAL_COUNTDOWN = 6; // Total seconds for the countdown
// const OVERLAY_FADE_DELAY = 2; // Seconds before dark overlay starts fading

// interface WorkTimeModalProps {
//   visible: boolean;
//   sessionName?: string;
//   onClose: () => void;
// }

// const WorkTimeModal = ({ visible, sessionName = "Work Time", onClose }: WorkTimeModalProps) => {
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
//             sessionName={sessionName}
//             onContinue={handleContinue}
//             onClose={handleClose}
//           />
//         </Animated.View>
//       </Modal>

//       <ActiveSessionOverlay
//         visible={showSession}
//         sessionName={sessionName}
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

// import ActiveSessionOverlay from "@/components/ActiveSessionOverlay";
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, Easing, Modal } from "react-native";
// import { BreathingScreen } from "./BreathingScreen";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// // TIMING CONFIGURATION
// const OVERLAY_FADE_DELAY = 1500; // Time to show "Almost there" logo
// const BREATHE_IN_DURATION = 3500; // 3.5 seconds in
// const BREATHE_OUT_DURATION = 3500; // 3.5 seconds out
// const TOTAL_CYCLES = 2; // Exactly 2 breaths

// interface WorkTimeModalProps {
//   visible: boolean;
//   sessionName?: string;
//   onClose: () => void;
// }

// const WorkTimeModal = ({
//   visible,
//   sessionName = "Work Time",
//   onClose,
// }: WorkTimeModalProps) => {
//   const [showSession, setShowSession] = useState(false);
//   const [breatheIn, setBreatheIn] = useState(true);
//   const [canContinue, setCanContinue] = useState(false);
//   const [showBreathingUI, setShowBreathingUI] = useState(false);

//   // Animations
//   const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
//   const breatheAnim = useRef(new Animated.Value(1)).current; // Start at scale 1
//   const progressAnim = useRef(new Animated.Value(0)).current;
//   const overlayFadeAnim = useRef(new Animated.Value(1)).current;

//   // Logic Ref to track cycles without re-renders
//   const cycleCount = useRef(0);

//   // Reset state when modal opens
//   useEffect(() => {
//     if (visible) {
//       // 1. Reset everything
//       setShowSession(false);
//       setBreatheIn(true);
//       setCanContinue(false);
//       setShowBreathingUI(false);
//       cycleCount.current = 0;

//       slideAnim.setValue(SCREEN_HEIGHT);
//       overlayFadeAnim.setValue(1);
//       progressAnim.setValue(0);
//       breatheAnim.setValue(1);

//       // 2. Slide in the modal
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();

//       // 3. Wait, then transition to breathing
//       const transitionTimer = setTimeout(() => {
//         if (!visible) return;

//         // Switch state to render breathing UI
//         setShowBreathingUI(true);

//         // Fade out the "Almost there" overlay
//         Animated.timing(overlayFadeAnim, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }).start();

//         // Start the progress bar (linear fill over total duration)
//         const totalDuration =
//           (BREATHE_IN_DURATION + BREATHE_OUT_DURATION) * TOTAL_CYCLES;
//         Animated.timing(progressAnim, {
//           toValue: 1,
//           duration: totalDuration,
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }).start();

//         // Begin the specific breathing sequence
//         startBreathingCycle();
//       }, OVERLAY_FADE_DELAY);

//       return () => clearTimeout(transitionTimer);
//     }
//   }, [visible]);

//   // Recursive function to handle exactly 2 cycles
//   const startBreathingCycle = () => {
//     if (!visible) return;

//     if (cycleCount.current >= TOTAL_CYCLES) {
//       setCanContinue(true);
//       return;
//     }

//     setBreatheIn(true);

//     // BREATHE IN (Scale Up)
//     Animated.timing(breatheAnim, {
//       toValue: 3.5, // Scale up to 3.5x
//       duration: BREATHE_IN_DURATION,
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => {
//       setBreatheIn(false);

//       // BREATHE OUT (Scale Down)
//       Animated.timing(breatheAnim, {
//         toValue: 1, // Back to original size
//         duration: BREATHE_OUT_DURATION,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }).start(() => {
//         // Cycle Complete
//         cycleCount.current += 1;
//         startBreathingCycle(); // Recursion
//       });
//     });
//   };

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
//             countdown={0} // Not used, progress bar is used instead
//             breatheIn={breatheIn}
//             canContinue={canContinue}
//             breatheAnim={breatheAnim}
//             progressAnim={progressAnim}
//             overlayFadeAnim={overlayFadeAnim}
//             sessionName={sessionName}
//             onContinue={handleContinue}
//             onClose={handleClose}
//             showBreathingUI={showBreathingUI} // Pass the state to control visibility
//           />
//         </Animated.View>
//       </Modal>

//       <ActiveSessionOverlay
//         visible={showSession}
//         sessionName={sessionName}
//         duration={60}
//         difficulty="normal"
//         onSnooze={() => {}}
//         onLeaveEarly={handleSessionClose}
//         onEdit={() => {}}
//         onClose={handleSessionClose}
//       />
//     </>
//   );
// };

// export default WorkTimeModal;

// import ActiveSessionOverlay from "@/components/ActiveSessionOverlay";
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, Easing, Modal } from "react-native";
// import { BreathingScreen } from "./BreathingScreen";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// // TIMING CONFIGURATION
// const OVERLAY_FADE_DELAY = 1500; // 1.5s delay before "Almost there" fades
// const TOTAL_DURATION_SEC = 6;    // Match "Wait for 6s"
// // We adjust breathing to roughly fit the remaining time after the delay
// const BREATHE_IN_DURATION = 2000;
// const BREATHE_OUT_DURATION = 2500;
// const TOTAL_CYCLES = 1; // 1.5s delay + 4.5s breathing = ~6s

// interface WorkTimeModalProps {
//   visible: boolean;
//   sessionName?: string;
//   onClose: () => void;
// }

// const WorkTimeModal = ({ visible, sessionName = "Work Time", onClose }: WorkTimeModalProps) => {
//   const [showSession, setShowSession] = useState(false);
//   const [breatheIn, setBreatheIn] = useState(true);
//   const [canContinue, setCanContinue] = useState(false);
//   const [countdown, setCountdown] = useState(TOTAL_DURATION_SEC);

//   // Animations
//   const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
//   const breatheAnim = useRef(new Animated.Value(1)).current;
//   const progressAnim = useRef(new Animated.Value(0)).current;
//   const overlayFadeAnim = useRef(new Animated.Value(1)).current; // 1 = Visible (Logo), 0 = Hidden (Breathing)

//   const cycleCount = useRef(0);

//   useEffect(() => {
//     if (visible) {
//       // 1. Reset State
//       setShowSession(false);
//       setBreatheIn(true);
//       setCanContinue(false);
//       setCountdown(TOTAL_DURATION_SEC);
//       cycleCount.current = 0;

//       // Reset Anims
//       slideAnim.setValue(SCREEN_HEIGHT);
//       overlayFadeAnim.setValue(1);
//       progressAnim.setValue(0);
//       breatheAnim.setValue(1);

//       // 2. Slide Up
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();

//       // 3. START PROGRESS & COUNTDOWN IMMEDIATELY (Screen 1 behavior)
//       const totalDurationMs = TOTAL_DURATION_SEC * 1000;

//       Animated.timing(progressAnim, {
//         toValue: 1,
//         duration: totalDurationMs,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start();

//       const countdownInterval = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             clearInterval(countdownInterval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       // 4. Delayed Transition to Breathing (Screen 1 -> Screen 2)
//       const transitionTimer = setTimeout(() => {
//         if (!visible) return;

//         // Fade out "Almost there", Fade in "Breathe"
//         Animated.timing(overlayFadeAnim, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }).start();

//         // Start Breathing Animation
//         startBreathingCycle();

//       }, OVERLAY_FADE_DELAY);

//       // 5. Enable "Continue" at the exact end of the timer
//       const finishTimer = setTimeout(() => {
//         setCanContinue(true);
//       }, totalDurationMs);

//       return () => {
//         clearTimeout(transitionTimer);
//         clearTimeout(finishTimer);
//         clearInterval(countdownInterval);
//       };
//     }
//   }, [visible]);

//   const startBreathingCycle = () => {
//     if (!visible) return;

//     setBreatheIn(true);

//     Animated.timing(breatheAnim, {
//       toValue: 3.5,
//       duration: BREATHE_IN_DURATION,
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: true,
//     }).start(() => {
//       setBreatheIn(false);
//       Animated.timing(breatheAnim, {
//         toValue: 1,
//         duration: BREATHE_OUT_DURATION,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }).start(() => {
//         cycleCount.current += 1;
//         // Keep breathing until continued
//         if (!canContinue) startBreathingCycle();
//       });
//     });
//   };

//   const handleContinue = () => setShowSession(true);

//   const handleClose = () => {
//     Animated.timing(slideAnim, {
//       toValue: SCREEN_HEIGHT,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => onClose());
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
//           style={{ transform: [{ translateY: slideAnim }] }}
//         >
//           <BreathingScreen
//             countdown={countdown}
//             breatheIn={breatheIn}
//             canContinue={canContinue}
//             breatheAnim={breatheAnim}
//             progressAnim={progressAnim}
//             overlayFadeAnim={overlayFadeAnim}
//             sessionName={sessionName}
//             onContinue={handleContinue}
//             onClose={handleClose}
//           />
//         </Animated.View>
//       </Modal>

//       <ActiveSessionOverlay
//         visible={showSession}
//         sessionName={sessionName}
//         duration={60}
//         difficulty="normal"
//         onSnooze={() => {}}
//         onLeaveEarly={handleSessionClose}
//         onEdit={() => {}}
//         onClose={handleSessionClose}
//       />
//     </>
//   );
// };

// export default WorkTimeModal;

// import ActiveSessionOverlay from "@/components/ActiveSessionOverlay";
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, Easing, Modal } from "react-native";
// import { BreathingScreen } from "./BreathingScreen";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// // TIMING CONFIGURATION
// const TOTAL_DURATION_SEC = 6;    // Match "Wait for 6s"

// interface WorkTimeModalProps {
//   visible: boolean;
//   sessionName?: string;
//   onClose: () => void;
// }

// const WorkTimeModal = ({ visible, sessionName = "Work Time", onClose }: WorkTimeModalProps) => {
//   const [showSession, setShowSession] = useState(false);
//   const [breatheIn, setBreatheIn] = useState(true);
//   const [canContinue, setCanContinue] = useState(false);
//   const [countdown, setCountdown] = useState(TOTAL_DURATION_SEC);

//   // Animations
//   const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
//   const breatheAnim = useRef(new Animated.Value(1)).current;
//   const progressAnim = useRef(new Animated.Value(0)).current;

//   // Changed initial value to 0: The "Almost there" overlay is hidden immediately.
//   const overlayFadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (visible) {
//       // 1. Reset State
//       setShowSession(false);
//       setBreatheIn(true);
//       setCanContinue(false);
//       setCountdown(TOTAL_DURATION_SEC);

//       // Reset Anims
//       slideAnim.setValue(SCREEN_HEIGHT);
//       overlayFadeAnim.setValue(0); // Ensure overlay starts hidden
//       progressAnim.setValue(0);
//       breatheAnim.setValue(1);

//       // 2. Slide Up
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();

//       // 3. START PROGRESS & COUNTDOWN IMMEDIATELY
//       const totalDurationMs = TOTAL_DURATION_SEC * 1000;

//       Animated.timing(progressAnim, {
//         toValue: 1,
//         duration: totalDurationMs,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start();

//       const countdownInterval = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             clearInterval(countdownInterval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       // 4. Enable "Continue" at the exact end of the timer
//       const finishTimer = setTimeout(() => {
//         setCanContinue(true);
//       }, totalDurationMs);

//       return () => {
//         clearTimeout(finishTimer);
//         clearInterval(countdownInterval);
//       };
//     }
//   }, [visible]);

//   const handleContinue = () => setShowSession(true);

//   const handleClose = () => {
//     Animated.timing(slideAnim, {
//       toValue: SCREEN_HEIGHT,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => onClose());
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
//           style={{ transform: [{ translateY: slideAnim }] }}
//         >
//           <BreathingScreen
//             countdown={countdown}
//             breatheIn={breatheIn}
//             canContinue={canContinue}
//             breatheAnim={breatheAnim}
//             progressAnim={progressAnim}
//             overlayFadeAnim={overlayFadeAnim}
//             sessionName={sessionName}
//             onContinue={handleContinue}
//             onClose={handleClose}
//           />
//         </Animated.View>
//       </Modal>

//       <ActiveSessionOverlay
//         visible={showSession}
//         sessionName={sessionName}
//         duration={60}
//         difficulty="normal"
//         onSnooze={() => {}}
//         onLeaveEarly={handleSessionClose}
//         onEdit={() => {}}
//         onClose={handleSessionClose}
//       />
//     </>
//   );
// };

// export default WorkTimeModal;

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
