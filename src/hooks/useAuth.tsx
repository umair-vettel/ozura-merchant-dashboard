import { useEffect, useState } from "react";

interface AuthState {
  user: any;
  loading: boolean;
  verified: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(true);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(localStorage.getItem("user") || "");
      setUser(true);
    }
    setLoading(false);
  }, []);

  return { user, loading, verified };
}
