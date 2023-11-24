import {styled} from "@mui/material/styles";
import SettingsIcon from '@mui/icons-material/Settings';
import {useRecoilState} from "recoil";
import {activatedModalAtom, ModalType} from "../../recoil/modalState";
import {useNavigate} from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate()
  const [activatedModalType, setActivatedModalType] = useRecoilState(activatedModalAtom)

  function handleSettingClick() {
    if (activatedModalType === ModalType.SETTING) {
      setActivatedModalType(ModalType.NONE)
    }
    else {
      setActivatedModalType(ModalType.SETTING)
    }
  }

  function handleHomeClick() {
    navigate('/')
  }

  return (
    <Base>
      <PageLogo onClick={handleHomeClick}>
        <MainIcon>
          <img src="/ExamClockerLogoWhite.png" alt="Description" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        </MainIcon>
        <div>ExamClocker</div>
      </PageLogo>
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

const PageLogo = styled('div')({
  display:'flex',
  alignItems:'center',
  flex:1,
  cursor:'pointer',
})

const MainIcon = styled('div')({
  borderRadius:'100px',
  width:'2rem',
  height:'2rem',
  marginRight:'0.5rem',
  padding:'0.2rem',
})
