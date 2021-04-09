import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './styles.css';

interface Subject {
  subjectName: string;
  teacherName: string;
  weekDay: string;
  period: string;
  schedule: string;
}

interface RouteParams {
  name: string;
}

const List: React.FC = () => {
  const { name } = useParams<RouteParams>();

  const [subjects, setSubjects] = useState([] as Subject[]);

  useEffect(() => {
    async function loadSubjects() {
      const loadedData = await localStorage.getItem('@Application:subjects');

      if (loadedData) {
        const parsedData = JSON.parse(loadedData);
        setSubjects(parsedData || []);
      }
    }

    loadSubjects();
  }, []);

  return (
    <div className="teacher-page">
      <header>
        <h2>Disciplinas de {name}</h2>
        <Link to="/">Voltar</Link>
      </header>
      <ul className="teacher-page__list">
        {subjects.map(({ subjectName, period, weekDay, schedule }, index) => (
          <li key={index.toString()}>
            <h2>{subjectName}</h2>
            <p>
              <strong>Dia da semana:</strong> {`${weekDay || '--'}`}
            </p>
            <p>
              <strong>Período:</strong> {`${period || '--'}`}
            </p>
            <p>
              <strong>Horário:</strong> {`${schedule || '--'}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
