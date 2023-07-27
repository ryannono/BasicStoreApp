# Types

This directory contains TypeScript type definitions used throughout the TasteTrove server application. These types are meant to enforce structure and improve code readability and maintainability.

The types are organized into separate files based on their usage:

- `userTypes.ts`: Types related to user data and operations.

## Usage

The types are re-exported through `index.ts`, allowing them to be imported from `types` directly.

Here's an example of how to import the types:

```typescript
import { UserType } from '../types';
```
