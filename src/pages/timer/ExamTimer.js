import React, {useState, useEffect, useRef, useMemo} from 'react';
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ExamSchedule from "./ExamSchedule";
import {ACTSubjects} from '../../util/examSubjects'
import {curSubjectIndexAtom, selectedExamAtom} from "../../recoil/timerState";
import {useRecoilState, useRecoilValue} from "recoil";

export default function ExamTimer() {
  const subjects = useRecoilValue(selectedExamAtom);
  const [curSubjectIndex, setCurSubjectIndex] = useRecoilState(curSubjectIndexAtom);
  const [timeLeft, setTimeLeft] = useState(subjects[curSubjectIndex].duration);
  const [timerOn, setTimerOn] = useState(false)

  const timeRef = useRef(null)

  const curSubject = useMemo(() => subjects[curSubjectIndex], [subjects, curSubjectIndex])

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
    if (curSubjectIndex >= subjects.length - 1) {
      return
    }
    setCurSubjectIndex(curSubjectIndex + 1)
  }

  function changeCurSubject(index) {
    setCurSubjectIndex(index)
  }

  function toggleTimer() {
    setTimerOn(prevTimerOn => !prevTimerOn)
  }

  return (
    <TimerBase>
      <div style={{display:'flex', flex:'0 0 5rem', alignItems:'center', justifyContent:'center', width:'100%'}}>
        <div style={{flex:1, textAlign:'center', fontSize:'1.6rem', fontWeight:'800'}}>ACT</div>
      </div>
      <TimerDisplay>
        <SubjectId>#{curSubject.order}</SubjectId>
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
      <ExamSchedule subjects={ACTSubjects} changeCurSubject={changeCurSubject}/>
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
  justifyContent:'center',
});

const TimerDisplay = styled('div')({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  width: '80%',
  height: '40vh',
  marginTop: '1rem',
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
