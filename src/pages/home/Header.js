import {styled} from "@mui/material/styles";

export default function HomeHeader() {
  return (
    <Base>
      Exam Timer
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
  color: 'white',
});
