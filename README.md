# Design Considerations and Submission Notes

## Workflow & Process

- **Issue Tracking**: I created [issues](https://github.com/jordojordo/service-hub/issues?q=is%3Aissue%20state%3Aclosed) to track workflow and progress, which allowed me to break down the [project](https://github.com/users/jordojordo/projects/1) into manageable tasks.
- **Project Board**: A [GitHub project board](https://github.com/users/jordojordo/projects/1) was set up to visually manage and track the status of each task throughout the development process.
- **Pull Requests**: For each issue, a [dedicated pull request](https://github.com/jordojordo/service-hub/pulls?q=is%3Apr+is%3Aclosed) was created. This ensured that tests and builds passed before merging, and it also provided a clear history for others to review or contribute.

## UI Focus & Implementation

- **UI Emphasis**: As discussed during the Panel 1 interview, my main focus was on the UI. I paid particular attention to aligning with the Figma mock and ensuring responsiveness and pixel-perfect details.
- **Componentization & Testing**: Efforts were made to create modular components (e.g., `ServiceCatalog`, `Modal`, etc.) with associated unit and component tests to ensure reliability and maintainability.

## Server & Type Safety

- **Minimal Server Changes**: I performed a small refactoring on the server to improve type safety. The focus was to ensure that the typing was more robust, while the server functionality was largely left intact.

## Assumptions & Trade-offs

- **Assumptions**:
  - The primary goal was to deliver a solid UI experience, given the focus area in our discussion.
  - The server was assumed to be reliable, so only minimal adjustments were necessary.
- **Trade-offs**:
  - In the interest of time, some features (e.g., complete test coverage across all components) were scoped down to cover key elements like the `ServiceCatalog`.
  - For the Service Package creation, a simplified placeholder implementation was provided rather than a fully-fledged solution.
  - Certain libraries (e.g., for SVG loading or date formatting) were avoided in favor of in-lined implementations to minimize dependencies and streamline the code.

## Submission Process

- **Commit Log**: The commit history is structured with conventional commit messages to clearly communicate the changes made for each task.
- **Pull Request Documentation**: Each PR includes a detailed body that outlines the fixes, enhancements, and any related design decisions.
- **Testing & Build**: Every commit and pull request underwent rigorous testing and build checks to ensure code quality and maintainability.

Feel free to reach out if there are any questions or if further clarification is needed.

---

## Project Setup

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
