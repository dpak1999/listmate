import { createContext, ReactNode, useContext, useState } from "react";

type ListCreationContextType = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedEmoji: (emoji: string) => void;
  setSelectedColor: (color: string) => void;
};

const ListCreationContext = createContext<ListCreationContextType | undefined>(
  undefined
);

export function ListCreationProvider({ children }: { children: ReactNode }) {
  const [selectedEmoji, setSelectedEmoji] = useState("🛒");
  const [selectedColor, setSelectedColor] = useState("#9CCAFF");

  return (
    <ListCreationContext.Provider
      value={{
        selectedEmoji,
        selectedColor,
        setSelectedColor,
        setSelectedEmoji,
      }}
    >
      {children}
    </ListCreationContext.Provider>
  );
}

export function useListCreation() {
  const context = useContext(ListCreationContext);
  if (context === undefined) {
    throw new Error(
      "useListCreation must be used within a ListCreationProvider"
    );
  }

  return context;
}
