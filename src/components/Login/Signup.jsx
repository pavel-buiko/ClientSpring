import LoginInput from "./loginInput/loginInput";
import LoginButton from "./loginButton/LoginButton";
import logo from "../../../public/assets/images/spring.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();

    //const response = fetch("api/signup");
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <div className="signup">
        <div className="signup__header">
          <img className="login__header__image" src={logo} alt="logo_icon" />
        </div>
        <div className="signup__wrapper">
          <div className="signup__wrapper__details">
            <p className="signup__wrapper__details__sentence">
              Please, create an account
            </p>
            <h4 className="signup__wrapper__details__title">Welcome</h4>
          </div>

          <div className="signup__wrapper__info">
            <form onSubmit={handleSignup}>
              <div className="signup__wrapper__inputs">
                <LoginInput
                  type="text"
                  name="firstname"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
                <LoginInput
                  type="text"
                  name="secondname"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
                <LoginInput
                  type="username"
                  name="username"
                  value={username}
                  placeholder="Email"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <LoginInput
                  name="age"
                  type="number"
                  value={age}
                  placeholder="Enter ypur age"
                  onChange={(e) => setAge(e.target.value)}
                />
                <span className="signup__error">{signupError}</span>
              </div>

              <div className="signup__wrapper__buttons">
                <LoginButton type="submit" label="Create Account" />
                <LoginButton
                  type="button"
                  label="Back to Login"
                  onClick={handleLoginRedirect}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
