import React, {useEffect, useRef, useMemo, useCallback, useState} from 'react';
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ExamSchedule from "./ExamSchedule";
import {ACTSchedules} from '../../util/examSubjects'
import {selectedTaskIdAtom, selectedExamAtom} from "../../recoil/timerState";
import {useRecoilState, useRecoilValue} from "recoil";
import {optAutoStartNextAtom} from "../../recoil/settingOptionState";

const Action = {
  SET_TIME_LEFT: "set_time_left",
  TOGGLE_TIMER: "toggle_timer",
  ACTIVE_SUBJECT_CHANGE: "active_subject_chane",
}

export default function ExamTimer() {
  const subjects = useRecoilValue(selectedExamAtom);
  const optAutoStartNext = useRecoilValue(optAutoStartNextAtom)
  const [selectedSubjectId, setSelectedSubjectId] = useRecoilState(selectedTaskIdAtom);

  const [timerState, setTimerState] = useState({
    timeLeft: 0,
    timerOn: false,
  });

  const timeRef = useRef(null)
  const activeSubject = useMemo(() => subjects[selectedSubjectId], [subjects, selectedSubjectId])

  const { timeLeft, timerOn } = timerState

  const reducer = useCallback((action) => {
    switch(action.type) {
      case Action.SET_TIME_LEFT:
        return setTimerState(prev => ({...prev, timeLeft: prev.timeLeft - 1}));

      case Action.TOGGLE_TIMER:
        return setTimerState(prev => ({...prev, timerOn: !prev.timerOn}));

      case Action.ACTIVE_SUBJECT_CHANGE:
        return setTimerState(prev => {
          const timerOn =  (prev.timeLeft < 0)? optAutoStartNext : false
          return {...prev, timeLeft: activeSubject.duration, timerOn: timerOn}
        })

      default: return;
    }
  }, [activeSubject.duration, optAutoStartNext])

  // On Timer On or Off
  useEffect(() => {
    if (timerOn) {
      timeRef.current = setInterval(() => {
        reducer({ type: Action.SET_TIME_LEFT, payload: null})
      }, 1000);
    }
    else {
      clearInterval(timeRef.current);
    }
    return () => clearInterval(timeRef.current);
  }, [reducer, timerOn]);

  // On Time Over
  useEffect(() => {
    if (timeLeft < 0)
      setSelectedSubjectId((prev) => (prev < subjects.length-1)? prev+1 : prev)
  }, [subjects.length, setSelectedSubjectId, timeLeft]);

  // On Active Subject Change
  useEffect(() => {
    reducer({type: Action.ACTIVE_SUBJECT_CHANGE, payload: null})
  }, [reducer, activeSubject])

  function toggleTimer() {
    reducer({type: Action.TOGGLE_TIMER, payload: null})
  }

  return (
    <TimerBase>
      <ExamTitleBox>
        <ExamTitle>ACT</ExamTitle>
      </ExamTitleBox>
      <TimerDisplay>
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
      <ExamSchedule schedules={ACTSchedules}/>
    </TimerBase>
  )
}

const formatTime = (time) => {
  if (time < 0) time = 0
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
