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
    text: "👋 Hi! I am Opal AI. Ask me anything about Opal.",
    sender: "bot",
    timestamp: new Date(),
  },
];

const SUGGESTION_CHIPS = [
  "Blocking issue",
  "My subscription info",
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

    // Simulate Bot Response
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
      return 'Thanks for reaching out about the blocking issue! Here\'s how you can troubleshoot it:\n\n1. Reload Blocks: Open the Opal app, tap on the "Blocks" tab, hit the "Reload Blocks" icon.\n\n2. Close and Reopen Opal: Force close the Opal app and open it again.\n\n3. Restart Your Device.';
    }
    if (query.includes("cancel a session")) {
      return 'To cancel a Session in Opal, follow these steps:\n\n1. Open the Opal app.\n2. Tap on the "Home" tab.\n3. Tap on your ongoing Session.\n4. At the bottom right, tap "..." or "Leave Early".';
    }
    return "I'm not sure about that specific question, but our human support team can help if you email support@opal.so!";
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View
        className={`max-w-[80%] rounded-2xl p-4 mb-3 ${
          isUser
            ? "bg-[#007AFF] self-end rounded-br-none"
            : "bg-zinc-800 self-start rounded-bl-none"
        }`}
      >
        <Text className="text-white text-base leading-5">{item.text}</Text>
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
        <SafeAreaView className="flex-1 bg-black">
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-zinc-900">
            <Pressable onPress={onClose} className="p-2">
              <Ionicons name="close" size={28} color="white" />
            </Pressable>
            <Text className="text-white font-bold text-lg">Support</Text>
            <Pressable className="p-2">
              <Ionicons name="mail-outline" size={24} color="white" />
            </Pressable>
          </View>

          {/* Chat Area */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            ListFooterComponent={
              isTyping ? (
                <View className="bg-zinc-800 self-start rounded-2xl rounded-bl-none p-4 mb-3">
                  <ActivityIndicator color="white" size="small" />
                </View>
              ) : null
            }
          />

          {/* Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
          >
            <View className="px-4 pb-2">
              {/* Suggestion Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-3"
              >
                {SUGGESTION_CHIPS.map((chip, index) => (
                  <Pressable
                    key={index}
                    onPress={() => sendMessage(chip)}
                    className="bg-zinc-800 px-4 py-2 rounded-full mr-2 border border-zinc-700"
                  >
                    <Text className="text-white font-medium">{chip}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Text Input Row */}
              <View className="flex-row items-center gap-3 bg-black pb-2">
                <View className="flex-1 bg-zinc-900 rounded-full px-4 py-3 border border-zinc-800 flex-row items-center">
                  <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type your message here"
                    placeholderTextColor="#71717a"
                    className="flex-1 text-white text-base max-h-24"
                    multiline
                  />
                </View>
                <Pressable
                  onPress={() => sendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    inputText.trim() ? "bg-[#007AFF]" : "bg-zinc-800"
                  }`}
                >
                  <Ionicons name="send" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};



