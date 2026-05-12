import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface SupportChatModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm the Opal assistant. How can I help you focus today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const SUGGESTION_CHIPS = [
  "Blocking issue",
  "Subscription info",
  "Bug report",
  "Feature request",
];

export const SupportChatModal = ({
  visible,
  onClose,
}: SupportChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string) => {
    if (query.includes("Blocking issue")) {
      return 'I can help with that. Usually, a quick "Reload Blocks" in the focus tab fixes it. Would you like me to walk you through more steps?';
    }
    if (query.includes("subscription")) {
      return 'You can manage your subscription directly in the subscription hero card at the top of settings.';
    }
    return "I've noted that. Our human support team will get back to you via email if you need further assistance!";
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View
        className={`max-w-[85%] rounded-[28px] p-5 mb-4 ${
          isUser
            ? "bg-emerald-600 self-end rounded-br-lg"
            : "bg-white self-start rounded-bl-lg border border-slate-100"
        }`}
      >
        <Text className={`text-base leading-6 font-medium ${isUser ? "text-white" : "text-slate-700"}`}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-slate-50">
          {/* Symmetrical Premium Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-50">
            <Pressable 
              onPress={onClose}
              className="w-11 h-11 bg-slate-50 rounded-full items-center justify-center border border-slate-100"
            >
              <Ionicons name="close" size={24} color="#059669" />
            </Pressable>
            <View className="items-center">
              <Text className="text-slate-900 font-bold text-lg">Support AI</Text>
              <View className="flex-row items-center">
                 <View className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                 <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Always Active</Text>
              </View>
            </View>
            <Pressable className="w-11 h-11 bg-slate-50 rounded-full items-center justify-center border border-slate-100">
              <Ionicons name="mail-outline" size={22} color="#059669" />
            </Pressable>
          </View>

          {/* Dynamic Chat Canvas */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            ListFooterComponent={
              isTyping ? (
                <View className="bg-white self-start rounded-[24px] rounded-bl-lg p-5 mb-4 border border-slate-100">
                  <ActivityIndicator color="#059669" size="small" />
                </View>
              ) : null
            }
          />

          {/* Interactive Input Hub */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
          >
            <View className="px-6 pb-6 pt-4 bg-white rounded-t-[44px] border-t border-slate-100">
              {/* Suggestion Bento Row */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
                contentContainerStyle={{ gap: 8 }}
              >
                {SUGGESTION_CHIPS.map((chip, index) => (
                  <Pressable
                    key={index}
                    onPress={() => sendMessage(chip)}
                    className="bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100"
                  >
                    <Text className="text-emerald-700 font-bold text-sm">{chip}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Composition Field */}
              <View className="flex-row items-center gap-4">
                <View className="flex-1 bg-slate-50 rounded-[32px] px-6 py-4 border border-slate-100 flex-row items-center">
                  <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Describe your issue..."
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-slate-900 text-base max-h-32"
                    multiline
                  />
                </View>
                <Pressable
                  onPress={() => sendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className={`w-14 h-14 rounded-full items-center justify-center ${
                    inputText.trim() ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                >
                  <Ionicons name="arrow-up" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
