import React from "react";
import { Link, useParams } from "react-router-dom";

import { HOST } from "../../config";

import useToken from "../../Hooks/useToken";

import Container from "../../Components/Container/Contianer";

import styles from "./Result.module.scss";
import Button from "../../Components/Lib/Button/Button";

const Result: React.FC = () => {
  const { resultId } = useParams();
  const [token] = useToken();

  const [exam, setExam] = React.useState<Exam>();

  React.useEffect(() => {
    (async () => {
      const response = await fetch(HOST + "/exams/" + resultId, { headers: { token } });
      const data = await response.json();

      if (data.status === 200) {
        setExam(data.data[0]);
      }
    })();
  }, [resultId, token]);

  return (
    <main className={`${styles["main--result"]} main`}>
      <Container>
        <h2 className={`${styles.result__heading}`}>Asosiy</h2>

        {exam?.examId && (
          <div>
            <ul className={`${styles.result__list}`}>
              <li className={`${styles.result__item}`}>
                <span className={`${styles.result__item__heading}`}>
                  {exam.direction.firstScience.scienceName}
                </span>

                <span
                  className={`${styles.result__item__progress} ${
                    exam.firstScienceCount === 30 ? styles["result__item__progress--active"] : ""
                  }`}
                >
                  <span
                    className={`${styles.progress__line__fill}`}
                    style={{ width: (exam.firstScienceCount / 30) * 575 }}
                  ></span>

                  <span
                    className={`${styles.result__progress__prosent}`}
                    style={{ left: (exam.firstScienceCount / 30) * 575 }}
                  >
                    {(exam.firstScienceCount / 30) * 100}%
                  </span>
                </span>

                <span className={`${styles.result__prosent}`}>100%</span>

                <span className={`${styles.result__count}`}>{exam.firstScienceCount}/30</span>
              </li>

              <li className={`${styles.result__item}`}>
                <span className={`${styles.result__item__heading}`}>
                  {exam.direction.secondScience.scienceName}
                </span>

                <span
                  className={`${styles.result__item__progress} ${
                    exam.secondScienceCount === 30 ? styles["result__item__progress--active"] : ""
                  }`}
                >
                  <span
                    className={`${styles.progress__line__fill}`}
                    style={{ width: (exam.secondScienceCount / 30) * 575 }}
                  ></span>

                  <span
                    className={`${styles.result__progress__prosent}`}
                    style={{ left: (exam.secondScienceCount / 30) * 575 }}
                  >
                    {(exam.secondScienceCount / 30) * 100}%
                  </span>
                </span>

                <span className={`${styles.result__prosent}`}>100%</span>

                <span className={`${styles.result__count}`}>{exam.secondScienceCount}/30</span>
              </li>
            </ul>

            <h3 className={`${styles.result__bottom__heading}`}>
              Natija (tavsiya etildi yoki etilmadi)
            </h3>
            <h4 className={`${styles.result__bottom__subheading}`}>
              Yo'nalish: {exam.type === "not" ? "Qabul qilinmadi" : exam.direction.directionName}
            </h4>
            <h4 className={`${styles.result__bottom__subheading}`}>
              {exam.type === "grand"
                ? "Ta'lim turi: Davlat granti"
                : exam.type === "contract"
                ? "Ta'lim turi: Shartnoma asosida"
                : ""}
            </h4>
          </div>
        )}

        <Link to={"/"}>
          <Button>Asosiy</Button>
        </Link>
      </Container>
    </main>
  );
};

export default Result;
