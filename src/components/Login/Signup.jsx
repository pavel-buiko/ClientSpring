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
  const [age, setAge] = useState("");

  //for possible client input errors
  const [errors, setErrors] = useState({});

  //for possible server errors
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "Имя обязательно для заполнения";
    }

    if (!lastName.trim()) {
      errors.lastName = "Фамилия обязательна для заполнения";
    }

    if (!username.trim()) {
      errors.username = "Имя пользователя обязательно для заполнения";
    }

    if (!password) {
      errors.password = "Пароль обязателен для заполнения";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Подтвердите пароль";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    }

    if (!password) {
      errors.password = "Пароль обязателен для заполнения";
    } else if (password.length < 4) {
      errors.password = "Пароль должен содержать не менее 4 символов";
    }
    if (!age) {
      errors.age = "Укажите ваш возраст";
    } else {
      const ageNumber = Number(age);

      if (isNaN(ageNumber)) {
        errors.age = "Возраст должен быть числом";
      } else if (ageNumber < 18 || ageNumber > 100) {
        errors.age = "Возраст должен быть между 18 и 100 годами";
      }
    }

    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          age,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        setSignupError(data.message || "Ошибка при регистрации.");
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setSignupError("Произошла ошибка при регистрации.");
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
              Пожалуйста, создайте аккаунт
            </p>
            <h4 className="signup__wrapper__details__title">
              Добро пожаловать
            </h4>
          </div>

          <div className="signup__wrapper__info">
            <form onSubmit={handleSignup}>
              <div className="signup__wrapper__inputs">
                <LoginInput
                  type="text"
                  name="firstname"
                  value={firstName}
                  placeholder="Имя"
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
                  placeholder="Фамилия"
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
                  placeholder="Имя пользователя"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <span className="login__error">{errors.username}</span>
                )}

                <LoginInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Пароль"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="login__error">{errors.password}</span>
                )}

                <LoginInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="Подтвердите пароль"
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
                  placeholder="Введите ваш возраст"
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
                <LoginButton type="submit" label="Создать аккаунт" />
                <LoginButton
                  type="button"
                  label="Назад к входу"
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
