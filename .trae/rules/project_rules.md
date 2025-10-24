Development Guidelines (Cleaned & Performance-Oriented)

## Architecture

- Use functional components with TypeScript interfaces.
- Use App Router (app/ directory).
- Prefer Server Components; use use client only when required (event listeners, browser-only APIs, client state).
- Split features into folders: components, hooks, lib, services, types, constants.

## Naming Conventions

- PascalCase → Components, Types, Interfaces
- camelCase → Variables, Functions, Hooks, Props
- kebab-case → Folders and files (e.g., auth-form.tsx)
- UPPER_CASE → Env vars, global constants
- Prefixes:
  - Handlers: handleClick
  - Booleans: isOpen, hasError
  - Hooks: useSomething

## Styling

- Use TailwindCSS for utility-first styling.
- Use ShadCN for UI components; extend with Radix UI if needed.
- Design mobile-first.
- Implement dark mode with Tailwind.
- Avoid custom CSS unless strictly necessary.

## Performance Practices

- Use React.memo, useMemo, useCallback where beneficial.
- Avoid inline functions in JSX.
- Use dynamic imports (next/dynamic) for code splitting.
- Always set key in lists (avoid index as key).
- Minimize re-renders with proper state separation.

## State Management

- Local:
  - useState for simple UI state
  - useReducer for complex or grouped state
- Shared:
  - useContext for minimal global state
- Global:
  - Use Redux Toolkit
  - Use createSlice, avoid createReducer unless needed
  - Normalize state shape
  - Use selectors

## TypeScript Usage

- Enable strict mode
- Always type props, state, return values
- Use interface over type (for extension)
- Use utility types: Partial, Pick, Omit, Record
- Use generics when needed
- Avoid any

## Next.js Practices

- Use Image and Link from next/image and next/link
- Use metadata for SEO
- Use built-in caching strategies
- Handle errors with error.tsx and not-found.tsx
- Prefer Server Actions or getServerSideProps / getStaticProps for fetching
- Use environment variables via process.env

## Forms & Validation

- Use React Hook Form + Zod for validation
- Keep forms modular and controlled

## Protocolo de Commits

No tengo permitido hacer `commit` por mi cuenta. Cuando me lo solicites, generaré un mensaje de `commit` siguiendo la especificación de **Conventional Commits**. Esto asegura un historial de cambios limpio, legible y automatizable.

La estructura del mensaje será:

-   `feat`: Cuando se introduce una nueva funcionalidad (corresponde a `MINOR` en versionado semántico).
-   `fix`: Cuando se corrige un error (corresponde a `PATCH` en versionado semántico).
-   `refactor`: Para cambios en el código que no corrigen un error ni añaden una funcionalidad.
-   `style`: Cambios que no afectan al significado del código (espacios, formato, etc.).
-   `docs`: Cambios en la documentación.
-   `chore`: Tareas de mantenimiento, como actualizaciones de dependencias.

Solo procederé a realizar el `commit` después de tu confirmación explícita.