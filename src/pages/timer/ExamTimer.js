import React, {useEffect, useRef, useMemo, useCallback, useState} from 'react';
import { styled } from "@mui/material/styles";
import ExamSchedule from "./ExamSchedule";
import {ACTSchedules, TaskType} from '../../util/examSubjects'
import {selectedTaskIdAtom, selectedExamAtom} from "../../recoil/timerState";
import {useRecoilState, useRecoilValue} from "recoil";
import {optAutoStartNextAtom} from "../../recoil/settingOptionState";
import {TimerDisplay} from "./TimerDisplay";

const Action = {
  SET_TIME_LEFT: "set_time_left",
  TOGGLE_TIMER: "toggle_timer",
  NEXT_SUBJECT: "next_subject",
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
  const { timeLeft, timerOn } = timerState

  const timeRef = useRef(null)
  const activeSubject = useMemo(() => subjects[selectedSubjectId], [subjects, selectedSubjectId])

  const reducer = useCallback((action) => {
    const payload = action.payload
    switch(action.type) {
      case Action.SET_TIME_LEFT:
        console.log(1)
        return setTimerState(prev => ({...prev, timeLeft: prev.timeLeft - 1}));

      case Action.TOGGLE_TIMER:
        console.log(2)
        return setTimerState(prev => ({...prev, timerOn: !prev.timerOn}));

      case Action.NEXT_SUBJECT:
        console.log(3)
        return setSelectedSubjectId((prev) => (prev < subjects.length-1)? prev+1 : prev)

      case Action.ACTIVE_SUBJECT_CHANGE:
        console.log(4)
        return setTimerState(prev => {
          let activeSubject = payload.activeSubject

          let timerOn;
          if (activeSubject.type === TaskType.PREP)                     timerOn = true
          else if (prev.timeLeft < 0 && activeSubject.subjectId === 1)  timerOn = true
          else if (prev.timeLeft < 0)                                   timerOn = optAutoStartNext
          else                                                          timerOn = false

          return {...prev, timeLeft: activeSubject.duration, timerOn: timerOn}
        })

      default: return;
    }
  }, [optAutoStartNext, setSelectedSubjectId, subjects.length])

  // On Timer On or Off
  useEffect(() => {
    if (timerOn && timeLeft > -1) {
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
      reducer({type: Action.NEXT_SUBJECT, payload: null})
  }, [reducer, timeLeft]);

  // On Active Subject Change
  useEffect(() => {
    reducer({type: Action.ACTIVE_SUBJECT_CHANGE, payload: {activeSubject: activeSubject}})
  }, [reducer, activeSubject])


  return (
    <TimerBase>
      <ExamTitleBox>
        <ExamTitle>ACT</ExamTitle>
      </ExamTitleBox>
      <TimerDisplay reducer={reducer} action={Action} activeSubject={activeSubject} timeLeft={timeLeft} timerOn={timerOn} />
      <ExamSchedule schedules={ACTSchedules}/>
    </TimerBase>
  )
}

// Styled components here
const TimerBase = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
