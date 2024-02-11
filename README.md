## Wille logs&hellip; 🍊

### Purpose of the project

1. to craeate a thread to save my daily book notes and thoughts
2. to enable customizing my own resumé
3. to build a modern web application with the latest technologies and design trends

### Dev Environment

1. Next.js 14.1.0 (React ^18)
2. MongoDB Atlas with Mongoose ^8.1.0
3. Typescript ^5

### Project Structure

```
root
├── app
│   ├── __tests__
│   ├── api // api entry points (route.ts)
│   ├── components
│   │   ├── pages
│   │   ├── boxes
│   │   ├── buttons
│   │   ├── Form
│   │   ├── layouts
│   │   ├── modals
│   │   ├── svgs
│   │   └── loading
│   ├── hooks
│   ├── libs
│   ├── mocks
│   ├── models
│   └── layouts and pages
├── public // static assets
└── config and env files
```

### TODOs (1.0)

- [x] connect to mongodb
- [x] deploy to vercel
- [x] build models
  - [x] thread
  - [x] tag
- [x] build APIs
  - [x] `/login`
  - [x] `/threads`
  - [x] `/tags`
- [x] build UIs
  - [x] layouts
    - [x] header
      - [x] navigations (home and `/wille`)
      - [x] write button
        - [x] login modal & functionalities
        - [x] write modal & functionalities
      - [x] setting (UI, login, logout)
  - [x] `/`
    - [x] tags
      - [x] basic UIs and functionalities
      - [x] loading
    - [x] threads
      - [x] basic UIs and functionalities
      - [x] loading
    - [x] context controllers between tags and threads
  - [x] `/wille` : resumé
    - [x] tabs and functionalities
      - [x] added a tab initializer using cookie
    - [x] content
      - [x] layout
      - [x] career
      - [x] personal projects
      - [x] etc. : education, skills, languages...
- [x] connect to google analytics - _has issues about the third-party cookies warning_

### Notable Issues

1. no route groups for the entry page (`/`)
2. next.js doc says all the components called inside a client compoennt are also client components, but it does not exactly mean that I don't need to declare those components as client components explicitly, even in the case of common components like buttons or svgs.
3. server preservation in dev mode sucks.
4. `WriteModal` is overlapped by the keyboard on mobile devices(iPad), which needs to be fixed by adjusting the position of the modal.
