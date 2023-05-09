## Bankuish challenge :rocket:

### Technical details

https://docs.google.com/document/d/1p4JYPEfR-cE40DfqeRKlE8VTc54esduKWK-UplOwoU0/edit?usp=sharing

### Prerequisites

Note: If you are in windows, please consider cloning this project using `--config core.autocrlf=input` see [here](https://github.com/tiangolo/uwsgi-nginx-flask-docker/issues/127) why

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

### Quick start

1. `git clone https://github.com/FernandoViudez/bankuish-challenge.git --config core.autocrlf=input`
2. add `.env` passed into mail to root folder
3. `docker compose up -d`
4. open http://localhost:3000
5. you should see `200` as response
6. now you cant import postman project and start playing! Please consider reading [business logic](#business-logic) before using postman project.

### Steps to import [postman project](./postman/)

1. open postman
2. select your workspace (or create if your don't already have one)
3. select "collections" from sidenav
4. click on "import" button up to collections
5. drag and drop files from [postman folder](./postman/) from this repo
6. select `bankuish-local` environment at the right top of your screen
7. that's all, now you can start calling endpoints from postman collection!

### Run this project using docker compose

##### Before running docker compose check you have .env file (passed into challenge email) at the root of this project. If you don't have it, please send me an [email](viudezfernando@gmail.com) requesting the .env file.

- `docker compose up` for running and monitoring in real time
- `docker compose up -d` for running in the background

### Business logic

1. login or signup to get firebase token (`auth.login` || `auth.signup`)
2. create batch of courses (`course.create`)

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

3. Create empty study-schedule (`studySchedule.create`)
4. Add desired courses to your study schedule (`studySchedule.addCourses`)
5. Courses schedule management:
   - take/begin a new course from your schedule (`studySchedule.takeCourse`)
   - finish your current course (`studySchedule.finishCourse`)
6. Study Schedule view (`studySchedule.get`)

- get your schedule of courses, ordered by course.order ASC

7. Courses view (`course.getAll`)

- get all courses from the system without an order

### TODO:

Tests
