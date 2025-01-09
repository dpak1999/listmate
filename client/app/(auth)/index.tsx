import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const handleSignIn = useCallback(async () => {
    if (!isLoaded) return;

    setIsSigningIn(true);
    setErrors([]);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
    } finally {
      setIsSigningIn(false);
    }
  }, [email, password, isLoaded]);

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        label="Email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(p) => setPassword(p)}
        value={password}
      />

      <Button
        onPress={handleSignIn}
        loading={isSigningIn}
        disabled={!email || !password || isSigningIn}
      >
        Sign in
      </Button>

      {errors.map((err) => (
        <ThemedText key={err.longMessage} style={{ color: "red" }}>
          {err.longMessage}
        </ThemedText>
      ))}

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button variant="ghost" onPress={() => router.replace("/sign-up")}>
          Sign up
        </Button>
      </View>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button variant="ghost" onPress={() => router.push("/reset-password")}>
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}
