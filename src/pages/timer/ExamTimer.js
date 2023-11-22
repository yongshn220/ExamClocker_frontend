import React, {useState, useEffect, useRef, useMemo} from 'react';
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ExamSchedule from "./ExamSchedule";
import {ACTSchedules} from '../../util/examSubjects'
import {selectedTaskIdAtom, selectedExamAtom} from "../../recoil/timerState";
import {useRecoilState, useRecoilValue} from "recoil";

export default function ExamTimer() {
  const subjects = useRecoilValue(selectedExamAtom);
  const [selectedTaskId, setSelectedTaskId] = useRecoilState(selectedTaskIdAtom);
  const [timeLeft, setTimeLeft] = useState(subjects[selectedTaskId].duration);
  const [timerOn, setTimerOn] = useState(false)

  const timeRef = useRef(null)

  const curSubject = useMemo(() => subjects[selectedTaskId], [subjects, selectedTaskId])

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
    setTimerOn(false)
    setTimeLeft(curSubject.duration)
  }, [curSubject])

  useEffect(() => {
    if (timeLeft <= 0) {
      startNextSubject()
    }
  }, [timeLeft])


  function startNextSubject() {
    if (selectedTaskId >= subjects.length - 1) {
      return
    }
    setSelectedTaskId(selectedTaskId + 1)
  }

  function toggleTimer() {
    setTimerOn(prevTimerOn => !prevTimerOn)
  }

  return (
    <TimerBase>
      <ExamTitleBox>
        <ExamTitle>ACT</ExamTitle>
      </ExamTitleBox>
      <TimerDisplay>
        <TSubjectName>{curSubject.name}</TSubjectName>
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
      <ExamSchedule schedules={ACTSchedules}/>
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
});

const TimerDisplay = styled('div')({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  width: '80%',
  height: '40vh',
  marginTop: '2rem',
  borderRadius: '5px',
  backgroundColor:'rgba(255,255,255,0.1)'
});

const ExamTitleBox = styled('div')({
  display:'flex',
  flex:'0 0 5rem',
  alignItems:'center',
  justifyContent:'center',
  marginTop: '5rem',
  width:'100%',
});

const ExamTitle = styled('div')({
  textAlign:'center',
  fontSize:'1.6rem',
  fontWeight:'800',
  border: '1px solid white',
  borderRadius: '1rem',
  padding: '1rem',
})

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
