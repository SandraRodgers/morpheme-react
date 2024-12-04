# Morpheme React Component Library

**Morpheme React** is a reusable component library for React, built with TypeScript and styled with Tailwind CSS. The library aims to provide customizable and accessible components for rapid UI development.

---

## Features

- **Reusable Components**: Streamlined components for React projects.
- **TypeScript Support**: Fully typed for improved development experience.
- **Tailwind CSS**: Built with utility-first styles for customizability.
- **Lightweight**: Optimized for performance and modular imports.

---

## Installation

The library is still under development and not yet published on npm. Stay tuned for updates!

---

## Components

### Available Components

- **Button**
  - Description: A simple customizable button component.
  - Usage example provided below.

---

## Development

### Prerequisites

- Node.js 18+
- npm or Yarn

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/morpheme-react.git
cd morpheme-react
npm install
```

### Running the Playground

```bash
npm run dev
```
### Using the Components

Once the library is published, you can use the components in your React project as follows:

```bash
npm install morpheme-react
```

```tsx
import { Button } from '@morpheme/react';

function App() {
  return (
    <Button
      label="Click Me"
      onClick={() => alert('Button clicked!')}
    />
  );
}
```
