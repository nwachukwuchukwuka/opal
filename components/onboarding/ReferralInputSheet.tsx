import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
  
  export type ReferralInputSheetRef = BottomSheetModal;
  
  interface ReferralInputSheetProps {
    onSuccess: () => void;
  }
  
  const ReferralInputSheet = forwardRef<ReferralInputSheetRef, ReferralInputSheetProps>(
    ({ onSuccess }, ref) => {
      const snapPoints = useMemo(() => ["35%"], []);
      const [code, setCode] = useState("");
      const [error, setError] = useState("");
  
      const renderBackdrop = useCallback(
        (props: any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.8}
          />
        ),
        []
      );
  
      const handleContinue = () => {
        Keyboard.dismiss();
        if (code.trim().toUpperCase() === "OPAJ34") { 
           setError("This code doesn't exist");
        } else if (code.length > 0) {
          if (ref && 'current' in ref) ref.current?.dismiss();
          onSuccess();
        }
      };
  
      const handleInputChange = (text: string) => {
          setCode(text);
          if(error) setError(""); 
      }
  
      return (
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "#1c1c1e" }}
          handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
          backdropComponent={renderBackdrop}
          android_keyboardInputMode="adjustResize"
          enableDynamicSizing={false}
        >
          <BottomSheetView className="flex-1 px-6 pt-4 pb-10">
              <Text className="text-white text-xl font-bold text-center mb-2">
                  Enter Your Friend's Code
              </Text>
              <Text className="text-zinc-400 text-center text-sm mb-8">
                  Get Opal Pro for 30 days and more
              </Text>
  
              <View>
                  <BottomSheetTextInput
                      value={code}
                      onChangeText={handleInputChange}
                      placeholder="e.g OP42D"
                      placeholderTextColor="#52525b"
                      autoCapitalize="characters"
                      className={`bg-black/50 border rounded-xl px-4 py-4 text-white text-lg ${error ? 'border-red-500' : 'border-zinc-700'}`}
                      autoFocus
                  />
                  {error ? (
                      <View className="flex-row items-center justify-center mt-2">
                           <Text className="text-red-500 text-xs text-center">{error}</Text>
                      </View>
                  ) : null}
                   {error && (
                      <View className="absolute right-4 top-4">
                          <Ionicons name="close-circle" size={20} color="#ef4444" />
                      </View>
                   )}
              </View>
  
              <View className="flex-1" />
  
              <Pressable
                  onPress={handleContinue}
                  disabled={code.length === 0}
                  className={`w-full py-4 mt-4 rounded-full items-center ${
                      code.length > 0 ? "bg-white" : "bg-zinc-800"
                  }`}
              >
                  <Text
                      className={`font-bold text-lg ${
                      code.length > 0 ? "text-black" : "text-zinc-500"
                      }`}
                  >
                      Continue
                  </Text>
              </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default ReferralInputSheet;