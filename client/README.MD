# Request Life Cycle

- If Request Comes From Browser
- If Request From Nextjs During SSR (Server Side Render)

### Request Comes From Browser

just Empty baseUrl "" We Don't Need it Here

### Request During SSR

Request During SSR E.G `getInitialProps()` Function and `window` is undefined <br/>

You Must Specifiy Through two Options

- Include Base Url as the Service name E.G "auth-src/api/users/currentuser
- Or Through ingress-nginx related to namespaces staff
