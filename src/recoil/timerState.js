import {atom} from "recoil";
import {ACTSchedules} from "../util/examSubjects";


export const selectedExamAtom = atom({
  key: 'selectedExamAtom',
  default: ACTSchedules
})

export const selectedTaskIdAtom = atom({
  key: 'selectedTaskIdAtom',
  default: 0,
})
