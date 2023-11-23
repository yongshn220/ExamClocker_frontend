import LayoutBase from "../components/LayoutBase";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import {ExamType} from "../../util/examSubjects";


export default function Start() {
  const navigate = useNavigate();

  function handleClick(examType) {
    navigate(`/timer/${examType}`);
  }

  return (
    <LayoutBase>
      <Base>
        <IntroText> Select the Exam </IntroText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item onClick={() => handleClick(ExamType.ACT)} >ACT</Item>
          </Grid>
          <Grid item xs={6}>
            <Item onClick={() => handleClick(ExamType.SAT)} >SAT</Item>
          </Grid>
        </Grid>
      </Base>
    </LayoutBase>
  )
}


const Base = styled('div')({
  display:'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent:'center',
  alignItems:'center',
});

const IntroText = styled('div')({
  fontSize:'4rem',
  fontWeight:'700',
  marginBottom: '2rem',
})



const Item = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '3rem',
  fontWeight: '700',
  height: '50px',
  borderRadius: '5px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
