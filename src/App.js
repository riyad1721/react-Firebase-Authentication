import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initilize';

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
  const handleSignIn = e => {
    e.preventDefault();
    const auth = getAuth();
    if (password.length < 6) {
      setError('please provide at least 6 character ');
      return;

    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })


    console.log(email, password);

  }
  const handleEmailInput = e => {
    setEmail(e.target.value);

  }
  const handlePasswordInput = e => {
    setPassword(e.target.value);

  }
  return (
    <div className="mx-5 mt-5">
      <form onSubmit={handleSignIn}>
        <div className="row mb-6 mt-10">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" onBlur={handleEmailInput} className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePasswordInput} className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div className="row mb-3 mx-5 bg-danger">{error}</div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>

      {/* <form onSubmit={handleSignIn}>
        <h2>Please Sign In</h2>
        <label htmlhtmlFor="">Email:</label>
        <input type="email" name="email" id="" />
        <br /> <br />
        <label htmlhtmlFor="">Password:</label>
        <input type="password" name="password" id="" />
        <br /><br />
        <input type="submit" value="Sign in" />
      </form> */}


      {/* <button onClick={handleGoogleSignIN}>Google Sign In</button>
      <button onClick={handleSignOut}>Sing Out</button>
      {
        users.email && <div>
          <h2>Welcome {users.name}</h2>
          <h4>Your Email Adress is {users.email}</h4>
          <img src={users.image} alt="" />

        </div>
      } */}
    </div>
  );
}

export default App;
