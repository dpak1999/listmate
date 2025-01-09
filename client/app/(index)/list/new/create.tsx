import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { Link, Stack } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateListScreen() {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  const { selectedEmoji, selectedColor, setSelectedColor, setSelectedEmoji } =
    useListCreation();

  const handleCreateList = () => {};

  useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    return () => {
      setSelectedColor("");
      setSelectedEmoji("");
    };
  }, []);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "New list",
        }}
      />

      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter list name"
            size="lg"
            variant="ghost"
            returnKeyType="done"
            onSubmitEditing={() => {}}
            value={listName}
            onChangeText={setListName}
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />

          <Link
            href={{ pathname: "/emoji-picker" }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>

          <Link
            href={{ pathname: "/color-picker" }}
            style={[styles.colorButton, { borderColor: selectedColor }]}
          >
            <View style={styles.colorContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link>
        </View>

        <TextInput
          placeholder="Description (optional)"
          variant="ghost"
          returnKeyType="done"
          inputStyle={styles.descriptionInput}
          onSubmitEditing={handleCreateList}
          value={listDescription}
          onChangeText={setListDescription}
        />

        <Button variant="ghost" onPress={handleCreateList} disabled={!listName}>
          Create list
        </Button>
      </BodyScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
