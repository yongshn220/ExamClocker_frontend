import LayoutBase from "../components/LayoutBase";
import HomeHeader from "./Header";
import ExamTimer from "../timer/ExamTimer";
import SettingModal from "../modals/SettingModal";
import { useParams } from 'react-router-dom';
import {useRecoilState, useSetRecoilState} from "recoil";
import {selectedExamAtom, selectedExamTypeAtom} from "../../recoil/timerState";
import {ExamScheduleType} from "../../util/examSubjects";
import {Suspense, useEffect} from "react";

export default function Home() {
  const { examType } = useParams();
  const setSelectedExamTypeAtom = useSetRecoilState(selectedExamTypeAtom)
  const [selectedExam, setSelectedExam] = useRecoilState(selectedExamAtom)

  useEffect(() => {
    setSelectedExam(ExamScheduleType[examType])
    setSelectedExamTypeAtom(examType)
  }, [setSelectedExamTypeAtom, setSelectedExam, examType])

  //test
  return (
    <LayoutBase>
      <Suspense fallback={(<div>loading</div>)}>
        <SettingModal/>
        <HomeHeader/>
        {selectedExam.length > 0 && <ExamTimer/>}
      </Suspense>
    </LayoutBase>
  )
}
