'use client';
import React from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { PeazeSDK, SupportedNetwork } from '@peaze-labs/react';

import { Magic } from 'magic-sdk';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const auth = getAuth(firebase_app);

export interface IAuthContext {
  firebaseUser: any;
  firebaseSignout: () => Promise<void>;
  peazeUser: any;
  peazeSignin: () => Promise<void>;
  peazeSignout: () => Promise<void>;
  magicLinkUser: any;
  magicLinkSignin: () => Promise<void>;
  magicLinkSignout: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({
  firebaseUser: null,
  firebaseSignout: async () => {},
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

  const [signoutAlert, setSignoutAlert] = React.useState(false);
  const [signoutMessage, setSignoutMessage] = React.useState('Signed-out');
  const [signinAlert, setSigninAlert] = React.useState(false);
  const [signinMessage, setSigninMessage] = React.useState('Signed-in');

  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || '', {
    network: 'mainnet',
  });

  const peaze = new PeazeSDK({
    id: process.env.NEXT_PUBLIC_PEAZE_PROJECT_ID || '',
    key: process.env.NEXT_PUBLIC_PEAZE_PROJECT_KEY || '',
    environment: 'STAGING',
    network: {
      chainId: SupportedNetwork.PolygonMumbai,
    },
  });

  const peazeSignin = async () => {
    setLoading(true);
    try {
      const signer = await peaze.getSigner();
      setPeazeUser(signer.address);
      Cookies.set('peazeUser', signer.address);
      setSigninMessage('Signed in with Peaze');
      setSigninAlert(true);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const peazeSignout = async () => {
    setLoading(true);
    try {
      setPeazeUser(null);
      Cookies.remove('peazeUser');
      setSignoutMessage('Signed out of Peaze');
      setSignoutAlert(true);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const magicLinkSignin = async () => {
    setLoading(true);
    try {
      const accounts = await magic.wallet.connectWithUI();
      setMagicLinkUser(accounts?.[0]);
      Cookies.set('magicLinkUser', accounts?.[0]);
      setSigninMessage('Signed in with MagicLink');
      setSigninAlert(true);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const magicLinkSignout = async () => {
    setLoading(true);
    try {
      await magic.user.logout();
      Cookies.remove('magicLinkUser');
      setMagicLinkUser(null);
      setSignoutMessage('Signed out of MagicLink');
      setSignoutAlert(true);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const firebaseSignout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setSignoutMessage('Signed out of Firebase');
        setSignoutAlert(true);
      })
      .catch((e) => {
        console.error('sign-out failed');
        console.error(e.message);
      });
    setLoading(false);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSignoutAlert(false);
    setSigninAlert(false);
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser('');
      }
      setLoading(false);
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

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        firebaseSignout,
        peazeUser,
        peazeSignin,
        peazeSignout,
        magicLinkUser,
        magicLinkSignin,
        magicLinkSignout,
      }}
    >
      {children}
      <Snackbar
        open={signoutAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {signoutMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={signinAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {signinMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};
