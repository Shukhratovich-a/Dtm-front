import React from "react";
import { Link } from "react-router-dom";

import { HOST } from "../../config";

import TextInput from "../Lib/Inputs/Text";
import PasswordInut from "../Lib/Inputs/Password";
import { Select, Option } from "../Lib/Select/Index";
import RadioInput from "../Lib/Inputs/Radio";
import Button from "../Lib/Button/Button";

import Container from "../Container/Contianer";

import styles from "./RegisterForm.module.scss";

const RegisterForm: React.FC = () => {
  const [regions, setRegions] = React.useState<Region[] | []>([]);

  React.useEffect(() => {
    (async () => {
      const responce = await fetch(HOST + "/regions");

      const data = await responce.json();

      if (data.status === 200) {
        setRegions((): Region[] => data.data);
      }
    })();
  }, []);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const target = evt.target as typeof evt.target & {
      userFullName: { value: string };
      userContact: { value: string };
      userName: { value: string };
      userRegion: { value: string };
      userPassword: { value: string };
      userSex: { value: string };
    };

    const userFullName = target.userFullName.value.trim();
    const userContact = target.userContact.value.trim();
    const userName = target.userName.value.trim();
    const userRegion = target.userRegion.value.trim();
    const userPassword = target.userPassword.value.trim();
    const userSex = target.userSex.value.trim();

    (async () => {
      const responce = await fetch(HOST + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userFullName: userFullName,
          userContact: userContact,
          userName: userName,
          userRegion: userRegion,
          userPassword: userPassword,
          userSex: userSex,
        }),
      });

      const data = await responce.json();

      console.log(data);
    })();
  };

  return (
    <Container className={`${styles.container}`}>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <h2 className={`${styles.form__heading}`}>Royhatdan otish</h2>

        <TextInput
          className={`${styles.form__input}`}
          name={"userFullName"}
          placeholder={"full name"}
        />

        <TextInput
          className={`${styles.form__input}`}
          name={"userContact"}
          placeholder={"email or phone"}
        />

        <TextInput className={`${styles.form__input}`} name={"userName"} placeholder={"username"} />

        <Select className={`${styles.form__input}`} name={"userRegion"} placeholder={"viloyat"}>
          {regions.length > 0 &&
            regions.map((region) => (
              <Option key={region.regionId} value={region.regionId}>
                {region.regionName}
              </Option>
            ))}
        </Select>

        <PasswordInut
          className={`${styles.form__input}`}
          name={"userPassword"}
          placeholder={"password"}
        />

        <div className={`${styles.form__bottom}`}>
          <RadioInput
            className={`${styles.form__radio}`}
            value={"male"}
            name={"userSex"}
            label={"erkak"}
            defaultChecked={true}
          />

          <RadioInput
            className={`${styles.form__radio}`}
            value={"female"}
            name={"userSex"}
            label={"ayol"}
          />
        </div>

        <Button className={`${styles.form__button}`} type={"submit"}>
          Royhatdan otish
        </Button>

        <Link className={`${styles.form__link}`} to={"/login"}>
          Hisobingiz bormi? Kirish
        </Link>
      </form>
    </Container>
  );
};

export default RegisterForm;
