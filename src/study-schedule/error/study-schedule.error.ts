export enum StudyScheduleError {
  notFound = 'Study schedule not found',
  scheduleAlreadyCreated = 'You already have an existing study schedule',
  cantTakeNewCourse = 'You cant take in two courses at the same time',
  cantTakeCourseNotAdded = 'You cant take this course. Please first add it to your study schedule',
  missingDependencies = 'You cant take this course. Please first take its dependencies',
  cantFinishCourse = "You cant finish a course because you don't have a current course in progress.",
}
