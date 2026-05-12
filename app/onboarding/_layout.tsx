// import { Stack } from "expo-router";

// export default function OnboardingLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#f8fafc" },
//       }}
//     />
//   );
// }

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OnboardingLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f8fafc" },
        }}
      />
    </>
  );
}