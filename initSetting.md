## eslint

- 1. install library
```sh
yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
```

- 2. touch .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};

## prettier

- 1. install library
```sh
yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier
```

2. touch .prettierrc.js
module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'auto',
};

3. .eslintrc.js 변경
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @eslint-plugin-react
    // 'prettier/@typescript-eslint', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // 추후 .prettierrc.js 파일에서 설정해줄 예정
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
