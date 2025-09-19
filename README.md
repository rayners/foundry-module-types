# @rayners/foundry-module-types

Shared TypeScript declarations for David Raynes' suite of Foundry Virtual Tabletop modules.

## Installation

Install the package as a development dependency so your TypeScript project can rely on the
published declaration files:

```bash
npm install --save-dev @rayners/foundry-module-types
```

The package targets Node.js 18+ environments in alignment with Foundry VTT's current
requirements.

## Usage

Import the modules that your project depends on to gain typed access to their public APIs.
Every module exports namespaces that mirror the structure of the deployed Foundry modules.

```ts
import { Foundry, SeasonsAndStars, TaskAndTrigger } from '@rayners/foundry-module-types';

function registerSetting(settings: Foundry.ClientSettings) {
  settings.register('task-and-trigger', 'autoAssignTasks', {
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });
}

const travelRoles: SeasonsAndStars.TravelRole[] = [
  {
    id: 'scout',
    name: 'Scout',
    description: 'Keeps a lookout for trouble while the company travels.',
  },
];

const trigger: TaskAndTrigger.TaskTrigger = {
  id: 'restock-herbs',
  name: 'Restock Herbs',
  frequency: 'weekly',
  execute: async () => {
    // Custom campaign logic here.
  },
};
```

Available namespaces include:

- `Foundry` – Lightweight primitives that model the Foundry VTT runtime.
- `SeasonsAndStars` – Types shared by the **Seasons & Stars** module.
- `SimpleCalendarCompat` – Helpers for interoperability with Simple Calendar.
- `JourneysAndJamborees` – Journeys & Jamborees module types.
- `RealmsAndReaches` – Shared declarations for the Realms & Reaches module.
- `TaskAndTrigger` – Task automation and scheduler primitives.
- `ErrorsAndEchoes` – Utilities for the Errors & Echoes module.

Check the [`src/`](./src) directory for the latest source of truth. The compiled
`.d.ts` files emitted to `dist/` are published with each release.

## Contributing

Community contributions are welcome! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for
information on setting up your local environment, coding standards, and required checks
before opening a pull request.

## License

This project is distributed under the terms of the [MIT License](./LICENSE).
