import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export type QRCodeScannerSheetRef = BottomSheetModal;

const QRCodeScannerSheet = forwardRef<QRCodeScannerSheetRef>((props, ref) => {
  const snapPoints = useMemo(() => ["92%"], []);
  const [permission, requestPermission] = useCameraPermissions();

  const handleScan = ({ data }: { data: string }) => {
    Alert.alert("Scanned code", data);
    if (ref && "current" in ref) ref.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      // backgroundStyle={{ backgroundColor: "#000" }}
      handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {!permission?.granted ? (
          <View className="flex-1 items-center justify-center bg-slate-50 px-8 py-10">
            <View className="bg-white rounded-[44px] p-10 items-center w-full border border-slate-100">
              <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-8">
                <Ionicons name="camera" size={40} color="#059669" />
              </View>
              <Text className="text-slate-900 text-2xl font-bold text-center mb-3">
                Camera Access
              </Text>
              <Text className="text-slate-400 text-center text-base leading-6 font-medium mb-10">
                Opal uses your camera to scan QR codes for quick actions and friend invites.
              </Text>

              <View className="w-full gap-4">
                <Pressable
                  onPress={requestPermission}
                  className="w-full bg-emerald-600 py-5 rounded-full items-center"
                >
                  <Text className="text-white font-bold text-base">Enable Camera</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (ref && "current" in ref) ref.current?.dismiss();
                  }}
                  className="w-full bg-slate-50 py-5 rounded-full items-center border border-slate-100"
                >
                  <Text className="text-slate-600 font-bold text-base">Not Now</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 relative my-10">
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              onBarcodeScanned={handleScan}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
            />
            {/* Minimalist Overlay UI */}
            <View className="absolute top-10 left-2 right-8 flex-row justify-between items-center">
              <Pressable
                onPress={() => {
                  if (ref && "current" in ref) ref.current?.dismiss();
                }}
                className="w-12 h-12 bg-black/40 rounded-full items-center justify-center backdrop-blur-md"
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
              <Text className="text-white font-bold text-lg">Scan QR Code</Text>
              <View className="w-12" />
            </View>

            <View className="flex-1 items-center justify-center">
              <View className="w-72 h-72 border-2 border-emerald-500/50 rounded-[48px] items-center justify-center">
                <View className="w-64 h-64 border border-white/20 rounded-[40px]" />
              </View>
              <View className="mt-12 bg-black/60 px-8 py-4 rounded-3xl backdrop-blur-md">
                <Text className="text-white font-semibold text-center">
                  Point your camera at a code
                </Text>
              </View>
            </View>

            {/* Bottom Decoration */}
            <View className="absolute bottom-20 left-0 right-0 items-center">
              <View className="w-12 h-1 bg-white/20 rounded-full mb-2" />
              <Text className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Opal Scanner</Text>
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default QRCodeScannerSheet;
