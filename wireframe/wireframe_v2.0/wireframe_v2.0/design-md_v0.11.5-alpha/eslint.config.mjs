/**
 * ESLint flat config (v0.11.0-alpha)
 *
 * Architectural barrier for icon enforcement (DESIGN.md icon_system, F-017).
 * Direct `lucide-react` imports are forbidden everywhere except in
 * `src/baseline/icons/index.js` (the 156 approved icon re-export wrapper).
 *
 * To use a new icon, the spec must first be amended in
 * DESIGN.md icon_system.approved_icons (owner decision required).
 */
export default [
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lucide-react',
              message:
                "Direct 'lucide-react' import is forbidden. Import icons from 'src/baseline/icons/index.js' (the 156 approved icon wrapper). To add a new icon, amend DESIGN.md icon_system.approved_icons first (owner decision).",
            },
          ],
        },
      ],
    },
  },
  {
    // Wrapper itself is the only place allowed to import directly from lucide-react.
    files: ['src/baseline/icons/index.js'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
