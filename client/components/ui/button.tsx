import { appleBlue, zincColors } from "@/constants/Colors";
import { FC, ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonVariants = "filled" | "outlined" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  loading = false,
  onPress,
  size = "md",
  style,
  textStyle,
  variant = "filled",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: {
      height: 36,
      fontSize: 14,
      padding: 12,
    },
    md: {
      height: 44,
      fontSize: 16,
      padding: 16,
    },
    lg: {
      height: 55,
      fontSize: 18,
      padding: 20,
    },
  };

  const getVariantStyles = () => {
    const baseStyles: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyles,
          backgroundColor: isDark ? zincColors[50] : zincColors[900],
          borderColor: isDark ? "#fff" : "#000",
        };
      case "outlined":
        return {
          ...baseStyles,
          borderColor: isDark ? zincColors[700] : zincColors[300],
          backgroundColor: "transparent",
          borderWidth: 1,
        };
      case "ghost":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }

    switch (variant) {
      case "filled":
        return isDark ? zincColors[900] : zincColors[50];
      case "outlined":
      case "ghost":
        return appleBlue;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyles(),
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: "700",
            },
            textStyle,
          ])}
        >
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
};
