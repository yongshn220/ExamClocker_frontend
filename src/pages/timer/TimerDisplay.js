import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React from "react";
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {TaskType} from "../../util/examSubjects";
import {COLOR} from "../../util/utils";

const formatTime = (time) => {
  if (time < 0) time = 0
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function TimerDisplay({reducer, action, activeSubject, timeLeft, timerOn, isReadyPhase}) {
  function toggleTimer() {
    reducer({type: action.TOGGLE_TIMER, payload: null})
  }

  function handleStart() {
    reducer({type:action.NEXT_SUBJECT})
  }

  function TaskBegin() {
    return <StartButton onClick={handleStart} style={{cursor:'pointer'}}>Press to Start</StartButton>
  }

  function TaskTimer() {
    const SubjectName = (isReadyPhase)? `Ready for ${activeSubject.name}` : activeSubject.name
    return (
      <>
        <TSubjectName>{SubjectName}</TSubjectName>
        <Time>{formatTime(timeLeft)}</Time>
        <PlayButton onClick={toggleTimer}>
          {
            timerOn?
              <StopIcon style={{ fontSize:'5rem', color:'white'}} />
              :
              <PlayArrowIcon style={{fontSize: '5rem', color: 'white'}}/>
          }
        </PlayButton>
      </>
    )
  }

  function renderContent() {
    if (activeSubject.type === TaskType.BEGIN) return TaskBegin()
    if (activeSubject.type === TaskType.END) return TaskEnd()
    else return TaskTimer()
  }
  function TaskEnd() {
    return <TSubjectName onClick={handleStart} style={{cursor:'pointer'}}>Exam Finished</TSubjectName>
  }

  return (
    <Base>
      {renderContent()}
    </Base>
  )
}



const Base = styled('div')({
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

const StartButton = styled('div')({
  fontSize:'4rem',
  fontWeight:'700',
  padding:'1rem',
  borderRadius: '5px',
  backgroundColor: COLOR.blue,
})

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


