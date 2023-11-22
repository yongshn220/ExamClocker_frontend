import LayoutBase from "../components/LayoutBase";
import HomeHeader from "./Header";
import ExamTimer from "../timer/ExamTimer";
import SettingModal from "../modals/SettingModal";

export default function Home() {

  return (
    <LayoutBase>
      <SettingModal/>
      <HomeHeader/>
      <ExamTimer/>
    </LayoutBase>
  )
}
