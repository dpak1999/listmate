import { ThemedText } from "@/components/ThemedText";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <ThemedText type="title">Sign in</ThemedText>
      <Link href={"/sign-up"}>Go to sign up</Link>
    </View>
  );
}
