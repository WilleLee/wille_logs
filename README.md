## Wille logs&hellip; 🍊

### Purpose of the project

1. to craeate a thread to save my daily book notes and thoughts
2. to enable customizing my own resumé
3. to build a modern web application with the latest technologies and design trends

### Dev Environment

- Next.js 14.1.0 (React ^18)
- MongoDB Atlas with Mongoose ^8.1.0
- Typescript ^5
- Recoil ^0.7.7
- CI/CD & deplyment with Vercel

### Project Structure

```
root
├── app
│   ├── __tests__
│   ├── api // api entry points (route.ts)
│   ├── atoms
│   ├── components
│   ├── hooks
│   ├── libs
│   ├── mocks
│   ├── models
│   └── layouts and pages
├── public // static assets
└── config and env files
```

### TODOs

#### v1.0.0

- [x] connect to mongodb
- [x] deploy to vercel
- [x] build models
  - [x] thread
  - [x] tag
- [x] build APIs
  - [x] `/login`
  - [x] `/threads`
  - [x] `/tags`
- [x] build UIs & controllers
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

#### v1.0.1

- [x] fixed an issue about tags expanding button

#### v1.1.0

- [x] refactor header component
- [x] add Kr/En language switcher
  - [x] language switcher in the setting modal
  - [x] add recoil state for the default or selected language
  - [x] add initializer function
- [x] light/dark mode switcher
  - [x] switcher in the setting modal
  - [x] add recoil state for the default or selected mode
  - [x] add initializer function
- [x] improve SEO
  - [x] optimize meta tags for each page
  - [x] separate open graph tags for each page and production/development environment

#### v1.1.1 (HOTFIX)

- [x] fix the issue that the screen mode doesn't persist after navigating to another page

#### v1.1.2

- [x] the issuse of incorrect opengraph base url generated by environment variables has been fixed (added NEXT_PUBLIC_MODE)

#### v1.1.3

- [x] update `/wille` content design/data
  - [x] careers
  - [x] personal projects
  - [x] extra contents
- [x] add button height changes (media query) to showAllButton in the tag component

#### v1.1.4

- [x] fixed the issue that screen-x is overflowed in the mobile view because of margin in loading box (tags)
- [x] fixed the issue that the language mode doesn't persist after navigating to another page

#### v1.1.5

- [x] added required and recommended manifest tags for PWA (512 icon, categories, dir, lang,)

#### v1.1.6

- [x] deleted unnecessary styles for focused buttons
- [x] added a default loading component that renders before tags and threads are all loaded
- [x] added styles for selected tags
- [x] refactored components for home page
- [x] added global SWR config wrapper to handle intervals
- [x] added default loading timeout for home page
- [x] fixed the issue of unnecessary initializations of recoil root by creating `InitWrapper` and removing `template.ts`

#### v1.1.7

- [x] fix the issue that the theme-color appears when the content(main) is overscrolling (fixed header -> sticky header)
- [x] added shortcuts for PWA configuration

### Notable Issues

1. no route groups for the entry page (`/`)
2. next.js doc says all the components called inside a client compoennt are also client components, but it does not exactly mean that I don't need to declare those components as client components explicitly, even in the case of common components like buttons or svgs.
3. server preservation in dev mode sucks.
4. `WriteModal` is overlapped by the keyboard on mobile devices(iPad), which needs to be fixed by adjusting the position of the modal.
5. event target and current target do not match if state changes that trigger content of a component to be switched happen by click event.
6. box-sizing is not inherited in production mode.
7. recoil root on template.ts is initialized every time users navigate to another page, which causes the loss of the latest state.
