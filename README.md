## Wille logs&hellip; 🍊

### Purpose of the project

1. to craeate a thread to save my daily book notes and thoughts
2. to enable customizing my own resumé
3. to create a browser alarm modal to routinize my daily life

### Dev Environment

1. Next.js 14.0.3 (React ^18)
2. MongoDB Atlas with Mongoose ^8.1.0
3. Typescript ^5

### Project Structure

```
root
├── app
│   ├── (pages) // pages(page.tsx) and their UI logic(components, styles, hooks etc.)
│   ├── api // api entry points (route.ts)
│   ├── _components
│   ├── _hooks
│   ├── _libs
│   ├── _mocks
│   └── _models
├── public // static assets
└── config and env files
```

### TODOs

- [x] connect to mongodb
- [x] deploy to vercel
- [ ] build models
  - [x] thread
  - [x] tag
  - [ ] plan
- [ ] build APIs
  - [ ] `/login` (necessary?)
  - [ ] `/threads` (ing)
  - [ ] `/tags` (ing)
  - [ ] `/plans`
- [ ] build UIs
  - [ ] layouts
    - [ ] header (desktop / mobile)
    - [ ] bottom navigation bar (mobile)
  - [ ] `/`
    - [ ] profile?
    - [ ] tags
    - [ ] threads
- [x] connect to google analytics
