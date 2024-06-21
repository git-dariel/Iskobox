# Iskobox (Web)

Welcome to the Iskobox App documentation

## Setup

1.  Clone the repository
    `git clone https://github.com/git-dariel/Iskobox.git`
2.  Install dependencies
    `npm install`
3.  Run local server
    `npm run dev`

## Adding new Component/Feature/Page

1.  Create a new file inside the "pages" folder (e.g. `Analytics.jsx`)
2.  Open your new page file, type `rfce` and it will generate a React functional component for you, import React, and export the component.
3.  Define a route for a new page. In your main application file (usually `App.js` or `Router.js`), import the necessary components from `react-router-dom` and define a route for your new page using Route component (If your project don't have react-router-dom yet, do a `npm install react-router-dom`)
4.  Link to the new page by creating links to navigate to it. Use the Link component from `react-router-dom`.

## Software Configuration Management (SCM)

**"One Feature, One Branch"**
We use GitFlow Workflow [(read me)](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as our branching strategy where we create new branches for every feature we develop. As such, we create `hotfix` and `release` branches as needed using the same concept.

e.g. You will add a feature called "Advance Analytics"

1.  Create a branch from the `develop-branch` and name it `advance-analytics-feature` and checkout this branch
2.  Make your changes to your newly created branch and perform all tests (local server and Sandbox/Dev environment) before doing a commit and push for all your changes
3.  Create a "Pull Request" to the `develop-branch` and add all the leads as reviewers. Once the PR is approved and merged, the `develop-branch` can be deployed to the "Test" environment

## Best Practices

- Use **Assistive Coding** to validate codes and review to make sure
  our codes are optimized and error free before pushing the codes to our git repository.

  - [OpenAI ChatGPT](https://chat.openai.com/)
  - [Google Gemini](https://makersuite.google.com/app/prompts/new_freeform)
  - [Groq Mixtral](https://groq.com/)

- Use different environments to isolate testing and deployment.
  - **Dev/Sandbox** (required for Developer and Isolated Testing)
  - **Test/Staging environment** (required for E2E and Client Testing)
  - **QC environment** (optional for Internal Testing, a production clone)
  - **UAT Environment** (optional for Isolated Client Testing, , a production clone)
  - **Production** (required)

## Online References and Guides

- [GitHub Desktop Doc](https://docs.github.com/en/desktop/overview/about-github-desktop)
- [React Leaflet](https://react-leaflet.js.org/docs/start-installation/)
- [How to Create a Express/Node + React Project | Node Backend + React Frontend](https://www.youtube.com/watch?v=w3vs4a03y3I&list=PLwCOqpI4WKFx_f-Fg3CHwF7n0080x-Yme&index=5&t=225s)
- [Creating High-Quality React Components: Best Practices for Reusability](https://www.youtube.com/watch?v=eXRlVpw1SIQ&t=548s)
- [Best ChatGPT prompts for coding](https://www.learnprompt.org/chat-gpt-prompts-for-coding/)
