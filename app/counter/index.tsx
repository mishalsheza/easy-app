import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Minus, Plus, ChevronUp, ChevronDown, RotateCcw } from "lucide-react-native";

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handleUpdate = (delta: number) => {
    setIsAnimating(true);
    setCount(prev => prev + delta);
    Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }).start(() => {
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
      setIsAnimating(false);
    });
  };

  const handleReset = () => {
    setIsAnimating(true);
    setCount(0);
    Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }).start(() => {
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
      setIsAnimating(false);
    });
  };

  const getStatus = () => {
    if (count > 0) return { text: "Positive", color: "#16a34a", bg: "#dcfce7" };
    if (count < 0) return { text: "Negative", color: "#b91c1c", bg: "#fee2e2" };
    return { text: "Zero", color: "#374151", bg: "#e5e7eb" };
  };

  const status = getStatus();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.subtitle}>Track your count with style</Text>

      {/* Counter Display */}
      <View style={styles.counterCard}>
        <Animated.Text style={[styles.count, { transform: [{ scale: scaleAnim }] }]}>
          {count}
        </Animated.Text>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={{ color: status.color }}>{status.text}</Text>
        </View>
      </View>

      {/* Primary Controls */}
      <View style={styles.primaryControls}>
        <TouchableOpacity style={[styles.button, styles.decrease]} onPress={() => handleUpdate(-1)}>
          <Minus strokeWidth={2.5} />
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.increase]} onPress={() => handleUpdate(1)}>
          <Plus strokeWidth={2.5} />
          <Text style={styles.buttonText}>Increase</Text>
        </TouchableOpacity>
      </View>

      {/* Secondary Controls */}
      <View style={styles.secondaryControls}>
        <TouchableOpacity style={styles.smallButton} onPress={() => handleUpdate(-10)}>
          <ChevronDown strokeWidth={2} />
          <Text style={styles.smallButtonText}>-10</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={handleReset}>
          <RotateCcw strokeWidth={2} />
          <Text style={styles.smallButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={() => handleUpdate(10)}>
          <ChevronUp strokeWidth={2} />
          <Text style={styles.smallButtonText}>+10</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  },
  counterCard: {
    backgroundColor: "#fff",
    padding: 70,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 15, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  count: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12, // reduced from 16
    borderRadius: 14, // slightly smaller
    alignItems: "center",
    marginHorizontal: 6, // adjusted spacing
  },
  increase: { backgroundColor: "#16a34a" },
  decrease: { backgroundColor: "#dc2626" },
  buttonText: {
    color: "#fff",
    marginTop: 4,
    fontWeight: "600",
  },
  secondaryControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smallButton: {
    flex: 1,
    paddingVertical: 8, // reduced from 12
    borderRadius: 10, 
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    marginHorizontal: 4,
  },
  smallButtonText: {
    fontSize: 11, // slightly smaller
    marginTop: 2,
    fontWeight: "500",
  },
});
