import {styled} from "@mui/material/styles";
import SettingsIcon from '@mui/icons-material/Settings';
import {useRecoilState} from "recoil";
import {activatedModalAtom, ModalType} from "../../recoil/modalState";

export default function HomeHeader() {
  const [activatedModalType, setActivatedModalType] = useRecoilState(activatedModalAtom)

  function handleSettingClick() {
    if (activatedModalType === ModalType.SETTING) {
      setActivatedModalType(ModalType.NONE)
    }
    else {
      setActivatedModalType(ModalType.SETTING)
    }
  }

  return (
    <Base>
      <div style={{flex:1}}>
        ExamTic
      </div>
      <div style={{flex:0}}>
        <SettingsIcon onClick={handleSettingClick} sx={{fontSize:'2rem', cursor:'pointer'}}/>
      </div>
    </Base>
  )
}

const Base = styled('div')({
  display:'flex',
  flex: '0 0 6rem',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  alignItems:'center',
  fontSize: '1.6rem',
  fontWeight: '700',
  color: 'white'
});
