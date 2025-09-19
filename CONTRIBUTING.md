# Contributing

Thanks for your interest in improving `@rayners/foundry-module-types`! This guide outlines
how to propose changes and the expectations for contributors.

## Code of Conduct

Please be respectful and collaborative when interacting with maintainers and other
contributors. Report any inappropriate behaviour to the repository maintainers.

## Getting Started

1. Fork the repository and clone your fork locally.
2. Install dependencies with `npm install` (Node.js 18 or newer is required).
3. Create a new branch for your change.

## Development Workflow

- Keep pull requests focused and provide context in the description for the change.
- Ensure TypeScript definitions remain backwards compatible unless a breaking change is
  coordinated with the maintainers.
- Update documentation when you add new types or exports.

## Required Checks

Run the following commands and make sure they succeed before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
```

CI will run these commands as well, so passing them locally saves time for reviewers.

## Commit Guidelines

- Write clear commit messages that describe _why_ the change is necessary.
- Keep commits logically scoped; avoid combining unrelated changes in a single commit.
- Reference relevant issues in your pull request description.

Thank you for helping make these shared types better for everyone!
