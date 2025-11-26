import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500 mb-6">
        Welcome to the App!
      </Text>

      <TouchableOpacity onPress={() => router.push("/counter")}>
        <Text className="text-blue-600 underline text-lg">Go to Counter</Text>
      </TouchableOpacity>
    </View>
  );
}