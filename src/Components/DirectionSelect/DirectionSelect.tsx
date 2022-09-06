import React from "react";
import { useNavigate } from "react-router-dom";

import { HOST } from "../../config";

import useToken from "../../Hooks/useToken";
import useSelectedSciences from "../../Hooks/useSelectedSciences";
import useSelectedDirections from "../../Hooks/useSelectedDirections";

import Button from "../Lib/Button/Button";

import Close from "../Lib/Icons/Close";

import Container from "../Container/Contianer";

import styles from "./DirectionSelect.module.scss";

const DirectionSelect: React.FC = () => {
  const navigate = useNavigate();

  const [token] = useToken();
  const [, saveDirections] = useSelectedDirections();
  const [selectedSciences] = useSelectedSciences();

  const [directions, setDirections] = React.useState<Direction[]>([]);
  const [selectedDirections, setSelectedDirections] = React.useState<Direction[]>([]);
  const [selectedDirection, setSelectedDirection] = React.useState<Direction>();

  React.useEffect(() => {
    (async () => {
      const response = await fetch(HOST + "/directions/sciences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(selectedSciences),
      });

      const data = await response.json();

      if (data.status === 200) {
        setDirections(data.data);
        setSelectedDirection(data.data[0]);

        if (data.data.length === 1) {
          setSelectedDirections(data.data);
        }
      }
    })();
  }, [token, selectedSciences]);

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent) => {
      const target = evt.target as typeof evt.target & {
        value: { value: string };
      };

      const id = target.value;
      const selected = directions.find((direction) => Number(direction.directionId) === Number(id));
      const selectedArray: Direction[] = JSON.parse(JSON.stringify(selectedDirections));
      const check = selectedDirections.find(
        (direction) => Number(direction.directionId) === Number(id)
      );

      if (selected && !check && selectedDirections.length < 5) {
        selectedArray.push(selected);
      }

      setSelectedDirections(selectedArray);
      setSelectedDirection(selected);
    },
    [directions, selectedDirections]
  );

  const handleDelete = React.useCallback(
    (evt: any, id: string | number) => {
      if (directions.length > 1) {
        const selectedArray: Direction[] = JSON.parse(JSON.stringify(selectedDirections));

        const index = selectedDirections.findIndex(
          (direction) => Number(direction.directionId) === Number(id)
        );

        selectedArray.splice(index, 1);

        setSelectedDirections(selectedArray);
      }
    },
    [selectedDirections, directions]
  );

  const handleSave = React.useCallback(() => {
    if (selectedDirections.length > 0) {
      saveDirections(selectedDirections);
      navigate("/tests");
    } else {
      saveDirections([]);
    }
  }, [saveDirections, selectedDirections, navigate]);

  return (
    <section className={`${styles.direction__select}`}>
      <Container className={`${styles.container}`}>
        <div className={`${styles.select__inner}`}>
          <div className={`${styles.select__left}`}>
            <form className={`${styles.direction__form}`}>
              <div className={`${styles.direction__form__inner}`}>
                <div className={`${styles.direction__form__wrapper}`}>
                  <h3 className={`${styles.direction__wrapper__heading}`}>Yonalish tanlash</h3>

                  <select
                    className={`${styles.direction__wrapper__select}`}
                    name="direction"
                    onChange={handleChange}
                  >
                    {directions!.length > 0 &&
                      directions?.map((direction) => (
                        <option value={direction.directionId} key={direction.directionId}>
                          {direction.directionName.charAt(0).toUpperCase() +
                            direction.directionName.slice(1)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className={`${styles.select__right}`}>
            <div className={`${styles.select__right__inner}`}>
              <ul className={`${styles.select__right__list}`}>
                {selectedDirections.length > 0 &&
                  selectedDirections.map((direction) => (
                    <li
                      className={`${styles.select__right__item}`}
                      key={direction.directionId}
                      title={direction.directionName}
                    >
                      <span className={`${styles.select__right__text}`}>
                        {direction.directionName}
                      </span>
                      <button
                        className={`${styles.select__right__button}`}
                        onClick={(evt) => handleDelete(evt, direction.directionId)}
                      >
                        <Close />
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            <div className={`${styles.select__right__inner}`}>
              {selectedDirection?.directionId && (
                <div>
                  <h3
                    className={`${styles.select__right__heading}`}
                    title={selectedDirection?.directionName}
                  >
                    {selectedDirection?.directionName}
                  </h3>
                  <span className={`${styles.select__right__region}`}>
                    {selectedDirection?.scienceRegion.regionName}
                  </span>

                  <ul className={`${styles.select__right__quotas}`}>
                    <li className={`${styles.select__right__quota}`}>
                      <span>Grant</span>
                      <span>{selectedDirection?.directionQuota.quotaGrand}</span>
                      <span>{selectedDirection?.directionQuota.quotaGrandBal}</span>
                    </li>
                    <li className={`${styles.select__right__quota}`}>
                      <span>Sharnoma</span>
                      <span>{selectedDirection?.directionQuota.quotaContract}</span>
                      <span>{selectedDirection?.directionQuota.quotaContractBal}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button className={`${styles.science__form__button}`} type="submit" onClick={handleSave}>
          Keyingi
        </Button>
      </Container>
    </section>
  );
};

export default DirectionSelect;
