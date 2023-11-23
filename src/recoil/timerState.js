import {atom} from "recoil";
import {ExamScheduleType, ExamType} from "../util/examSubjects";


export const selectedExamTypeAtom = atom({
  key: 'selectedExamTypeAtom',
  default: ExamType.NONE
})

export const selectedExamAtom = atom({
  key: 'selectedExamAtom',
  default: ExamScheduleType.NONE
})

export const selectedTaskIdAtom = atom({
  key: 'selectedTaskIdAtom',
  default: 0,
})
