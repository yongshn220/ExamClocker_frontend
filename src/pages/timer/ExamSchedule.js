import React, { useState } from 'react';
import {TimeControllerItemHeight} from "../../util/utils";

const offsetHeight = 0

export default function ExamSchedule({subjects, setActiveSubject}) {
  const [circlePosition, setCirclePosition] = useState(offsetHeight);

  const totalHeight = subjects.length * TimeControllerItemHeight;

  function handleClick(index, subject) {
    const newPosition = index * (totalHeight / subjects.length) + offsetHeight;
    setCirclePosition(newPosition);
    setActiveSubject(subject)
  }

  return (
    <div style={styles.scheduleContainer}>
      <div style={styles.subjectsContainer}>
        {subjects.map((subject, index) => (
          <div onClick={() => handleClick(index, subject)} key={subject.name} style={styles.subjectRow}>
            <span style={styles.subjectName}>{subject.name}</span>
            <span style={styles.subjectDuration}>{subject.duration / 60} min</span>
          </div>
        ))}
      </div>
      <div style={{ ...styles.verticalLine, height: `${totalHeight - 50}px` }}>
        <div style={{ ...styles.circle, top: `${circlePosition}px` }} />
      </div>
    </div>
  );
}

const styles = {
  scheduleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width:'30%',
    alignItems: 'flex-start',
    borderRadius: '8px',
    padding: '20px',
  },
  subjectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width:'100%',
  },
  subjectRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    cursor: 'pointer',
    height: '50px',
    top: '-5px',
  },
  subjectName: {
    textAlign: 'left',
    fontSize: '1.6rem',
    fontWeight: '800',
    flex: 1,
  },
  subjectDuration: {
    textAlign: 'right',
    fontSize: '1.6rem',
    fontWeight: '600',
    flex: 1,
  },
  verticalLine: {
    width: '0.5px',
    backgroundColor: 'white',
    position: 'absolute',
    left: '50%', // Position the line in the middle
    transform: 'translateX(-50%)', // Center the line exactly
    marginTop: '25px',
  },
  circle: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the circle on the line
    cursor: 'pointer',
    transition: 'top 0.3s ease', // Smooth transition for the circle movement
  },
};
