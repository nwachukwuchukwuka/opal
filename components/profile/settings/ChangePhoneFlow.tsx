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

  useEffect(() => {
    if (visible) {
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
      setIsLoading(false);
      setTimer(59);
    }
  }, [visible]);

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
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 px-8">
            {/* Minimalist Top Nav */}
            <View className="flex-row justify-start items-center pt-4 mb-10">
              <Pressable 
                onPress={step === "otp" ? () => setStep("phone") : onClose}
                className="w-11 h-11 bg-slate-50 rounded-full items-center justify-center border border-slate-100"
              >
                <Ionicons name={step === "otp" ? "arrow-back" : "close"} size={24} color="#059669" />
              </Pressable>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1 pb-20"
            >
              {step === "phone" ? (
                <>
                  <View className="mb-12">
                    <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">
                      Mobile Number
                    </Text>
                    <Text className="text-slate-400 text-lg leading-6 font-medium">
                      Add your phone number to connect with friends and secure your account.
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-slate-50 rounded-3xl border border-slate-100 px-6 py-6 mb-12">
                    <Text className="text-2xl mr-3">🇺🇸</Text>
                    <Text className="text-slate-400 text-xl mr-2 font-semibold">+1</Text>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="Enter number"
                      placeholderTextColor="#cbd5e1"
                      keyboardType="phone-pad"
                      autoFocus
                      className="flex-1 text-slate-900 text-2xl font-semibold"
                    />
                  </View>
                </>
              ) : (
                <>
                  <View className="mb-12">
                    <Text className="text-slate-900 text-4xl font-bold mb-3 tracking-tight">
                      Verify It's You
                    </Text>
                    <Text className="text-slate-400 text-lg leading-6 font-medium">
                      We've sent a 6-digit code to <Text className="text-slate-600">+1{phoneNumber}</Text>
                    </Text>
                  </View>

                  <View className="relative w-full h-20 mb-10">
                    <View className="flex-row justify-between w-full absolute inset-0">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <View
                          key={i}
                          className={`w-[14%] h-full rounded-2xl border-2 justify-center items-center ${
                            otp.length === i
                              ? "border-emerald-600 bg-emerald-50/10"
                              : "border-slate-100 bg-slate-50"
                          }`}
                        >
                          <Text className="text-slate-900 text-2xl font-bold">
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
                      className="w-full h-full opacity-0"
                      caretHidden
                    />
                  </View>

                  <View className="items-center mb-10">
                    {timer > 0 ? (
                      <Text className="text-slate-400 font-medium">
                        Resend code in <Text className="text-slate-600">0:{timer.toString().padStart(2, "0")}</Text>
                      </Text>
                    ) : (
                      <Pressable
                        onPress={() => setTimer(59)}
                        className="bg-slate-50 px-8 py-3 rounded-full border border-slate-100"
                      >
                        <Text className="text-slate-600 font-bold">Resend Code</Text>
                      </Pressable>
                    )}
                  </View>
                </>
              )}

              <Pressable
                onPress={step === "phone" ? handlePhoneNext : handleVerify}
                disabled={
                  step === "phone"
                    ? phoneNumber.length < 3
                    : otp.length < 6 || isLoading
                }
                className={`w-full py-6 rounded-full items-center ${
                  (step === "phone" && phoneNumber.length >= 3) ||
                  (step === "otp" && otp.length === 6)
                    ? "bg-emerald-600"
                    : "bg-slate-100"
                }`}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    className={`font-bold text-lg ${
                      (step === "phone" && phoneNumber.length >= 3) ||
                      (step === "otp" && otp.length === 6)
                        ? "text-white"
                        : "text-slate-300"
                    }`}
                  >
                    {step === "phone" ? "Continue" : "Verify Code"}
                  </Text>
                )}
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
