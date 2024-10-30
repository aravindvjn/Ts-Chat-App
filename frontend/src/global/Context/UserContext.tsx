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
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
};

export const UserContext = createContext<ContextProps | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const value = useMemo(() => ({ user, setUser, refresh, setRefresh }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
