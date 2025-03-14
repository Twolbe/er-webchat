# Install

It is assumed that you have **react** and **reactDOM** versions **^17.0.0** or **^18.0.0** installed.

To install the package, run the following command:

```console
npm install https://github.com/Twolbe/er-webchat.git
```

Import the webchat using the following line:

```js
import ERWebChat from "er-webchat";
```

By default, the web chat takes up the entire space of its container.
If you set the **embed** property to _false_, the web chat will be invoked by a button located at the bottom right of the page.

# Props reference

| Prop Name         | Type                                         | Default                    | Required | Description                                                                                                |
| ----------------- | -------------------------------------------- | -------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| **getTokens**     | `() => { access: string; refresh?: string }` | -                          | ✅       | function; returns current access and refresh tokens; refresh token is optional                             |
| **tennant**       | `string`                                     | -                          | ✅       | client realm in keycloak                                                                                   |
| **legacyTennant** | `boolean`                                    | `false`                    | ❌       | if `true`, uses legacy tennant structure in ER<25.3.5                                                      |
| **url**           | `string`                                     | -                          | ✅       | URL to reach ER core: [protocol]://easyreport.mycompany.com; protocol values: `wss`, `https`, `ws`, `http` |
| **path**          | `string`                                     | `/webhooks/portal/webhook` | ❌       | path to socket connection                                                                                  |
| **embed**         | `boolean`                                    | `true`                     | ❌       | webchat on page or over page                                                                               |
| **lang**          | `string`                                     | `ru`                       | ❌       | language                                                                                                   |
| **title**         | `string`                                     | `Easy Report Веб-чат`      | ❌       | webchat title                                                                                              |
| **extraAction**   | `ReactNode`, `ReactNode[]`                   | -                          | ❌       | extra action for header                                                                                    |

# Usage examples

## Embed ERWebChat:

### Example 1:

```js
const MyPage = () => {
  return (
    <div>
      // Some custom nodes
      <div className="webchat-container">
        // ↑ set size to container, and webchat will take up all the space
        <ERWebChat
          getTokens={() => ({ access: MyAuthService.getToken() })}
          tennant="mycompany"
          url="https://mycompany.easyreportbot.com"
        />
      </div>
      // Some custom nodes
    </div>
  );
};
```

### Example 2:

You can set existed function, that returns actual tokens to **getTokens** attribute.

```js
const getMyTokens = () => {
  // Some custom logic

  return { access, refresh };
};

const MyPage = () => {
  return (
    <div>
      // Some custom nodes
      <div className="webchat-container">
        // ↑ set size to container, and webchat will take up all the space
        <ERWebChat
          getTokens={getMyTokens}
          tennant="mycompany"
          url="wss://mycompany.easyreportbot.com"
        />
      </div>
      // Some custom nodes
    </div>
  );
};
```

## Non-embedded ERWebChat:

You don't need any container, when **embed** is _false_

```js
const MyPage = () => {
  return (
    <div>
      // Some custom nodes
      <ERWebChat
        getTokens={() => ({ access: MyAuthService.getToken() })}
        tennant="mycompany"
        url="https://mycompany.easyreportbot.com"
        embed={false}
      />
    </div>
  );
};
```

# Contributing

Node version required: **^20.1.0**
