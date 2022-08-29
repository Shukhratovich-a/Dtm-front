import Navigation from "../../Components/Navigation/Navigation";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";

import styles from "./Register.module.scss";

const Register = () => {
  return (
    <main className={`${styles['main--register']} main`}>
      <Navigation className={`${styles.register__navigation}`} />
      <RegisterForm />
    </main>
  );
};

export default Register;
