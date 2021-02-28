import logo from "./logo.svg";
import "./App.css";
import ToDoApp from "./RapptrLabs/ToDoApp";
import LoginForm from "./RapptrLabs/LoginForm";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogOut = () => setIsLoggedIn(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <ToDoApp handleLogOut={handleLogOut} />
      ) : (
        <LoginForm name="Login form" updateLoginStatus={updateLoginStatus} />
      )}
    </div>
  );
};

export default App;
