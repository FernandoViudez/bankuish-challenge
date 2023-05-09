## Bankuish challenge :rocket:

### Technical details

https://docs.google.com/document/d/1p4JYPEfR-cE40DfqeRKlE8VTc54esduKWK-UplOwoU0/edit?usp=sharing

### Prerequisites

<ul>
  <li>
    Node.js v18.14.2
  </li>
  <li>
    npm v9.5.0
  </li>
  <li>
    docker-compose v1.29.2
  </li>
</ul>

### Steps to run this project

WIP

### Goals for today:

2. configure and publish docker-compose
3. add postman collection and envs to this project
4. update readme and explain how to start this application with docker-compose
5. perform tests if time allows me

### Setup docker-compose

- `docker-compose up` for running and monitoring in real time
- `docker-compose up -d` for running on the background

### Business logic

1. login or signup to get firebase token (auth.login || auth.signup)
2. create batch of courses (course.create)

- (this endpoint is public but you could create a user roles management for restricting it)
  here is an example payload:

```
{
  courses: [
    {
      "name": "Finance",
      "order": 0
    },
    {
      "name": "Investment",
      "order": 1,
      "dependencies": ["Finance"]
    },
    {
      "name": "Investment Management",
      "order": 2,
      "dependencies": ["Investment"]
    },
    {
      "name": "Portfolio theories",
      "order": 3,
      "dependencies": ["Investment"]
    },
    {
      "name": "Investment style",
      "order": 4,
      "dependencies": ["Investment Management"]
    },
    {
      "name": "Portfolio construction",
      "order": 5,
      "dependencies": ["Portfolio theories"]
    }
  ]
}
```

3. Create empty study-schedule (studySchedule.create)
4. Add desired courses to your study schedule (studySchedule.addCourses)
5. Courses schedule management:
   - take/begin a new course from your schedule (studySchedule.takeCourse)
   - finish your current course (studySchedule.finishCourse)
6. Study Schedule view (studySchedule.get)

- get your schedule of courses, ordered by course.order ASC

7. Courses view (course.getAll)

- get all courses from the system without an order
