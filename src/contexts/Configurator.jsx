import { createContext, useContext, useState } from "react";
const ConfiguratorContext = createContext();
export const ConfiguratorProvider = ({ children }) => {
  const [follow, setFollow] = useState(true);
  return (
    <ConfiguratorContext.Provider
      value={{
        follow,
        setFollow,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};
export const useConfigurator = () => {
  return useContext(ConfiguratorContext);
};
