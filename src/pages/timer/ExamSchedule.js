import React, {useEffect, useRef, useState} from 'react';
import {ContentWidthDesktop} from "../../util/utils";
import {styled} from "@mui/material/styles";
import ScheduleSubject from "./ScheduleSubject";
import ScheduleBreak from "./ScheduleBreak";
import {TaskType} from "../../util/examSubjects";
import ScheduleBegin from "./ScheduleBegin";
import ScheduleEnd from "./ScheduleEnd";
import {useRecoilValue} from "recoil";
import {selectedTaskIdAtom} from "../../recoil/timerState";

const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

export default function ExamSchedule({schedules}) {
  const selectedSubjectId = useRecoilValue(selectedTaskIdAtom)
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const baseRef = useRef(null);

  const scheduleRefs = useRef([]);
  const scrollToElement = (index) => {
    const element = scheduleRefs.current[index];
    if (element && baseRef.current) {
      element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  useEffect(() => {
    scrollToElement(selectedSubjectId);
  }, [selectedSubjectId, schedules]);


  function handleWheel(e) {
    if (baseRef.current) {
      baseRef.current.scrollLeft += e.deltaY;
    }
  }

  // For Mobile User
  function handleTouchStart(e) {
    if (baseRef.current) {
      setStartX(e.touches[0].clientX);
      setScrollStartX(baseRef.current.scrollLeft);
    }
  }
  // For Mobile User
  function handleTouchMove(e) {
    if (baseRef.current) {
      const touchDelta = startX - e.touches[0].clientX;
      baseRef.current.scrollLeft = scrollStartX + touchDelta;
    }
  }


  return (
    <Base ref={baseRef}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
    >
      {
        schedules.map((schedule, index) => {
          if (schedule.type === TaskType.BEGIN)
            return <ScheduleBegin schedule={schedule} ref={el => scheduleRefs.current[index] = el} />
          if (schedule.type === TaskType.SUBJECT)
            return <ScheduleSubject schedule={schedule} ref={el => scheduleRefs.current[index] = el} />
          if (schedule.type === TaskType.BREAK)
            return <ScheduleBreak schedule={schedule} ref={el => scheduleRefs.current[index] = el} />
          else
            return <ScheduleEnd schedule={schedule} ref={el => scheduleRefs.current[index] = el} />
        })
      }
    </Base>
  );
}

const Base = styled('div')({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  bottom:0,
  marginBottom:'1rem',
  width: ContentWidthDesktop,
  height: '18vh',
  borderRadius: '8px',
  overflowX: "scroll",

  // Optional: Simple custom scrollbar for WebKit browsers
  '&::-webkit-scrollbar': {
    height: '6px', // Smaller height for a less obtrusive scrollbar
    backgroundColor: 'rgba(0,0,0,0.1)', // Subtle background color
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.2)', // Subtle thumb color
    borderRadius: '3px', // Rounded corners for the thumb
  },

  // Optional: Simple custom scrollbar for Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0,0,0,0.2) rgba(0,0,0,0.1)', // Subtle colors
});


