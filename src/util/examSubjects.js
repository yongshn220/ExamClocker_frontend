

const min = 1;

export const TaskType = {
  SUBJECT: "taskTypeSubject",
  BREAK: "taskTypebreak",
}

export const ACTSchedules = [
  {id: 0, type: TaskType.SUBJECT, subjectId: 1, name: 'English', duration: 5 * min },
  {id: 1, type: TaskType.SUBJECT, subjectId: 2, name: 'Math', duration: 6 * min },
  {id: 2, type: TaskType.BREAK, subjectId: 0, name: 'break', duration: 15 * min },
  {id: 3, type: TaskType.SUBJECT, subjectId: 3, name: 'Reading', duration: 35 * min },
  {id: 4, type: TaskType.SUBJECT, subjectId: 4, name: 'Science', duration: 35 * min },
  {id: 5, type: TaskType.BREAK, subjectId: 0, name: 'break', duration: 15 * min },
  {id: 6, type: TaskType.SUBJECT, subjectId: 5, name: 'Writing', duration: 40 * min },
];
