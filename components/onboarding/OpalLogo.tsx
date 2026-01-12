import React from "react";
import { View } from "react-native";
import { OpalLogoProps } from "../../types";

export const OpalLogo: React.FC<OpalLogoProps> = ({
  size = 80,
  color = "#FFFFFF",
  strokeWidth = 2,
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: color,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner subtle ring */}
        <View
          style={{
            width: size - strokeWidth * 8,
            height: size - strokeWidth * 8,
            borderRadius: (size - strokeWidth * 8) / 2,
            borderWidth: strokeWidth / 2,
            borderColor: `${color}20`,
          }}
        />
      </View>
    </View>
  );
};

export default OpalLogo;
