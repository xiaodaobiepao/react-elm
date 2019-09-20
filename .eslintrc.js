module.exports = {
    "parser": "babel-eslint", // 解析器
    "extends": "airbnb", // 继承的规则
    "env": { // 配置环境
        "browser": true,
        "node": true
    },
    "rules": {
        "linebreak-style": [0, "error", "windows"],
        "semi": "off",
        "import/newline-after-import": "off",
        "react/prefer-stateless-function": "off",
        "indent": ["error", 2],
        "react/jsx-indent": ["error", 2],
        "react/jsx-filename-extension": "off",
        "object-curly-newline": ["error", {
            "ObjectPattern": { "multiline": true }
        }],
        "arrow-parens": "off",
        "no-console": "off",
        "max-len": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "class-methods-use-this": "off",
        "react/forbid-prop-types": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "no-plusplus": "off"
    }
}