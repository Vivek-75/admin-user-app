type AppConfig = {
  baseUrl: string
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

interface User {
  name: string,
  password?: string,
}

interface UserId {
  _id: string,
  name: string,
  email: string,
  isAdmin: boolean,
}

interface IPost {
  userId: string,
  title: string,
  body: string,
}