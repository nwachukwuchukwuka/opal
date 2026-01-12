import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { forwardRef, useCallback, useMemo } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export type QRCodeScannerSheetRef = BottomSheetModal;

const QRCodeScannerSheet = forwardRef<QRCodeScannerSheetRef>((props, ref) => {
  const snapPoints = useMemo(() => ["92%"], []);
  const [permission, requestPermission] = useCameraPermissions();

  const handleScan = ({ data }: { data: string }) => {
    Alert.alert("Scanned Code", data);
    // Add logic to handle the QR code
    if (ref && 'current' in ref) ref.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.8} />
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
      backgroundStyle={{ backgroundColor: "#000" }} // Full black for camera
      handleIndicatorStyle={{ backgroundColor: "#3f3f46" }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {!permission?.granted ? (
          <View className="flex-1 items-center justify-center bg-black px-6">
            <View className="bg-zinc-200 rounded-xl p-6 items-center w-full max-w-sm">
                <Text className="text-black text-lg font-bold text-center mb-2">"Opal" Would Like to Access the Camera</Text>
                <Text className="text-black text-center mb-6">We use your camera to scan QR codes</Text>
                <View className="flex-row justify-between w-full border-t border-zinc-300 pt-4">
                    <Pressable onPress={() => { if (ref && 'current' in ref) ref.current?.dismiss() }} className="flex-1 items-center">
                        <Text className="text-blue-500 text-lg">Don't Allow</Text>
                    </Pressable>
                    <View className="w-[1px] h-full bg-zinc-300 mx-2" />
                    <Pressable onPress={requestPermission} className="flex-1 items-center">
                        <Text className="text-blue-500 text-lg font-bold">Allow</Text>
                    </Pressable>
                </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 bg-black relative">
             <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                onBarcodeScanned={handleScan}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
             />
             {/* Overlay UI */}
             <View className="absolute top-10 right-5">
                 <Pressable onPress={() => { if (ref && 'current' in ref) ref.current?.dismiss() }} className="w-10 h-10 bg-black/50 rounded-full items-center justify-center">
                     <Ionicons name="close" size={24} color="white" />
                 </Pressable>
             </View>
             <View className="flex-1 items-center justify-center">
                 <View className="w-64 h-64 border-2 border-white/50 rounded-3xl" />
                 <Text className="text-white mt-4 bg-black/50 px-4 py-2 rounded-full overflow-hidden">Point camera at a code</Text>
             </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default QRCodeScannerSheet;