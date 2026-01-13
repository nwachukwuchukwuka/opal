import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { COLORS } from "../constants";
import { SessionNameSheetProps } from "../types";

const SessionNameSheet = forwardRef<BottomSheetModal, SessionNameSheetProps>(
  ({ initialName, onConfirm, onClose }, ref) => {
    const [name, setName] = useState(initialName);

    const snapPoints = useMemo(() => ["18%"], []);

    useEffect(() => {
      setName(initialName);
    }, [initialName]);

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

    const handleConfirm = () => {
      Keyboard.dismiss();
      onConfirm(name.trim() || "Focus Session");
      onClose();
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#27272a" }}
        handleIndicatorStyle={{ backgroundColor: "#52525b" }}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 px-5">
          {/* Input */}
          <View className="bg-zinc-800 rounded-xl px-4 py-3 ">
            <BottomSheetTextInput
              value={name}
              defaultValue={initialName}
              onChangeText={setName}
              placeholder="Focus Session"
              placeholderTextColor={COLORS.zinc500}
              autoFocus
              selectTextOnFocus
              style={{
                color: "#ffffff",
                fontSize: 18,
                padding: 0,
                margin: 0,
              }}
            />
          </View>

          {/* Done Button */}
          <Pressable
            onPress={handleConfirm}
            className="w-full py-4 rounded-3xl bg-zinc-700 active:bg-zinc-600"
          >
            <Text className="text-white text-center text-base font-semibold">
              Done
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

SessionNameSheet.displayName = "SessionNameSheet";

export default SessionNameSheet;
