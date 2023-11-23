

const min = 60;

export const ExamType = {
  NONE: "NONE",
  ACT: "ACT",
  SAT: "SAT",
}

export const TaskType = {
  BEGIN: "taskTypeBegin",
  END: "taskTypeEnd",
  SUBJECT: "taskTypeSubject",
  BREAK: "taskTypebreak",
}

const EmptySchedules = []

export const ACTSchedules = [
  {id: 0, type: TaskType.BEGIN, subjectId: 0, name: 'Begin', duration: 0 },
  {id: 1, type: TaskType.SUBJECT, subjectId: 1, name: 'English', duration: 45 * min },
  {id: 2, type: TaskType.SUBJECT, subjectId: 2, name: 'Math', duration: 60 * min },
  {id: 3, type: TaskType.BREAK, subjectId: 0, name: 'Break', duration: 10 * min },
  {id: 4, type: TaskType.SUBJECT, subjectId: 3, name: 'Reading', duration: 35 * min },
  {id: 5, type: TaskType.SUBJECT, subjectId: 4, name: 'Science', duration: 35 * min },
  {id: 6, type: TaskType.BREAK, subjectId: 0, name: 'Break', duration: 5 * min },
  {id: 7, type: TaskType.SUBJECT, subjectId: 5, name: 'Writing', duration: 40 * min },
  {id: 8, type: TaskType.END, subjectId: 0, name: 'End', duration: 0 },
];

export const SATSchedules = [
  {id: 0, type: TaskType.BEGIN, subjectId: 0, name: 'Begin', duration: 0 },
  {id: 1, type: TaskType.SUBJECT, subjectId: 1, name: 'Reading & Writing', duration: 64 * min },
  {id: 2, type: TaskType.BREAK, subjectId: 0, name: 'Break', duration: 10 * min },
  {id: 3, type: TaskType.SUBJECT, subjectId: 2, name: 'Math', duration: 70 * min },
  {id: 4, type: TaskType.END, subjectId: 0, name: 'End', duration: 0 },
];

export const ExamScheduleType = {
  NONE: EmptySchedules,
  [ExamType.ACT]: ACTSchedules,
  [ExamType.SAT]: SATSchedules,
}
