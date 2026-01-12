import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


type FeedbackStep = "initial" | "rating" | "thankyou";

const SessionFeedbackScreen = () => {
  const [step, setStep] = useState<FeedbackStep>("initial");
  const [rating, setRating] = useState(0);

  const handlePrimaryButton = () => {
    if (step === "initial") {
      setStep("rating");
    } else {
      console.log("Feedback flow complete.");
    }
  };

  const handleSetRating = (newRating: number) => {
    setRating(newRating);
        setTimeout(() => {
        setStep("thankyou");
    }, 300);
  };
  
  const Stars = ({ currentRating, onRate }: { currentRating: number, onRate: (r: number) => void }) => (
    <View className="flex-row space-x-2">
      {[1, 2, 3, 4, 5].map((index) => (
        <Pressable key={index} onPress={() => onRate(index)}>
          <MaterialCommunityIcons // <-- Corrected component
            name={index <= currentRating ? "star" : "star-outline"} 
            size={40} 
            color={index <= currentRating ? "#38bdf8" : "#71717a"} // sky-400 : zinc-500
          />
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 justify-center items-center">
        {/* Content Area */}
        <View className="flex-1 justify-center items-center w-full px-8">
            {/* <Image source={PartyPopperImage} className="w-24 h-24 mb-4" /> */}

            {step === "initial" && (
                <Text className="text-white text-4xl font-bold">Well Done!</Text>
            )}

            {step === "rating" && (
                <View className="bg-zinc-800 rounded-2xl p-6 w-full items-center">
                    <Text className="text-white text-xl font-bold mb-2">How was your session?</Text>
                    <Text className="text-zinc-400 text-center text-sm mb-6">
                        Your feedback helps us improve Opal for the entire community ❤️
                    </Text>
                    <Stars currentRating={rating} onRate={handleSetRating} />
                </View>
            )}

            {step === "thankyou" && (
                <View className="bg-zinc-800 rounded-2xl p-6 w-full items-center">
                    <Text className="text-white text-xl font-bold mb-2">Thank you!</Text>
                    <Text className="text-zinc-400 text-center text-sm mb-6">
                        If you have any feedback, honesty is appreciated :)
                    </Text>
                    <Stars currentRating={rating} onRate={setRating} />
                    <Pressable className="bg-sky-500 rounded-full py-3 px-8 w-full mt-6 items-center">
                        <Text className="text-white font-bold text-base">Write Feedback</Text>
                    </Pressable>
                </View>
            )}
        </View>

        {/* Floating Action Button */}
        <View className="absolute bottom-10">
            <Pressable 
                onPress={handlePrimaryButton}
                className="bg-sky-500 w-20 h-20 rounded-full items-center justify-center shadow-lg"
            >
                <MaterialCommunityIcons name="check" size={40} color="white" />{/* <-- Corrected component */}
            </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default SessionFeedbackScreen;