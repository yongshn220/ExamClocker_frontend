import React from "react";
import {styled} from "@mui/material/styles";
import {useSetRecoilState} from "recoil";
import {selectedTaskIdAtom} from "../../recoil/timerState";


export default function ScheduleItem({schedule}) {
  const setSelectedTaskId = useSetRecoilState(selectedTaskIdAtom)

  function getDurationText(duration) {
    if (duration >= 60) {
      return `${Math.round(duration / 60)} min`
    }
    else {
      return `${duration} sec`
    }
  }

  function handleClick() {
    setSelectedTaskId(schedule.id)
  }

  return (
    <Base onClick={handleClick}>
      <SubjectName>
        {schedule.name}
      </SubjectName>
      <SubjectDuration>
        {getDurationText(schedule.duration)}
      </SubjectDuration>
    </Base>
  )
}


const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  height:'70%',
  aspectRatio: '1/1',
  marginLeft:'1rem',
  marginRight:'1rem',
  borderRadius:'3px',
  backgroundColor:'white',
  color:'#151b42',
  cursor:'pointer',
});

const SubjectName = styled('div')({
  display:'flex',
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  fontSize:'1.6rem',
  fontWeight:'700'
})

const SubjectDuration = styled('div')({
  display:'flex',
  flex:0,
  marginBottom:'15px',
  alignItems:'center',
  justifyContent:'center',
  fontSize:'1.6rem',
  fontWeight:'700'
})
