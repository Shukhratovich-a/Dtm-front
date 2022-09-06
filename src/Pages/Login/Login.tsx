import Navigation from "../../Components/Navigation/Navigation";
import LoginForm from "../../Components/LoginForm/LoginForm";

import styles from "./Login.module.scss";

const Register = () => {
  return (
    <main className={`${styles["main--register"]} main`}>
      <Navigation className={`${styles.register__navigation}`} to={"/"} />
      <LoginForm />
    </main>
  );
};

export default Register;
