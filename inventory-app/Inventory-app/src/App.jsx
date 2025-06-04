import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  if (!user) {
    return showSignUp ? (
      <SignUp
        onSignUp={setUser}
        switchToLogin={() => setShowSignUp(false)}
      />
    ) : (
      <Login
        onLogin={setUser}
        switchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>You are logged in.</p>
    </div>
  );
}

export default App;
