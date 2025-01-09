import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { Button } from "@/components/ui/button";
import IconCircle from "@/components/ui/icon-circle";
import { TextInput } from "@/components/ui/text-input";
import { backgroundColors, emojies } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const [listId, setListId] = useState("");

  const router = useRouter();
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);
  const randomEmoji = useMemo(
    () => emojies[Math.floor(Math.random() * emojies.length)],
    []
  );

  const randomColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

  const joinShoppingList = (listId: string) => {};

  const handleJoinList = () => {};

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16, gap: 32 }}>
      <View style={{ alignItems: "center", gap: 16, marginTop: 32 }}>
        <IconCircle
          emoji={randomEmoji}
          style={{ marginBottom: 8 }}
          size={60}
          backgroundColor={randomColor}
        />
        <ThemedText type="title">Better together</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitle}>
          Create shared shopping lists and collaborate in real-time with friends
          and family.
        </ThemedText>
      </View>

      <View style={{ gap: 16 }}>
        <Button onPress={() => handleDismissTo("/list/new/create")}>
          Create new list
        </Button>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View style={styles.line} />
          <ThemedText style={{ color: "grey" }}>
            or join existing list
          </ThemedText>
          <View style={styles.line} />
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <TextInput
          placeholder="Enter list code"
          value={listId}
          onChangeText={(listId) => setListId(listId)}
          containerStyle={{ marginBottom: 0 }}
          onSubmitEditing={(e) => joinShoppingList(e.nativeEvent.text)}
        />

        <Button disabled={!isValidListId} onPress={handleJoinList}>
          Join list
        </Button>

        <Button
          variant="ghost"
          onPress={() => handleDismissTo("/list/new/scan")}
        >
          Scan QR Code
        </Button>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "grey",
    textAlign: "center",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
  },
});
