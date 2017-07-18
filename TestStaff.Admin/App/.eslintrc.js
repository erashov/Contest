module.exports = {
    "extends": "google",
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "no-warning-comments": [
            0
        ],
        "object-curly-spacing": ["error", "always"],
        "max-len": [
            "error",
            {
                "code": 120
            }
        ],
        "radix": [
            2,
            "as-needed"
        ],
        "no-nested-ternary": [
            0
        ],
        "no-implicit-coercion": [2, { "allow": ["!!"] }],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    "env": {
        "browser": true,
        "es6": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "arrowFunctions": true,
            "binaryLiterals": true,
            "blockBindings": true,
            "classes": true,
            "defaultParams": true,
            "destructuring": true,
            "forOf": true,
            "generators": true,
            "modules": true,
            "objectLiteralComputedProperties": true,
            "objectLiteralDuplicateProperties": true,
            "objectLiteralShorthandMethods": true,
            "objectLiteralShorthandProperties": true,
            "octalLiterals": true,
            "regexUFlag": true,
            "regexYFlag": true,
            "spread": true,
            "superInFunctions": true,
            "templateStrings": true,
            "unicodeCodePointEscapes": true,
            "globalReturn": true,
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "globals": {
        "React": true
    },
    "plugins": [
        "react"
    ]
};