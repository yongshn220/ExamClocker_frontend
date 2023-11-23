import {atom} from "recoil";


export const optAutoStartNextAtom = atom({
  key: 'opAutoStartNextAtom',
  default: true,
})

export const optReadyTimeAtom = atom({
  key: 'optReadyTimeAtom',
  default: 5
})
