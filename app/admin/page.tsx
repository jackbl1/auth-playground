"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Page() {
  const {
    firebaseUser,
    peazeUser,
    //peazeSignout,
    magicLinkUser,
    magicLinkSignout,
  } = useAuthContext();
  const auth = getAuth();

  const [signoutAlert, setSignoutAlert] = React.useState(false);
  const [signoutMessage, setSignoutMessage] = React.useState("Signed-out");
  const [signinAlert, setSigninAlert] = React.useState(false);
  const [signinMessage, setSigninMessage] = React.useState("Signed-in");

  const handleFirebaseSignout = async () => {
    await signOut(auth)
      .then(() => {
        setSignoutMessage("Signed out of Firebase");
        setSignoutAlert(true);
      })
      .catch((e) => {
        console.error("sign-out failed");
        console.error(e.message);
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSignoutAlert(false);
    setSigninAlert(false);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:text-left">
          {firebaseUser && (
            <div className="group rounded-lg border mb-5 px-5 py-4 transition-colors border-red-700 bg-orange-500">
              <h2 className={`mb-3 text-2xl font-semibold`}>Firebase</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {firebaseUser.email}
              </p>
              <Button variant="contained" onClick={handleFirebaseSignout}>
                Signout
              </Button>
            </div>
          )}

          {/* {peazeUser && (
            <div className="group rounded-lg border mb-5 px-5 py-4 text-white bg-black pattern-isometric pattern-blue-800 pattern-opacity-100 pattern-size-16">
              <h2 className={`mb-3 text-2xl font-semibold`}>Peaze</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {peazeUser}
              </p>
              <Button variant="contained" onClick={peazeSignout}>
                Signout
              </Button>
            </div>
          )} */}

          {magicLinkUser && (
            <div className="group rounded-lg border mb-5 px-5 py-4 transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-indigo-500 via-purple-500 to-pink-500">
              <h2 className={`mb-3 text-2xl font-semibold `}>Magic Link</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {magicLinkUser}
              </p>
              <Button variant="contained" onClick={magicLinkSignout}>
                Signout
              </Button>
            </div>
          )}
        </div>
      </main>

      <Snackbar
        open={signoutAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {signoutMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={signinAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {signinMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Page;
