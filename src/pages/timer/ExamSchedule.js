import React, {useMemo} from 'react';
import {TimeControllerItemHeight} from "../../util/utils";
import {useRecoilState} from "recoil";
import {curSubjectIndexAtom} from "../../recoil/timerState";

const offsetHeight = 0

export default function ExamSchedule({subjects}) {
  const [curSubjectIndex, setCurSubjectIndex] = useRecoilState(curSubjectIndexAtom);
  const totalHeight = subjects.length * TimeControllerItemHeight;

  const circleHeight = useMemo(() => {
    return curSubjectIndex * (totalHeight / subjects.length) + offsetHeight;
  }, [totalHeight, subjects.length, curSubjectIndex])

  function handleClick(index) {
    setCurSubjectIndex(index)
  }

  function getDurationText(duration) {
    if (duration >= 60) {
      return `${Math.round(duration / 60)} min`
    }
    else {
      return `${duration} sec`
    }
  }

  return (
    <div style={styles.scheduleContainer}>
      <div style={styles.subjectsContainer}>
        {subjects.map((subject, index) => (
          <div onClick={() => handleClick(index)} key={subject.name} style={styles.subjectRow}>
            <span style={styles.subjectName}>{subject.name}</span>
            <span style={styles.subjectDuration}>{getDurationText(subject.duration)}</span>
          </div>
        ))}
      </div>
      <div style={{ ...styles.verticalLine, height: `${totalHeight - 50}px` }}>
        <div style={{ ...styles.circle, top: `${circleHeight}px` }} />
      </div>
    </div>
  );
}

const styles = {
  scheduleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width:'30%',
    alignItems: 'flex-components',
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
