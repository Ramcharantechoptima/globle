import React, { useState, useEffect } from "react";
const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const getEndDate = () => {
      let endDate = localStorage.getItem("endDate");
      if (!endDate) {
        const now = new Date();
        const twoMonthsLater = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        );
        endDate = twoMonthsLater.toISOString();
        localStorage.setItem("endDate", endDate);
      }
      return new Date(endDate);
    };

    const calculateCountdown = () => {
      const endDate = getEndDate();
      const now = new Date();
      const timeLeft = endDate - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid" id="loginContent">
      <div className="welcomemessage">We are comming</div>
      <div className="countdown">Time remaining: {countdown}</div>
      <div className="container-fluid" id="divForm">
        <h3 class="head">Optima AI Hiring</h3>
        <h3 class="head">Sign in to Optima AI Hiring</h3>
        <p class="greyText">
          Continue with the Google account or email address you to sign in.
        </p>
        <label class="loginLabel">User Name</label>
        <input
          type="email"
          class="loginInput"
          placeholder="Enter Username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p id="usernameErrorText" class="errorText"></p>
        <label class="loginLabel">Password</label>
        <input
          type="password"
          class="loginInput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p id="passwordErrorText" class="errorText"></p>
        <p id="forgot">Forgot Passowrd?</p>
        <div className="container-fluid" id="divLoginBtns">
          <button id="btnReset">Reset</button>
          <button id="btnLoginSubmit">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
