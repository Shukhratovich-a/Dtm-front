import React from "react";

import { HOST } from "../../config";

import useToken from "../../Hooks/useToken";

import Container from "../../Components/Container/Contianer";

import styles from "./Winners.module.scss";

const Winners: React.FC = () => {
  const [token] = useToken();

  const [winners, setWinners] = React.useState<Exam[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(HOST + "/exams", { headers: { token } });

      const data = await response.json();

      if (data.status === 200) {
        setWinners(data.data);
      }
    })();
  }, []);

  console.log(winners);

  return (
    <main className={`${styles["main--winners"]} main`}>
      <Container>
        <h2>Songi imtihon g'olibi</h2>

        <table className={`${styles.winners__table}`}>
          <thead className={`${styles.winners__headings}`}>
            <tr>
              <th className={`${styles.winners__heading}`}>
                <span className={`${styles.winners__heading__text}`}>ID</span>
              </th>
              <th className={`${styles.winners__heading}`}>
                <span className={`${styles.winners__heading__text}`}>Ismi</span>
              </th>
              <th className={`${styles.winners__heading}`}>
                <span className={`${styles.winners__heading__text}`}>Yonalish</span>
              </th>
              <th className={`${styles.winners__heading}`}>
                <span className={`${styles.winners__heading__text}`}>Sana</span>
              </th>
              <th className={`${styles.winners__heading}`}>
                <span className={`${styles.winners__heading__text}`}>Ball</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {winners.length > 0 &&
              winners.map((winner) => (
                <tr key={winner.examId}>
                  <td className={`${styles.winners__table__row}`}>
                    <span>{winner.user.userId}</span>
                  </td>
                  <td className={`${styles.winners__table__row}`}>
                    <span>{winner.user.userFullName}</span>
                  </td>
                  <td className={`${styles.winners__table__row}`}>
                    <span>{winner.direction ? winner.direction.directionName : ""}</span>
                  </td>
                  <td className={`${styles.winners__table__row}`}>
                    <span>{winner.createAt}</span>
                  </td>
                  <td className={`${styles.winners__table__row}`}>
                    <span>
                      {(winner.firstScienceCount * 3.2 + winner.secondScienceCount * 3.1).toFixed(
                        1
                      )}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </main>
  );
};

export default Winners;
