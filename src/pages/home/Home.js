import ExamTimer from "../timer/ExamTimer";
import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/utils";
import HomeHeader from "./Header";


export default function Home() {
  return (
    <Base>
      <Side/>
      <Content>
        <HomeHeader/>
        <ExamTimer/>
      </Content>
      <Side/>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  position: 'absolute',
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: COLOR.blue,
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: '0 0 60rem',
});

const Side = styled('div')({
  flexGrow: 1,
  flexBasis: '33.33%',
  flexShrink: 1,
});
