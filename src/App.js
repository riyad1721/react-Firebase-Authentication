import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initilize';

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {

  const [users, setUsers] = useState([]);

  const handleGoogleSignIN = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email, photoURL } = result.user;
        const loggInUser = {
          name: displayName,
          email: email,
          image: photoURL
        };
        setUsers(loggInUser);

        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUsers({})
      })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIN}>Google Sign In</button>
      <button onClick={handleSignOut}>Sing Out</button>
      {
        users.email && <div>
          <h2>Welcome {users.name}</h2>
          <h4>Your Email Adress is {users.email}</h4>
          <img src={users.image} alt="" />

        </div>
      }
    </div>
  );
}

export default App;
