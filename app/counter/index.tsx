import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animate = () => {
    scaleAnim.setValue(0.8);
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  const update = (delta: number) => {
    setCount(prev => prev + delta);
    animate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>

      <Animated.Text style={[styles.counter, { transform: [{ scale: scaleAnim }] }]}>
        {count}
      </Animated.Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.decrease]} onPress={() => update(-1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.increase]} onPress={() => update(1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d4ed8",
    marginBottom: 20,
  },
  counter: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#2563eb",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  decrease: {
    backgroundColor: "#ef4444",
  },
  increase: {
    backgroundColor: "#22c55e",
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
});
