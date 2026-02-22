# learning-playwright

A monorepo for learning Playwright with E2E UI tests, API tests, accessibility checks, visual regression, and monkey testing.

## Beginner notes
### Setup references

- Download VSCode editor: https://code.visualstudio.com/download
- Install VSCode Git add-on: https://code.visualstudio.com/docs/sourcecontrol/github
- Install Homebrew: https://brew.sh/ (If using MacOs M\* series, use their .pkg file and follow the instructions at the end of the installation to upate `PATH`)
- Install Git: https://git-scm.com/download/mac
- Install VSCode Playwright add-on: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

### Using GitHub

- `git checkout -b <<branch name>>` - creates a new branch and switch from your current branch to there
- `git checkout <<branch name>>` - to switch to a different branch
- `git status` - shows the branch you're currently working on and all files with changes
- `git add .` - prepares all files with changes to be pushed
- `git commit -m "your commit message"` - commits your changes to the current branch
- `git push` - pushes your changes to the branch
- `git pull origin main` - gets the latest changes from the main branch and merges it with your current branch

### References

- [Writing tests](https://playwright.dev/docs/writing-tests)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)

## Project structure
```
learning-playwright/
├── packages/
│ ├── sauce-demo/ # UI tests against demo.saucedemo.com
│ │ ├── fixtures/ # Playwright fixtures with POM
│ │ ├── pom/ # Page Object Model (pages & components)
│ │ ├── tests/ # login, shopping-cart, product, a11y, visual-regression, monkey-testing
│ │ ├── constants/
│ │ ├── interfaces/
│ │ └── test-data/
│ └── api-restful-booker/ # API tests against restful-booker.herokuapp.com
│ ├── fixtures/
│ ├── models/
│ ├── tests/ # booking (create, get), ping
│ └── constants/
├── commons/ # Shared utilities
│ ├── a11y.ts # Accessibility (axe-core)
│ ├── monkey.ts # Monkey testing (gremlins.js)
│ ├── test-tags.ts # Tags (@smoke, @mobile, @cross-browser, etc.)
│ └── ...
├── playwright.config.ts
└── package.json
```

## Setup
### Prerequisites

- Node.js 18+
- Git

### First time setup

1. Clone the repo and install dependencies: `npm ci`
2. Install Playwright browsers: `npx playwright install --with-deps`
3. Copy `.env.secret.example` to `.env.secret` and set required variables (see [Environment variables](#environment-variables))

## Running tests

| Command                              | Description                     |
|--------------------------------------|---------------------------------|
| `npm run test`                       | Opens Playwright UI mode        |
| `npx playwright test`                | Run all tests                   |
| `npx playwright test --grep @smoke`  | Run smoke tests only            |
| `npx playwright test --project desktop-chrome` | Run in Chrome only        |
| `npx playwright test packages/sauce-demo` | Run Sauce Demo tests only  |
| `npx playwright test packages/api-restful-booker` | Run API tests only       |

## Test types

- **UI (Sauce Demo):** login, shopping cart, product listing/details, add/remove cart, checkout
- **API (Restful Booker):** create booking, get booking, ping; field validation for create
- **Accessibility:** axe-core (WCAG 2a/2aa, 2.1a/2.1aa) and ARIA snapshots
- **Visual regression:** full-page screenshots for main flows
- **Monkey testing:** gremlins.js on login page

## CI/CD

- **main.yml:** Runs on push/PR to `main` and scheduled runs (Mon–Fri 5–22 UTC)
- **manual-test-trigger.yml:** Manual run of smoke or full suite