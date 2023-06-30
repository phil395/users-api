
### Endpoints

#### POST /api/auth/register
```ts
interface RequestBody {
  password: string
  email: string
  name: string
}
```
```bash
curl \
  -X POST \
  -v \
  localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","password":"12345","email":"test@mail.com"}'
```

#### POST /api/auth/login
```ts
interface RequestBody {
  password: string
  email: string
}
```
```bash
curl \
  -X POST \
  -v \
  localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"password":"12345","email":"bob@gmail.com"}'
```

#### GET /api/users
```ts
interface ResponseBody {
  id: number
  email: string
  name: string
  createdAt: string
  loginAt: string
  status: "Active" | "Blocked"
}
```
```bash
curl \
  -v \
  -H 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc5MjE1NDcwfQ.7VU4bxbrvaWEFP6Dd_FJVdphaZ-9Zw0AXf96zKdhsDo; Path=/api; HttpOnly' \
  localhost:3000/api/users
```

#### POST /api/users/action
```ts
interface RequestBody {
  actionType: "delete" | "block" | "unblock"
  ids: number[]
}
```
```bash
curl \
  -v \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"actionType":"block","ids":[1]}' \
  -H 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc5MjE1NDcwfQ.7VU4bxbrvaWEFP6Dd_FJVdphaZ-9Zw0AXf96zKdhsDo; Path=/api; HttpOnly' \
  localhost:3000/api/users/action
```



