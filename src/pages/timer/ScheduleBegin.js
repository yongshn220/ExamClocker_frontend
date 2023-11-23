import React from "react";
import {styled} from "@mui/material/styles";
import {useSetRecoilState} from "recoil";
import {selectedTaskIdAtom} from "../../recoil/timerState";


export default function ScheduleBegin({schedule}) {
  const setSelectedTaskId = useSetRecoilState(selectedTaskIdAtom)

  function handleClick() {
    setSelectedTaskId(schedule.id)
  }

  return (
    <Base onClick={handleClick}>
    </Base>
  )
}

const Base = styled('div')({
  height:'70%',
  aspectRatio: '0.2/1',
  marginLeft:'1rem',
  marginRight:'1rem',
  borderRadius:'3px',
  backgroundColor:'rgba(255,255,255,0.62)',
  cursor:'pointer',
});
