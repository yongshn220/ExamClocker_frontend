import {atom} from "recoil";

export const ModalType = {
  NONE: 'modalTypeNone',
  SETTING: 'modalTypeSetting',
}

export const activatedModalAtom = atom({
  key: 'activatedModalAtom',
  default: ModalType.NONE
})
