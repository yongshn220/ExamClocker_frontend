import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExamSchedule from "./ExamSchedule";

const subjects = [
  {id:1, name: 'English', duration: 45 },
  {id:2, name: 'Math', duration: 60 },
  // ...other subjects
];

export default function ExamTimer() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [timeLeft, setTimeLeft] = useState(activeSubject.duration * 60);

  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const startTimer = () => {
    // Logic to start the timer
  };

  return(
    <TimerBase>
      <TimerDisplay>
        <SubjectId>#{activeSubject.id}</SubjectId>
        <TSubjectName>{activeSubject.name}</TSubjectName>
        <Time>{formatTime(timeLeft)}</Time>
        <PlayButton onClick={startTimer}><PlayArrowIcon style={{fontSize:'5rem', color:'white'}}/></PlayButton>
      </TimerDisplay>
      <ExamSchedule/>
    </TimerBase>
  )
}

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Styled components here
const TimerBase = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'cneter',
});

const TimerDisplay = styled('div')({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  width: '80%',
  height: '40vh',
  marginTop: '6rem',
  borderRadius: '5px',
  backgroundColor:'rgba(255,255,255,0.1)'
});

const SubjectId = styled('div')({
  fontSize:'1rem',
});


const TSubjectName = styled('div')({
  fontSize:'2rem',
  fontWeight:'700',
  marginBottom:'1rem',
});

const SubjectName = styled('div')({
  fontSize:'2rem',
});

const Time = styled('div')({
  fontSize: '10rem',
  fontWeight:'700',
});

const PlayButton = styled(Button)({
});

const SubjectList = styled('div')({
  // Styles for the subject list
});

const Subject = styled('div')({
  // Styles for each subject
});

const Duration = styled('div')({
  // Styles for the duration
});
