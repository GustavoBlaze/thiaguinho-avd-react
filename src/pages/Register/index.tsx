import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface Subject {
  subjectName: string;
  teacherName: string;
  weekDay: string;
  period: string;
  schedule: string;
}

const Register: React.FC = () => {
  const [subjects, setSubjects] = useState([] as Subject[]);

  const teachers = Array.from(
    new Set(subjects.map(({ teacherName }) => teacherName)),
  );

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    const { target: form } = event;

    const newSubject = {
      subjectName: form.subjectName.value,
      teacherName: form.teacherName.value,
      weekDay: form.weekDay.value,
      period: form.period.value,
      schedule: form.schedule.value,
    };

    await localStorage.setItem(
      '@Application:subjects',
      JSON.stringify([...subjects, newSubject]),
    );

    setSubjects([...subjects, newSubject]);

    form.reset();
  }

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
    <div className="register-page">
      <form className="register-page__form" onSubmit={handleFormSubmit}>
        <div className="register-page__form__control">
          <strong>Nome da disciplina</strong>
          <input type="text" name="subjectName" />
        </div>

        <div className="register-page__form__control">
          <strong>Professor</strong>
          <input type="text" name="teacherName" />
        </div>

        <div className="register-page__form__control">
          <strong>Dia da semana</strong>
          <input type="text" name="weekDay" />
        </div>

        <div className="register-page__form__control">
          <strong>Período</strong>
          <input type="text" name="period" />
        </div>

        <div className="register-page__form__control">
          <strong>Horário</strong>
          <input type="text" name="schedule" />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {teachers.length > 0 && (
        <>
          <h3>Professores cadastrados</h3>

          <ul className="register-page__list-teachers">
            {teachers.map((teacherName, index) => (
              <li key={index.toString()}>
                <Link to={`/teacher/${teacherName}`}>{teacherName}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Register;
