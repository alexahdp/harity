module.exports = {
  "parser": "babel-eslint",

  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    "plugin:flowtype/recommended"
  ],

  env: {
    browser: true,
    node: true,
    "jest": true,
  },

  globals: {
    'expect': true,
    'chai': true,
  },

  plugins: [
    "redux-saga",
    'react',
    'flowtype',
    "jsx-a11y"
  ],

  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    },
    'react': {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "16.5",
      "flowVersion": "0.2.3"
    },
    "propWrapperFunctions": [ "forbidExtraProps" ],
  },
  // add your custom rules here
  rules: {
    'import/no-named-as-default': ['off'],
    'no-underscore-dangle': ['off'],

    'arrow-parens': ['error', 'as-needed'],

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [

      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
