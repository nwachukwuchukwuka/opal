import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface ChangePhoneFlowProps {
  visible: boolean;
  onClose: () => void;
  onSave: (phoneNumber: string) => void;
}

export const ChangePhoneFlow = ({
  visible,
  onClose,
  onSave,
}: ChangePhoneFlowProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(59);

  // Reset state when opening
  useEffect(() => {
    if (visible) {
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
      setIsLoading(false);
      setTimer(59);
    }
  }, [visible]);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneNext = () => {
    if (phoneNumber.length > 3) {
      setStep("otp");
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSave(`+1${phoneNumber}`);
      onClose();
    }, 1500);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-black">
          <View className="px-4 pt-2 flex-row justify-between items-center">
            {step === "otp" ? (
              <Pressable
                onPress={() => setStep("phone")}
                className="w-10 h-10 justify-center"
              >
                <Ionicons name="chevron-back" size={28} color="white" />
              </Pressable>
            ) : (
              <Pressable onPress={onClose} className="w-10 h-10 justify-center">
                <Ionicons name="close" size={28} color="white" />
              </Pressable>
            )}
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-between px-6 pb-6"
          >
            {step === "phone" ? (
              <View className="mt-6 w-full">
                <Text className="text-white text-2xl font-bold text-center mb-2">
                  Add Phone Number
                </Text>
                <Text className="text-zinc-400 text-center mb-10 px-4">
                  Link your phone number to connect with your friends who also
                  use Opal
                </Text>

                <View className="flex-row items-center bg-zinc-900 rounded-xl border border-zinc-800 px-4 py-4">
                  <Text className="text-2xl mr-3">🇺🇸</Text>
                  <Text className="text-zinc-400 text-lg mr-1">+1</Text>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="6502137379"
                    placeholderTextColor="#52525b"
                    keyboardType="phone-pad"
                    autoFocus
                    className="flex-1 text-white text-lg h-full"
                  />
                </View>
              </View>
            ) : (
              <View className="mt-6 items-center w-full">
                <Text className="text-white text-2xl font-bold text-center mb-8 px-4">
                  Enter the 6 digit Verification Code sent to{" "}
                  <Text className="text-white">+1{phoneNumber}</Text>
                </Text>

                <View className="relative w-full h-16 mb-6">
                  <View className="flex-row justify-between w-full absolute inset-0 pointer-events-none">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <View
                        key={i}
                        className={`w-12 h-14 rounded-xl border-2 justify-center items-center ${
                          otp.length === i
                            ? "border-white bg-zinc-800"
                            : "border-zinc-800 bg-zinc-900"
                        }`}
                      >
                        <Text className="text-white text-xl font-bold">
                          {otp[i] || ""}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <TextInput
                    value={otp}
                    onChangeText={(t) => t.length <= 6 && setOtp(t)}
                    keyboardType="number-pad"
                    autoFocus
                    className="w-full h-full opacity-0 text-white"
                    caretHidden
                  />
                </View>

                {timer > 0 ? (
                  <View className="bg-zinc-800 px-4 py-2 rounded-full">
                    <Text className="text-zinc-500 font-medium">
                      Resend in 0:{timer.toString().padStart(2, "0")}
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => setTimer(59)}
                    className="bg-white px-6 py-2 rounded-full"
                  >
                    <Text className="text-black font-bold">Resend code</Text>
                  </Pressable>
                )}
              </View>
            )}

            <Pressable
              onPress={step === "phone" ? handlePhoneNext : handleVerify}
              disabled={
                step === "phone"
                  ? phoneNumber.length < 10
                  : otp.length < 6 || isLoading
              }
              className={`w-full py-4 rounded-full items-center ${
                (step === "phone" && phoneNumber.length >= 10) ||
                (step === "otp" && otp.length === 6)
                  ? "bg-white"
                  : "bg-zinc-800"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  className={`font-bold text-lg ${
                    (step === "phone" && phoneNumber.length >= 10) ||
                    (step === "otp" && otp.length === 6)
                      ? "text-black"
                      : "text-zinc-500"
                  }`}
                >
                  Next
                </Text>
              )}
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
