import { useRef, useEffect } from "react";
import { Text, Animated } from "react-native";

export default function CounterDisplay({ count }: { count: number }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animate on count change
  useEffect(() => {
    scaleAnim.setValue(0.8); // start smaller
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }, [count]);

  return (
    <Animated.Text
      style={{ fontSize: 60, fontWeight: "bold", marginBottom: 40, transform: [{ scale: scaleAnim }] }}
    >
      {count}
    </Animated.Text>
  );
}
