
---

# ParoCyber DevSecOps Pipeline

This repository demonstrates a **beginner-friendly DevSecOps CI/CD pipeline** for a Node.js application with automated testing, code coverage, secret scanning, vulnerability analysis, and code quality checks.

The goal is to help beginners understand CI/CD and DevSecOps concepts while providing a working example.

---

## Project Philosophy

* **Simple first**: Quick setup to run tests, scans, and CI/CD automation
* **Detailed next**: Learn each folder, command, workflow, and concept step by step

---

## Simple Guide

1. **Clone the repository**

```bash
git clone <YOUR_REPO_URL>
cd my-js-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run tests and generate coverage**

```bash
npm test
```

4. **Check GitHub Actions workflows**

* `.github/workflows/simple.yaml` – Quick/simple pipeline for beginners
* `.github/workflows/detailed.yaml` – Step-by-step pipeline for learning DevSecOps

---

## Project Structure

```text
my-js-app/
├── src/
│   ├── server.js         # Exports Express app for testing
│   └── index.js          # Starts the server
├── __tests__/
│   └── example.test.js   # API tests using Supertest
├── .github/
│   └── workflows/
│       ├── simple.yaml   # Quick CI/CD workflow
│       └── detailed.yaml # Step-by-step workflow
├── .gitignore            # Files/folders Git should ignore
├── package.json          # Project metadata, dependencies, scripts
├── package-lock.json     # Locks dependency versions
├── sonar-project.properties # SonarQube/SonarCloud configuration
└── node_modules/         # Installed packages (auto-generated)
```

---

## Folder/File Purpose

| Folder/File                | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `src/`                     | Application code                              |
| `__tests__/`               | Unit and API tests (Jest + Supertest)         |
| `.github/workflows/`       | CI/CD automation workflows                    |
| `.gitignore`               | Files to exclude from Git commits             |
| `package.json`             | Project metadata, dependencies, and scripts   |
| `package-lock.json`        | Locks dependency versions for reproducibility |
| `sonar-project.properties` | SonarQube/SonarCloud analysis configuration   |
| `node_modules/`            | Local installed packages (auto-generated)     |

---

## package.json Explained

```json
{
  "name": "my-js-app",
  "version": "1.0.0",
  "description": "A JavaScript project with CI/CD pipeline, Jest, SonarCloud",
  "license": "ISC",
  "type": "commonjs",
  "main": "src/index.js",
  "scripts": {
    "test": "jest --coverage"
  },
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "jest": "^30.3.0",
    "supertest": "^6.3.3"
  }
}
```

**Explanation:**

* `dependencies` – Packages required to run the application
* `devDependencies` – Packages for development and testing
* `scripts` – Commands that can be run with `npm run <script>`
* `main` – Entry point of the app
* `type` – Module system (CommonJS)

---

## Application Code

### `src/server.js` – Testable App

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
```

### `src/index.js` – Start Server

```js
const app = require('./server');
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Tests – `__tests__/example.test.js`

```js
const request = require('supertest');
const app = require('../src/server');

test('GET /', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe('Hello World');
});
```

---

## .gitignore

```text
node_modules/
dist/
build/
.env
coverage/
.DS_Store
```

---

## CI/CD Workflows

### Simple Workflow – `simple.yaml`

Steps: checkout → install → test → secret scan → Sonar analysis

```yaml
on:
  workflow_dispatch:

jobs:
  pipeline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - run: npm install

      - run: npm test -- --coverage

      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - uses: SonarSource/sonarcloud-github-action@v2
        with:
          args: >
            -Dsonar.projectKey=samuel-nartey_my-js-app
            -Dsonar.organization=samuel-nartey
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

---

## SonarCloud vs Self-Hosted SonarQube

| Feature      | SonarCloud    | Self-Hosted SonarQube       |
| ------------ | ------------- | --------------------------- |
| Server Setup | Cloud-hosted  | You manage server           |
| URL          | Not required  | Required (`sonar.host.url`) |
| Token        | Required      | Required                    |
| Plugins      | Pre-installed | Can install custom plugins  |

**Example `sonar-project.properties`**

```properties
# Unique project key
sonar.projectKey=my-js-app

# Source folder
sonar.sources=src

# Test folder
sonar.tests=__tests__

# Jest coverage report
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Source encoding
sonar.sourceEncoding=UTF-8

# SonarQube server URL (self-hosted only)
sonar.host.url=http://100.26.197.202:9000
```

---

## Optional Improvements

* Add ESLint for code linting
* Configure SonarCloud quality gates
* Dockerize the app and add container scanning
* Extend security scans with Trivy or additional scanners

---

## Conclusion

This repository provides a **complete JavaScript DevSecOps pipeline** with:

* Unit and API testing (Jest + Supertest)
* Coverage reporting
* GitHub Actions CI/CD workflow
* Secret scanning with Gitleaks
* Code quality analysis (SonarCloud or self-hosted SonarQube)

It is beginner-friendly, detailed, and provides a foundation to explore advanced DevSecOps concepts.

---
