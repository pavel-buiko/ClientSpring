import { useState } from "react";
import LoginInput from "./loginInput/loginInput";
import LoginButton from "./loginButton/LoginButton";
import logo from "../../../public/assets/images/spring.png";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("18");

  //F or possible client input errors
  const [errors, setErrors] = useState({});

  // For possible server errors
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    setErrors({});

    try {
      const response = await fetch(
        "https://server-ancient-grass-9030.fly.dev/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            password,
            confirmPassword,
            age,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else if (response.status === 400 && data.errors) {
        setErrors(data.errors);
      } else {
        setSignupError(data.message || "Registration error.");
      }
    } catch (error) {
      console.error("registration error:", error);
      setSignupError("Registration error happend.");
    }
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
                {errors.firstName && (
                  <span className="login__error">{errors.firstName}</span>
                )}

                <LoginInput
                  type="text"
                  name="secondname"
                  value={lastName}
                  placeholder="Secondary Name"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <span className="login__error">{errors.lastName}</span>
                )}

                <LoginInput
                  type="text"
                  name="username"
                  value={username}
                  placeholder="User Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <span className="login__error">{errors.username}</span>
                )}

                <LoginInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="login__error">{errors.password}</span>
                )}

                <LoginInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <span className="login__error">{errors.confirmPassword}</span>
                )}

                <LoginInput
                  name="age"
                  type="number"
                  value={age}
                  min={18}
                  placeholder="Enter your age"
                  onChange={(e) => setAge(e.target.value)}
                />
                {errors.age && (
                  <span className="login__error">{errors.age}</span>
                )}

                {signupError && (
                  <span className="login__error">{signupError}</span>
                )}
              </div>

              <div className="signup__wrapper__buttons">
                <LoginButton type="submit" label="Create an account" />
                <LoginButton
                  type="button"
                  label="Back to login"
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
