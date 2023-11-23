import React from "react";
import {styled} from "@mui/material/styles";
import {useRecoilState} from "recoil";
import {selectedTaskIdAtom} from "../../recoil/timerState";
import {COLOR} from "../../util/utils";


export default function ScheduleBreak({schedule}) {
  const [selectedTaskId, setSelectedTaskId] = useRecoilState(selectedTaskIdAtom)

  const bgColor = (selectedTaskId === schedule.id)? COLOR.transparentWhite80 : COLOR.transparentWhite30

  function handleClick() {
    setSelectedTaskId(schedule.id)
  }

  return (
    <Base onClick={handleClick} bgColor={bgColor}>
    </Base>
  )
}

const Base = styled('div')(({bgColor}) => ({
  height:'70%',
  aspectRatio: '0.2/1',
  marginLeft:'1rem',
  marginRight:'1rem',
  borderRadius:'3px',
  backgroundColor: bgColor,
  cursor:'pointer',
}));
