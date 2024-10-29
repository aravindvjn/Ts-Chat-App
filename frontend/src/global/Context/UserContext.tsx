import React, { createContext, useState, useMemo } from "react";

export type UserProps = {
  username: string;
  bio: string;
  created_at: string;
  profile_pic_url: string;
  user_id: string;
  name: string;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export type ContextProps = {
  user: UserProps | null; // Update to UserProps | null
  setUser: (user: UserProps | null) => void; // Accept UserProps or null
};

export const UserContext = createContext<ContextProps | null>(null); // Default value is null

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null); // Initial user state

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
