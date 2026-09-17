import * as React from 'react';

// Expose React globally for components compiled with the classic JSX runtime
(globalThis as any).React = React;

// Note: we avoid importing `@testing-library/jest-dom` here because
// some versions pull in `jsdom`/`undici` which may be incompatible
// with Node v20 in this environment. Tests in this repo don't rely
// on jest-dom specific matchers, so it's safe to skip.
