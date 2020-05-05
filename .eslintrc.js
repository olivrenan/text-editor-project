module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended", "prettier/react"],
  plugins: ["react", "jest", "prettier"],
  rules: {
    "babel/object-curly-spacing": "off",
    camelcase: "off",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "default-case": "off",
    eqeqeq: "off",
    "func-names": "off",
    "global-require": "off",
    "import/extensions": "off",
    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { aspects: ["invalidHref"] }],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "no-nested-ternary": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-return-await": "off",
    "no-shadow": "off",
    "no-trailing-spaces": [2, { skipBlankLines: true }],
    "no-underscore-dangle": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next|val" }],
    "object-shorthand": "off",
    "prefer-spread": "off",
    "prefer-template": "off",
    "react/button-has-type": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-boolean-value": ["warn", "never"],
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-curly-spacing": ["warn", "never"],
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx"] }],
    "react/jsx-first-prop-new-line": ["warn", "multiline"],
    "react/jsx-handler-names": "off",
    "react/jsx-handler-names": [
      "warn",
      { eventHandlerPrefix: "handle", eventHandlerPropPrefix: "on" }
    ],
    "react/jsx-indent-props": "off",
    "react/jsx-indent": ["warn", 2],
    "react/jsx-key": "error",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-wrap-multilines": ["warn"],
    "react/no-access-state-in-setstate": "off",
    "react/no-array-index-key": "off",
    "react/no-unused-state": "warn",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/self-closing-comp": ["warn", { component: true, html: false }],
    "react/sort-comp": [
      1,
      {
        order: ["static-methods", "lifecycle", "everything-else", "rendering"],
        groups: { rendering: ["/^render.+$/", "render"] }
      }
    ]
  },
  globals: {
    React: true,
    require: true
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./webpack/webpack.common.js"
      }
    }
  }
};
