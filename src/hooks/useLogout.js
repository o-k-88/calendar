import { useEffect, useContext } from "react";
import { Context } from "context";

export const useLogout = (timestamp, func) => {
  const { handleLogout } = useContext(Context);

  const onLogout = () => {
    sessionStorage.setItem("token", "");
    handleLogout(true);
  };

  useEffect(() => {
    if (!timestamp) return;

    const now = Date.now();
    const targetTime = timestamp;
    let interval;

    const checked = () => {
      if (now >= targetTime) {
        onLogout();
        clearInterval(interval);
      }
    };

    checked();
    interval = setInterval(checked, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);
  return { onLogout };
};
