# my-js-app
Sample JavaScript project demonstrating DevSecOps: automated tests with Jest, code coverage reporting, secret scanning with Gitleaks, and code quality analysis with SonarQube via GitHub Actions
# JavaScript DevSecOps CI/CD Pipeline (Beginner Guide)

This guide walks you through building a complete DevSecOps pipeline for a JavaScript application using:

* Node.js / npm
* Jest (testing and coverage)
* Gitleaks (secret scanning)
* SonarQube (code quality and security)
* GitHub Actions (CI/CD automation)

---

# What You Will Achieve

By following this guide, you will:

* Create a Node.js application
* Write and run tests using Jest
* Generate code coverage reports
* Scan for secrets using Gitleaks
* Analyze code quality using SonarQube
* Automate everything using GitHub Actions

---

# Step 1: Create Your Project Folder

Open your terminal:

```bash
mkdir my-js-app
cd my-js-app
```

---

# Step 2: Initialize Node.js Project

```bash
npm init -y
```

This creates a `package.json` file that stores your project configuration and dependencies.

---

# Step 3: Install Dependencies

## Install Jest (testing)

```bash
npm install --save-dev jest
```

Explanation:

* `--save-dev` installs Jest as a development dependency
* Updates `package.json`, `package-lock.json`, and `node_modules/`

## Install Express (optional)

```bash
npm install express
```

---

## Update `package.json`

```json
{
  "name": "my-js-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

---

# Step 4: Create Application Code

Create a source folder:

```bash
mkdir src
```

Create `src/index.js`:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

# Step 5: Add Tests (Jest)

Create test folder:

```bash
mkdir __tests__
```

Create `__tests__/example.test.js`:

```javascript
test('simple addition works', () => {
  expect(2 + 2).toBe(4);
});
```

Notes:

* Test files must end with `.test.js` or `.spec.js`
* Jest automatically detects files in `__tests__/`

---

# Step 6: Add SonarQube Configuration

Create `sonar-project.properties` in the root folder:

```properties
sonar.projectKey=my-js-app
sonar.sources=src
sonar.tests=__tests__
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.sourceEncoding=UTF-8
```

Notes:

* Remove `sonar.organization` if using self-hosted SonarQube
* Keep coverage path for Jest integration

---

# Step 7: Project Structure

```
my-js-app/
├── src/
│   └── index.js
├── __tests__/
│   └── example.test.js
├── package.json
├── package-lock.json
├── sonar-project.properties
```

---

# Step 8: Initialize Git

```bash
git init
```

Create `.gitignore`:

```
node_modules/
coverage/
```

Add and commit:

```bash
git add .
git commit -m "Initial project setup"
```

---

# Step 9: Push to GitHub

Create a repository on GitHub and then run:

```bash
git remote add origin <YOUR_REPO_URL>
git branch -M main
git push -u origin main
```

---

# Step 10: Add GitHub Actions Workflow

Create:

```
.github/workflows/ci.yml
```

Add:

```yaml
name: DevSecOps Pipeline

on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:

jobs:
  pipeline:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test -- --coverage

      - name: Run Gitleaks scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v2
        with:
          args: >
            -Dsonar.projectKey=my-js-app
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

---

# Step 11: Add GitHub Secrets

Go to your repository:

Settings → Secrets → Actions

Add:

| Name           | Value                               |
| -------------- | ----------------------------------- |
| SONAR_TOKEN    | Your SonarQube token                |
| SONAR_HOST_URL | Example: http://100.26.197.202:9000 |
| GITHUB_TOKEN   | Already provided                    |

---

# Step 12: Trigger Pipeline

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push
```

---

# Step 13: Verify Pipeline

Go to GitHub → Actions and review logs.

Expected steps:

* Checkout repository
* Install dependencies
* Run Jest tests
* Generate coverage
* Run Gitleaks scan
* Run SonarQube analysis

---

# Pipeline Flow

```
Code -> Jest -> Coverage -> SonarQube -> Quality Report
           |
           -> Gitleaks -> Secret Detection
           |
           -> GitHub Actions -> Automation
```

---

# DevSecOps Pipeline Summary

| Step     | Tool           | Purpose                |
| -------- | -------------- | ---------------------- |
| CI/CD    | GitHub Actions | Automates pipeline     |
| Build    | npm / Node.js  | Install dependencies   |
| Test     | Jest           | Run tests and coverage |
| Security | Gitleaks       | Detect secrets         |
| Quality  | SonarQube      | Analyze code quality   |

---

# Optional Improvements

* Add ESLint for code linting
* Enforce SonarQube quality gates
* Add Docker support
* Add deployment stage

---

# Final Notes

* Ensure SonarQube is reachable from your CI runner
* Use correct `SONAR_HOST_URL`
* Keep secrets secure using GitHub Secrets

---

# Conclusion

You now have a working DevSecOps pipeline for a JavaScript project with testing, security scanning, and code quality analysis automated through GitHub Actions.



## What happened to sonarqube coverage? Read this and resolve it


Your app
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Your test
test('simple addition', () => {
  expect(2 + 2).toBe(4);
});
Problem (very important)

Your test:

Does NOT import your app
Does NOT call your route /
Does NOT execute any code in src/

So SonarQube correctly says:

Coverage: 0%
2. The real fix (step-by-step)

You need to make your app testable.

Step 1: Split your app into two files
src/server.js (export the app)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
src/index.js (start the server)
const app = require('./server');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
Why this matters
server.js → testable (no listening)
index.js → runs the app
3. Install testing tool for APIs
npm install --save-dev supertest
4. Write a REAL test
__tests__/server.test.js
const request = require('supertest');
const app = require('../src/server');

test('GET / should return Hello World', async () => {
  const res = await request(app).get('/');

  expect(res.statusCode).toBe(200);
  expect(res.text).toBe('Hello World');
});
5. Run tests again
npm test -- --coverage
6. What happens now
Before:
Test → runs math only → app not touched → coverage = 0%
After:
Test → calls / route → Express handler runs → coverage increases
7. What SonarQube will now show

Instead of:

0% coverage

You’ll get something like:

60% - 100% coverage (depending on tested code)
8. Key DevSecOps lesson

Coverage is NOT about:

2 + 2

Coverage IS about:

How much of your application code was executed during tests
9. Quick checklist

Make sure you have:

src/server.js exporting app
src/index.js starting server
__tests__/server.test.js calling routes
supertest installed
npm test -- --coverage generating coverage
