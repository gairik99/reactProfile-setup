import { useContext, createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    photo: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export { useUser, UserProvider };
