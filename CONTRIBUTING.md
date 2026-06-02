> **English** | [Türkçe](CONTRIBUTING.tr.md)

# Contributing to KÜRSÜ

We welcome and appreciate contributions from the community to make KÜRSÜ a robust and impactful platform. This document outlines the guidelines for contributing to the KÜRSÜ project. By participating, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Table of Contents

1.  [Getting Started](#1-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Local Development Setup](#local-development-setup)
    *   [Running Tests](#running-tests)
2.  [Finding Tasks](#2-finding-tasks)
    *   [Issue Labels](#issue-labels)
    *   [Roadmap](#roadmap)
3.  [Contribution Workflow](#3-contribution-workflow)
    *   [Forking the Repository](#forking-the-repository)
    *   [Branching](#branching)
    *   [Committing](#committing)
    *   [Pull Requests (PRs)](#pull-requests-prs)
4.  [Code Style and Standards](#4-code-style-and-standards)
5.  [Testing](#5-testing)
6.  [Documentation](#6-documentation)
7.  [Communication](#7-communication)
8.  [Security](#8-security)
9.  [License](#9-license)

## 1. Getting Started

To contribute to KÜRSÜ, you'll need to set up your local development environment.

### Prerequisites

Ensure you have the following installed:

*   Node.js (v20 or higher)
*   pnpm (for monorepo management)
*   Git

### Local Development Setup

1.  **Clone your forked repository:**
    ```bash
    git clone https://github.com/vedatgurer/Kursu.git
    cd kursu
    ```
2.  **Install dependencies:**
    KÜRSÜ uses `pnpm` workspaces for its monorepo structure.
    ```bash
    pnpm install
    ```
3.  **Environment variables:**
    Copy the example environment file and configure it for local development.
    ```bash
    cp .env.example .env
    ```
    *Note: For initial development, the mock eligibility adapter is enabled by default.* 
4.  **Run the development server:**
    This will start the relayer and web application.
    ```bash
    pnpm dev
    ```
    The web application should be accessible at `http://localhost:5173`.

### Running Tests

Before submitting any changes, ensure all tests pass.

```bash
# Run all tests
pnpm test

# Run tests for a specific package (e.g., @kursu/ledger)
pnpm --filter @kursu/ledger test
```

## 2. Finding Tasks

We use GitHub Issues to track tasks, bugs, and feature requests.

### Issue Labels

Look for issues with the following labels:

*   `good first issue`: Ideal for new contributors to get familiar with the codebase.
*   `help wanted`: Tasks that are ready for community contribution.
*   `bug`: Report or fix a bug.
*   `feature`: Suggest or implement a new feature.
*   `documentation`: Improve existing documentation or add new content.

### Roadmap

Refer to the [ROADMAP.md](./ROADMAP.md) file for a high-level overview of the project's future direction and planned features.

## 3. Contribution Workflow

### Forking the Repository

1.  Go to the [KÜRSÜ GitHub repository](https://github.com/vedatgurer/Kursu) (replace with actual repo URL).
2.  Click the "Fork" button in the top right corner.

### Branching

Create a new branch for your changes from the `main` branch. Use a descriptive branch name (e.g., `feature/add-eligibility-api`, `bugfix/fix-voting-tally`).

```bash
git checkout main
git pull origin main
git checkout -b your-branch-name
```

### Committing

Write clear, concise commit messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification if possible (e.g., `feat: add new eligibility adapter`, `fix: resolve voting bug`).

All commits **must be signed** using GPG. This ensures the authenticity of contributions.

```bash
git commit -S -m "feat: your descriptive commit message"
```

### Pull Requests (PRs)

1.  Push your branch to your forked repository:
    ```bash
    git push origin your-branch-name
    ```
2.  Open a Pull Request from your forked repository to the `main` branch of the upstream KÜRSÜ repository.
3.  Fill out the [Pull Request Template](./.github/pull_request_template.md) thoroughly. Ensure you link to any relevant issues.
4.  Your PR will be reviewed by maintainers. Address any feedback promptly.

## 4. Code Style and Standards

*   **Linting**: We use ESLint and Prettier to enforce code style. Ensure your code passes linting checks before submitting a PR.
    ```bash
    pnpm lint
    pnpm format
    ```
*   **TypeScript**: Where applicable, use TypeScript for type safety and better code maintainability.
*   **Comments**: Add comments for complex logic or non-obvious code sections.

## 5. Testing

All new features and bug fixes should be accompanied by appropriate tests. We use Jest for testing. Aim for good test coverage.

## 6. Documentation

Keep the documentation up-to-date. If you add a new feature or change existing functionality, update the relevant `README.md` files within packages, the main `README.md`, or the `docs/` directory.

## 7. Communication

For general discussions, questions, or to connect with other contributors, please refer to our community channels (e.g., Discord, Forum - *to be specified*).

## 8. Security

If you discover a security vulnerability, please report it responsibly by following the guidelines in [SECURITY.md](./SECURITY.md).

## 9. License

By contributing to KÜRSÜ, you agree that your contributions will be licensed under the project's [AGPL-3.0-only License](./LICENSE).
