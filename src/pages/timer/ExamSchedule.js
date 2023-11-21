import React, {useRef, useState} from 'react';
import {ContentWidthDesktop} from "../../util/utils";
import {styled} from "@mui/material/styles";
import ScheduleItem from "./ScheduleItem";
import ScheduleBreak from "./ScheduleBreak";
import {TaskType} from "../../util/examSubjects";


export default function ExamSchedule({schedules}) {
  const [startX, setStartX] = useState(0); // Track start X position
  const [scrollStartX, setScrollStartX] = useState(0); // Track scroll start X position

  const baseRef = useRef(null);

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
        schedules.map(schedule => (
          (schedule.type === TaskType.SUBJECT)? <ScheduleItem schedule={schedule} /> : <ScheduleBreak schedule={schedule} />
        ))
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


