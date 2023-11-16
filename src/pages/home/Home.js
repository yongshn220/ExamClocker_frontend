import LayoutBase from "../components/LayoutBase";
import HomeHeader from "./Header";
import ExamTimer from "../timer/ExamTimer";

export default function Home() {

  return (
    <LayoutBase>
      <HomeHeader/>
      <ExamTimer/>
    </LayoutBase>
  )
}
