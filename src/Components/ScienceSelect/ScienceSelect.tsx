import React from "react";
import { useNavigate } from "react-router-dom";

import { HOST } from "../../config";

import useToken from "../../Hooks/useToken";
import useSelectedSciences from "../../Hooks/useSelectedSciences";

import Button from "../Lib/Button/Button";

import Container from "../Container/Contianer";

import styles from "./ScienceSelect.module.scss";

const ScienceSelect: React.FC = () => {
  const navigate = useNavigate();

  const [token] = useToken();
  const [, setSelectedSciences] = useSelectedSciences();

  const [firstSciences, setFirstSciences] = React.useState<Science[]>([]);
  const [secondSciences, setSecondSciences] = React.useState<Science[]>([]);

  const getSecondSciences = React.useCallback(
    async (id: number) => {
      const responce = await fetch(HOST + "/sciences/second/" + id, {
        headers: {
          token,
        },
      });
      const data = await responce.json();

      if (data.status === 200) {
        setSecondSciences(data.data);
      }
    },
    [token]
  );

  React.useEffect(() => {
    const getFirstScience = async () => {
      const responce = await fetch(HOST + "/sciences/first", {
        headers: {
          token,
        },
      });
      const data = await responce.json();

      if (data.status === 200) {
        setFirstSciences(data.data);
        getSecondSciences(data.data[0].scienceId);
      }
    };

    getFirstScience();
  }, [getSecondSciences, token]);

  const handleChange = React.useCallback(
    (evt: any) => {
      const id: number = evt.target.value;

      setSecondSciences([]);

      getSecondSciences(id);
    },
    [getSecondSciences]
  );

  const handleSubmit = React.useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();

      const target = evt.target as typeof evt.target & {
        firstScience: { value: string };
        secondScience: { value: string };
      };

      const firstScience = target.firstScience.value.trim();
      const secondScience = target.secondScience.value.trim();

      if (!firstScience || !secondScience) return;

      setSelectedSciences({
        firstScienceId: firstScience,
        secondScienceId: secondScience,
      });

      navigate("/direction");
    },
    [navigate, setSelectedSciences]
  );

  return (
    <section className={`${styles.science}`}>
      <Container>
        <form className={`${styles.science__form}`} onSubmit={handleSubmit}>
          <div className={`${styles.science__form__inner}`}>
            <div className={`${styles.science__form__wrapper}`}>
              <h3 className={`${styles.science__wrapper__heading}`}>Birinchi fan</h3>

              <select
                className={`${styles.science__select}`}
                name="firstScience"
                onChange={handleChange}
              >
                {firstSciences!.length > 0 &&
                  firstSciences?.map((science) => (
                    <option value={science.scienceId} key={science.scienceId}>
                      {science.scienceName.charAt(0).toUpperCase() + science.scienceName.slice(1)}
                    </option>
                  ))}
              </select>
            </div>

            <div className={`${styles.science__form__wrapper}`}>
              <h3 className={`${styles.science__wrapper__heading}`}>Ikkinchi fan</h3>

              <select className={`${styles.science__select}`} name="secondScience">
                {secondSciences!.length > 0 &&
                  secondSciences?.map((science) => (
                    <option value={science.scienceId} key={science.scienceId}>
                      {science.scienceName.charAt(0).toUpperCase() + science.scienceName.slice(1)}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <Button className={`${styles.science__form__button}`} type="submit">
            Keyingi
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default ScienceSelect;
