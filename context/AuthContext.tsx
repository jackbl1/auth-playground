'use client';
import React from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import Cookies from 'js-cookie';

const auth = getAuth(firebase_app);

export interface IAuthContext {
  firebaseUser: any;
  peazeUser: any;
  setPeazeUser: (user: any) => void;
  magicLinkUser: any;
  setMagicLinkUser: (user: any) => void;
  paperUser: any;
  setPaperUser: (user: any) => void;
  fortmaticUser: any;
  setFortmaticUser: (user: any) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  firebaseUser: null,
  peazeUser: null,
  setPeazeUser: (user: any) => {},
  magicLinkUser: null,
  setMagicLinkUser: (user: any) => {},
  paperUser: null,
  setPaperUser: (user: any) => {},
  fortmaticUser: null,
  setFortmaticUser: (user: any) => {},
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [firebaseUser, setFirebaseUser] = React.useState<any>(null);
  const [peazeUser, setPeazeUser] = React.useState<any>(null);
  const [magicLinkUser, setMagicLinkUser] = React.useState<any>(null);
  const [paperUser, setPaperUser] = React.useState<any>(null);
  const [fortmaticUser, setFortmaticUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser('');
      }
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const peazeUserFromCookies = Cookies.get('peazeUser');
    if (peazeUserFromCookies) {
      setPeazeUser(peazeUserFromCookies);
    }
  }, [peazeUser]);

  React.useEffect(() => {
    const magicLinkUserFromCookies = Cookies.get('magicLinkUser');
    if (magicLinkUserFromCookies) {
      setMagicLinkUser(magicLinkUserFromCookies);
    }
  }, [magicLinkUser]);

  React.useEffect(() => {
    const paperUserFromCookies = Cookies.get('paperUser');
    if (paperUserFromCookies) {
      setPaperUser(paperUserFromCookies);
    }
  }, [paperUser]);

  React.useEffect(() => {
    const fortmaticUserFromCookies = Cookies.get('fortmaticUser');
    if (fortmaticUserFromCookies) {
      setFortmaticUser(fortmaticUserFromCookies);
    }
  }, [fortmaticUser]);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        peazeUser,
        setPeazeUser,
        magicLinkUser,
        setMagicLinkUser,
        paperUser,
        setPaperUser,
        fortmaticUser,
        setFortmaticUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
