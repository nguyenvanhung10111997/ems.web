# Test Files

This directory contains all test files for the EMS system.

## Structure

```
__tests__/
├── setup.ts              # Test setup and configuration
├── components/           # Component tests
├── pages/                # Page tests
├── store/                # Store tests
└── utils/                # Utility tests
```

## Running Tests

```bash
npm run test              # Run tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Run tests with coverage
```

## Writing Tests

Follow the patterns in the existing test files:
- Use Vitest for testing
- Use React Testing Library for component tests
- Use `@testing-library/jest-dom` matchers
- Place test files next to the component or in this directory
