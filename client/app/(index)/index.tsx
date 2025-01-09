import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    );
  };

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Home</ThemedText>
        <Button onPress={signOut}>Sign out</Button>
      </BodyScrollView>
    </Fragment>
  );
}
