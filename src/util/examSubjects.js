

const min = 1;

export const TaskType = {
  BEGIN: "taskTypeBegin",
  END: "taskTypeEnd",
  SUBJECT: "taskTypeSubject",
  BREAK: "taskTypebreak",
  PREP: "taskTypePreparation",
}

export const ACTSchedules = [
  {id: 0, type: TaskType.BEGIN, subjectId: 0, name: 'Begin', duration: 0 },
  {id: 1, type: TaskType.SUBJECT, subjectId: 1, name: 'English', duration: 2 * min },
  {id: 2, type: TaskType.SUBJECT, subjectId: 2, name: 'Math', duration: 2 * min },
  {id: 3, type: TaskType.BREAK, subjectId: 0, name: 'Break', duration: 2 * min },
  {id: 4, type: TaskType.SUBJECT, subjectId: 3, name: 'Reading', duration: 2 * min },
  {id: 5, type: TaskType.SUBJECT, subjectId: 4, name: 'Science', duration: 2 * min },
  {id: 6, type: TaskType.BREAK, subjectId: 0, name: 'Break', duration: 2 * min },
  {id: 7, type: TaskType.SUBJECT, subjectId: 5, name: 'Writing', duration: 2 * min },
  {id: 8, type: TaskType.END, subjectId: 0, name: 'End', duration: 0 },
];
