import {styled} from "@mui/material/styles";
import {COLOR, ContentWidthDesktop} from "../../util/utils";


export default function LayoutBase({children}) {
  return(
    <Base>
      <Side/>
      <Content>
        {children}
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
  // Default flex basis for desktop
  flex: `0 0 ${ContentWidthDesktop}`,
  '@media (max-width: 600px)': {
    // Flex basis for mobile
    flex: '0 0 100%',
  },
});

const Side = styled('div')({
  flex: 1,
  '@media (max-width: 600px)': {
    // Hide or minimize the side components on mobile
    display: 'none',
  },
});
