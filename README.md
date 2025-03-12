node  **^20.1.0**

# Install 
It is assumed that you have **react** and **reactDOM** versions **^17.0.0** or **^18.0.0** installed.

To install the package, run the following command:
```console
npm install https://github.com/Twolbe/er-webchat.git
```

Import the webchat using the following line:
```js
import ERWebChat from 'er-webchat';
```

By default, the web chat takes up the entire space of its container. 
If you set the **embed** property to _false_, the web chat will be invoked by a button located at the bottom right of the page.

# Usage examples for embed ERWebChat: 

Example 1:

```js
const MyPage = () => {
  return (
    <div>
      // Some custom nodes
        <div className='webchat-container'> // set size to container, and webchat will take up all the space
          <ERWebChat 
            getTokens={()=>({ access: MyAuthService.getToken() })}
            tennant='mycompany'
            url='https://mycompany.easyreportbot.com'
          />
        </div>
      // Some custom nodes
    </div>
  )
}
```

Example 2:
You can set existed function, that returns actual tokens to **getTokens** attribute. 

```js
const getMyTokens = () => {
  // Some custom logic
  const access = ...
  const refresh = ...

  return { access, refresh }
}

const MyPage = () => {
  return (
    <div>
      // Some custom nodes
        <div className='webchat-container'> // set size to container, and webchat will take up all the space
          <ERWebChat 
            getTokens={getMyTokens}
            tennant='mycompany'
            url='wss://mycompany.easyreportbot.com'
          />
        </div>
      // Some custom nodes
    </div>
  )
}
```


# Usage example for not embed ERWebChat:

You don't need any container, when **embed** is _false_

```js
const MyPage = () => {
  return (
    <div>
      // Some custom nodes
      <ERWebChat 
        getTokens={()=>({ access: MyAuthService.getToken() })}
        tennant='mycompany'
        url='https://mycompany.easyreportbot.com'
        embed={false}
      />
    </div>
  )
}
```
