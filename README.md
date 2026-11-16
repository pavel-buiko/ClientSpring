# ClientSpring

A deployment-oriented React client for the Spring Projects catalogue with search, responsive navigation, and a sign-in page. The project uses React, Redux, React Router, Vite, and Sass. It is configured with the `/ClientSpring/` base path for GitHub Pages.

## Run locally

```sh
npm ci
npm run dev
```

Open the Vite URL under `/ClientSpring/`. The client uses a hosted API configured in [actions.js](src/store/actions/actions.js). For local development against a local API, use [reactSpringCopyClient](https://github.com/pavel-buiko/reactSpringCopyClient) and [reactSpringCopyServer](https://github.com/pavel-buiko/reactSpringCopyServer).

Run `npm test` for the Jest suite.
