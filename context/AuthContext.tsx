import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { PeazeSDK, SupportedNetwork } from "@peaze-labs/react";
import { Magic } from "magic-sdk";
import Cookies from "js-cookie";

const auth = getAuth(firebase_app);

const peaze = new PeazeSDK({
  id: process.env.NEXT_PUBLIC_PEAZE_PROJECT_ID || "",
  key: process.env.NEXT_PUBLIC_PEAZE_PROJECT_KEY || "",
  environment: "STAGING",
  network: {
    chainId: SupportedNetwork.PolygonMumbai,
  },
});

export interface IAuthContext {
  firebaseUser: any;
  peazeUser: any;
  peazeSignin: () => Promise<void>;
  peazeSignout: () => Promise<void>;
  magicLinkUser: any;
  magicLinkSignin: () => Promise<void>;
  magicLinkSignout: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({
  firebaseUser: null,
  peazeUser: null,
  peazeSignin: async () => {},
  peazeSignout: async () => {},
  magicLinkUser: null,
  magicLinkSignin: async () => {},
  magicLinkSignout: async () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [firebaseUser, setFirebaseUser] = React.useState<any>(null);
  const [peazeUser, setPeazeUser] = React.useState<any>(null);
  const [magicLinkUser, setMagicLinkUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "", {
    network: "mainnet",
  });

  const peazeSignin = async () => {
    const signer = await peaze.getSigner();
    setPeazeUser(signer.address);
    Cookies.set("peazeUser", signer.address);
  };

  const peazeSignout = async () => {
    setPeazeUser(null);
    Cookies.remove("peazeUser");
  };

  const magicLinkSignin = async () => {
    try {
      const accounts = await magic.wallet.connectWithUI();
      setMagicLinkUser(accounts?.[0]);
      Cookies.set("magicLinkUser", accounts?.[0]);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const magicLinkSignout = async () => {
    try {
      await magic.user.logout();
      Cookies.remove("magicLinkUser");
      setMagicLinkUser(null);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const peazeUserFromCookies = Cookies.get("peazeUser");
    if (peazeUserFromCookies) {
      setPeazeUser(peazeUserFromCookies);
    }
  }, [peazeUser]);

  React.useEffect(() => {
    const magicLinkUserFromCookies = Cookies.get("magicLinkUser");
    if (magicLinkUserFromCookies) {
      setMagicLinkUser(magicLinkUserFromCookies);
    }
  }, [magicLinkUser]);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        peazeUser,
        peazeSignin,
        peazeSignout,
        magicLinkUser,
        magicLinkSignin,
        magicLinkSignout,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
