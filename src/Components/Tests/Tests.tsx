import React from "react";
import { useNavigate } from "react-router-dom";

import { HOST } from "../../config";

import useToken from "../../Hooks/useToken";
import useSelectedSciences from "../../Hooks/useSelectedSciences";
import useSelectedDirections from "../../Hooks/useSelectedDirections";

import RadioInput from "../Lib/Inputs/Radio";
import Button from "../Lib/Button/Button";

import Container from "../Container/Contianer";

import styles from "./Tests.module.scss";

const Tests: React.FC<Props & { scienceId?: number | string }> = ({ className }) => {
  const navigate = useNavigate();

  const [token] = useToken();
  const [sciences] = useSelectedSciences();
  const [directions] = useSelectedDirections();

  const [firstTests, setFirstTests] = React.useState<Test[]>([]);
  const [secondTests, setSecondTests] = React.useState<Test[]>([]);

  React.useEffect(() => {
    (async () => {
      const firstResponce = await fetch(HOST + "/tests/science/" + sciences.firstScienceId, {
        headers: {
          token,
        },
      });
      const secondResponce = await fetch(HOST + "/tests/science/" + sciences.secondScienceId, {
        headers: {
          token,
        },
      });

      const firstData = await firstResponce.json();
      const secondData = await secondResponce.json();

      if (firstData.status === 200) {
        setFirstTests(firstData.data);
      }

      if (secondData.status === 200) {
        setSecondTests(secondData.data);
      }
    })();
  }, [sciences, token]);

  const handleSubmit = React.useCallback(
    async (evt: any) => {
      evt.preventDefault();

      let firstCount: number = 0;
      let secondCount: number = 0;

      for (let test of firstTests) {
        const variants = evt.target[test.testId + test.science.scienceName];
        for (let variant of variants) {
          if (variant.checked === true && variant.value === "true") firstCount++;
        }
      }

      for (let test of secondTests) {
        const variants = evt.target[test.testId + test.science.scienceName];
        for (let variant of variants) {
          if (variant.checked === true && variant.value === "true") secondCount++;
        }
      }

      let ball: number = firstCount * 3.2 * 3 + secondCount * 3.1 * 3;

      let selected: Direction[] = JSON.parse(JSON.stringify(directions));

      let directionId: number = selected[0].directionId;
      let type = "not";

      selected.sort(
        (a, b) => a.directionQuota.quotaContractBal - b.directionQuota.quotaContractBal
      );

      for (let direction of selected) {
        if (direction.directionQuota.quotaContractBal <= ball) {
          directionId = direction.directionId;
          type = "contract";

          if (direction.directionQuota.quotaGrandBal <= ball) {
            type = "grand";
          }
        }
      }

      const responce = await fetch(HOST + "/exams", {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          directionId: directionId,
          firstScienceCount: firstCount * 3,
          secondScienceCount: secondCount * 3,
          type: type,
        }),
      });

      const data = await responce.json();

      if (data.status === 201) {
        navigate("/result/" + data.data.examId);
      }
    },

    [firstTests, secondTests, directions, token, navigate]
  );

  return (
    <div className={`${styles.navigation} ${className}`}>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.form__inner}`}>
            {firstTests.length > 0 && (
              <h2 className={`${styles.tests__heading}`}>{firstTests[0].science?.scienceName}</h2>
            )}

            <ul className={`${styles.tests__list}`}>
              {firstTests.length > 0 &&
                firstTests.map((test, index) => (
                  <li className={`${styles.test}`} key={test.testId}>
                    <div className={`${styles.test__top}`}>
                      <h3 className={`${styles.test__heading}`}>
                        #{index + 1} {test.testHeading}
                      </h3>
                      <span className={`${styles.test__description}`}>{test.testDescription}</span>
                    </div>

                    <ul className={`${styles.test__variants}`}>
                      {test.testVariants.map((variant) => (
                        <li className={`${styles.test__variant}`} key={variant.testVariantId}>
                          <RadioInput
                            className={`${styles.test__variant}`}
                            label={variant.testVariantBody}
                            name={String(test.testId) + firstTests[0].science?.scienceName}
                            value={String(variant.testVariantIstrue)}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>

          <div className={`${styles.form__inner}`}>
            {secondTests.length > 0 && (
              <h2 className={`${styles.tests__heading}`}>{secondTests[0].science?.scienceName}</h2>
            )}

            <ul className={`${styles.tests__list}`}>
              {secondTests.length > 0 &&
                secondTests.map((test, index) => (
                  <li className={`${styles.test}`} key={test.testId}>
                    <div className={`${styles.test__top}`}>
                      <h3 className={`${styles.test__heading}`}>
                        #{index + 1} {test.testHeading}
                      </h3>
                      <span className={`${styles.test__description}`}>{test.testDescription}</span>
                    </div>

                    <ul className={`${styles.test__variants}`}>
                      {test.testVariants.map((variant) => (
                        <li className={`${styles.test__variant}`} key={variant.testVariantId}>
                          <RadioInput
                            className={`${styles.test__variant}`}
                            label={variant.testVariantBody}
                            name={String(test.testId) + secondTests[0].science?.scienceName}
                            value={String(variant.testVariantIstrue)}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>

          <Button type="submit">Yuklash</Button>
        </form>
      </Container>
    </div>
  );
};

export default Tests;
