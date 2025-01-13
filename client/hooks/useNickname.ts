import { useUser } from "@clerk/clerk-expo";

export const useUserIdAndNickname = () => {
  const user = useUser().user;
  if (user) {
    return [user.id, user.fullName];
  }
};
