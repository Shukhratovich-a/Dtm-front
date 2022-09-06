import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { HOST } from "../../config";

import useToken from "../../Hooks/useToken";

import TextInput from "../Lib/Inputs/Text";
import PasswordInut from "../Lib/Inputs/Password";
import Button from "../Lib/Button/Button";

import Container from "../Container/Contianer";

import styles from "./LoginForm.module.scss";

const RegisterForm: React.FC = () => {
  const [, setToken] = useToken();
  const navigate = useNavigate();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const target = evt.target as typeof evt.target & {
      userName: { value: string };
      userPassword: { value: string };
    };

    const userName = target.userName.value.trim();
    const userPassword = target.userPassword.value.trim();

    (async () => {
      const responce = await fetch(HOST + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          userPassword: userPassword,
        }),
      });

      const data = await responce.json();

      if (data.status === 200) {
        setToken(data.token);
        navigate("/science");
      }
    })();
  };

  return (
    <Container className={`${styles.container}`}>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <h2 className={`${styles.form__heading}`}>Tizimga kirish</h2>

        <TextInput
          className={`${styles.form__input}`}
          name={"userName"}
          placeholder={"username or contact"}
        />

        <PasswordInut
          className={`${styles.form__input}`}
          name={"userPassword"}
          placeholder={"password"}
        />

        <Button className={`${styles.form__button}`} type={"submit"}>
          Tizimga kirish
        </Button>

        <Link className={`${styles.form__link}`} to={"/register"}>
          Hisobingiz yoqmi? Royxatdan o'tish
        </Link>
      </form>
    </Container>
  );
};

export default RegisterForm;
