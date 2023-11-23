import React from "react";
import {styled} from "@mui/material/styles";
import {useRecoilValue} from "recoil";
import {selectedExamTypeAtom} from "../../recoil/timerState";
export default function ExamTitleSelector() {
  const examType = useRecoilValue(selectedExamTypeAtom)

  return (
    <ExamTitleArea>
      <ExamTitleBox>{examType}</ExamTitleBox>
    </ExamTitleArea>
  )
}

const ExamTitleArea = styled('div')({
  display:'flex',
  flex:'0 0 5rem',
  alignItems:'center',
  justifyContent:'center',
  marginTop: '5rem',
  width:'100%',
});

const ExamTitleBox = styled('div')({
  textAlign:'center',
  fontSize:'1.6rem',
  fontWeight:'800',
  border: '1px solid white',
  borderRadius: '1rem',
  padding: '1rem',
})
