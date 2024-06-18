<!-- 
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
 -->

# emozi-website

A modern emojipasta generator.

btw we also have a [cli](https://github.com/shravanasati/emozi).


### Development Environment Setup

We'll be using pnpm for javascript dependency management.

Once you've cloned the repository,

1. `pnpm i` to install all the packages.

2. `pnpm run dev` to run vite server.

3. `go build` to run the go server. note that `pnpm run build` must be executed before starting the go server.

#### Using Docker

```
docker build -t yourname/emozi-website[:optionalVersionTag] .
```

and 
```
docker run yourname/emozi-website -p 8080:8080
```

### API Usage

Base URL: `https://seal-app-ubi38.ondigitalocean.app`

The only API endpoint is `POST /api/generate`.

The JSON payload that needs to be sent is

```json
{
  "text": "this copypasta would be converted into emojipasta",
  "options": {
    "emojiDensity": 2
  }
}
```

Note that the `options` field must be passed with the `emojiDensity` parameter because otherwise the default would be 0.

`emojiDensity` must be between 0 and 5, inclusive both.

The response would be one of the following:
```json
{
  "emojipasta": "this copypasta🍝 would👪💀 be😱 converted into😩 emojipasta😍"
}
```

If the request is not successfull,

```json
{
  "error": "the json entity doesn't match, visit docs"
}
```