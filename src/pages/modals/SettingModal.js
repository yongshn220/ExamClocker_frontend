import {styled} from "@mui/material/styles";
import { IoClose } from "react-icons/io5";
import Divider from "@mui/material/Divider";
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import {optAutoStartNextAtom, optReadyTimeAtom} from "../../recoil/settingOptionState";
import {useRecoilState} from "recoil";
import {activatedModalAtom, ModalType} from "../../recoil/modalState";


const TextDarkGray = "#383838"

export default function SettingModal() {
  const [activatedModalType, setActivatedModalType] = useRecoilState(activatedModalAtom)
  const [autoStartNext, setAutoStartNext] = useRecoilState(optAutoStartNextAtom)
  const [readyTime, setReadyTime] = useRecoilState(optReadyTimeAtom)

  function handleClose() {
    setActivatedModalType(ModalType.NONE)
  }

  return (
    <Base disabled={activatedModalType !== ModalType.SETTING}>
      <Header>
        <Title>Setting</Title>
        <IoClose onClick={handleClose} style={{fontSize:'2rem', marginRight:'2rem', cursor:'pointer'}}/>
      </Header>
      <Divider/>
      <Section>
        <SectionTitle>TIMER</SectionTitle>
        <Element>
          <div style={{flex:1}}>Auto Start Next</div>
          <Switch checked={autoStartNext} onChange={(e,value)=>setAutoStartNext(value)}/>
        </Element>
        <Element>
          <div style={{flex:1}}>Ready Time</div>
          <TextField id="outlined-basic" variant="outlined" type="number"
             value={readyTime}
             onChange={(e) => setReadyTime(e.target.value)}
             InputProps={{
               style: {
                 fontSize: "1.6rem",
                 color: TextDarkGray,
                 width:'100px',
                 height:'40px',
               },
             }}
          />
        </Element>
        <Divider sx={{marginTop:'1rem'}}/>
      </Section>
    </Base>
  )
}

const Base = styled('div')(({disabled}) => ({
  position:'absolute',
  display: disabled? 'none' : 'flex',
  flexDirection:'column',
  width:'80%',
  height:'calc(100% - 10rem)',
  left: '50%',
  transform: 'translateX(-50%)',
  marginTop:'8rem',
  boxSizing: 'border-box',
  borderRadius:'5px',
  backgroundColor:'#f5f6f8',
  color:'black',
  zIndex:100,
}))

const Header = styled('div')({
  display:'flex',
  alignItems:'center',
})

const Title = styled('div')({
  flex:'1',
  margin:'2rem',
  fontSize:'1.6rem',
  fontWeight:'600',
})

const Section = styled('div')({
  display:'flex',

  flexDirection:'column',
  margin:'2rem'
})

const SectionTitle = styled('div')({
  display:'flex',
  flex:'0 0 3rem',
  fontSize:'1.6rem',
  fontWeight:'700',
  color:'#a4a4a4',
  marginBottom:'0.5rem',
  alignItems:'center',
})


const Element = styled('div')({
  display:'flex',
  alignItems:'center',
  flex:'0 0 4rem',
  fontSize:'1.6rem',
  fontWeight:'700',
  marginBottom:'0.5rem',
  color:TextDarkGray,
})
