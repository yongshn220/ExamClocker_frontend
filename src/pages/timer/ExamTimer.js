import React, {useState, useEffect, useRef} from 'react';
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ExamSchedule from "./ExamSchedule";

const subjects = [
  {id: 1, order: 1, name: 'English', duration: 45 * 60 },
  {id: 2, order: 2, name: 'Math', duration: 60 * 60 },
  {id: 3, order: 0, name: 'break', duration: 15 * 60 },
  {id: 4, order: 3, name: 'Reading', duration: 35 * 60 },
  {id: 5, order: 4, name: 'Science', duration: 35 * 60 },
  {id: 6, order: 0, name: 'break', duration: 15 * 60 },
  {id: 7, order: 5, name: 'Writing', duration: 40 * 60 },
];


export default function ExamTimer() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [timeLeft, setTimeLeft] = useState(activeSubject.duration);
  const [timerOn, setTimerOn] = useState(false)

  const timeRef = useRef(null)

  useEffect(() => {
    if (timerOn) {
      timeRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0)
      }, 1000)
    }
    else {
      clearInterval(timeRef.current)
    }
  }, [timerOn]);

  useEffect(() => {
    clearInterval(timeRef.current)
    setTimeLeft(activeSubject.duration)
  }, [activeSubject])

  function toggleTimer() {
    setTimerOn(prevTimerOn => !prevTimerOn)
  }

  return (
    <TimerBase>
      <TimerDisplay>
        <SubjectId>#{activeSubject.order}</SubjectId>
        <TSubjectName>{activeSubject.name}</TSubjectName>
        <Time>{formatTime(timeLeft)}</Time>
        <PlayButton onClick={toggleTimer}>
          {
            timerOn?
            <StopIcon style={{ fontSize:'5rem', color:'white'}} />
            :
            <PlayArrowIcon style={{fontSize: '5rem', color: 'white'}}/>
          }
        </PlayButton>
      </TimerDisplay>
      <ExamSchedule subjects={subjects} setActiveSubject={setActiveSubject}/>
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

const Time = styled('div')({
  fontSize: '10rem',
  fontWeight:'700',
});

const PlayButton = styled(Button)({
});
