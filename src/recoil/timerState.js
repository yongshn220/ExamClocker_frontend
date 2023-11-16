import {atom} from "recoil";
import {ACTSubjects} from "../util/examSubjects";


export const selectedExamAtom = atom({
  key: 'selectedExamAtom',
  default: ACTSubjects
})

export const curSubjectIndexAtom = atom({
  key: 'curSubjectIndexAtom',
  default: 0,
})
