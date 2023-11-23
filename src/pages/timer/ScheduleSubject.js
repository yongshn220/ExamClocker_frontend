import React from "react";
import {styled} from "@mui/material/styles";
import {useRecoilState} from "recoil";
import {selectedTaskIdAtom} from "../../recoil/timerState";
import {COLOR} from "../../util/utils";


export const ScheduleSubject = React.forwardRef(({ schedule }, ref) => {
  const [selectedTaskId, setSelectedTaskId] = useRecoilState(selectedTaskIdAtom)

  const bgColor = (selectedTaskId === schedule.id)? COLOR.transparentWhite80 : COLOR.transparentWhite30

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
    <Base ref={ref} onClick={handleClick} bgColor={bgColor}>
      <SubjectName>
        {schedule.name}
      </SubjectName>
      <SubjectDuration>
        {getDurationText(schedule.duration)}
      </SubjectDuration>
    </Base>
  )
})

export default ScheduleSubject


const Base = styled('div')(({bgColor}) => ({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  height:'70%',
  aspectRatio: '1.5/1',
  marginLeft:'1rem',
  marginRight:'1rem',
  borderRadius:'3px',
  backgroundColor: bgColor,
  color:'#151b42',
  cursor:'pointer',
}));

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
