import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;
    setIsSigningUp(true);
    setErrors([]);

    try {
      await signUp.create({ emailAddress: email, password: password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setIsSigningUp(true);
    setErrors([]);

    try {
      const signupAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signupAttempt.status === "complete") {
        await setActive({ session: signupAttempt.createdSessionId });
        router.replace("/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
    } finally {
      setIsSigningUp(false);
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          label={`Please enter verification code sent to ${email}`}
          placeholder="Enter verification code"
          onChangeText={(c) => setCode(c)}
          value={code}
        />

        <Button
          onPress={handleVerify}
          loading={isSigningUp}
          disabled={!code || isSigningUp}
        >
          Verify
        </Button>

        {errors.map((err) => (
          <ThemedText key={err.longMessage} style={{ color: "red" }}>
            {err.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        label="Email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <TextInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <Button
        onPress={handleSignUp}
        loading={isSigningUp}
        disabled={!email || !password || isSigningUp}
      >
        Continue
      </Button>

      {errors.map((err) => (
        <ThemedText key={err.longMessage} style={{ color: "red" }}>
          {err.longMessage}
        </ThemedText>
      ))}

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Already have an account?</ThemedText>
        <Button variant="ghost" onPress={() => router.replace("/")}>
          Sign in
        </Button>
      </View>
    </BodyScrollView>
  );
}
