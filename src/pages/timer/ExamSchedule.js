import React, { useState } from 'react';

const subjects = [
  { name: 'English', duration: 45 },
  { name: 'Math', duration: 60 },
  { name: 'break', duration: 15 },
  { name: 'Reading', duration: 35 },
  { name: 'Science', duration: 35 },
  { name: 'break', duration: 15 },
  { name: 'Writing', duration: 40 },
];

const offsetHeight = 0

export default function ExamSchedule() {
  const [circlePosition, setCirclePosition] = useState(offsetHeight);

  // Calculate total height of the subject list based on the number of subjects
  const totalHeight = subjects.length * 50; // Example: 50px per subject row

  const handleClick = (index) => {
    // Calculate new circle position based on the index and height of each subject row
    const newPosition = index * (totalHeight / subjects.length) + offsetHeight;
    setCirclePosition(newPosition);
  };

  return (
    <div style={styles.scheduleContainer}>
      <div style={styles.subjectsContainer}>
        {subjects.map((subject, index) => (
          <div onClick={() => handleClick(index)} key={subject.name} style={styles.subjectRow}>
            <span style={styles.subjectName}>{subject.name}</span>
            <span style={styles.subjectDuration}>{subject.duration} min</span>
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
    width:'20%',
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
    flex: 1,
  },
  subjectDuration: {
    textAlign: 'right',
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
