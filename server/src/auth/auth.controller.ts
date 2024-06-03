import { ControllerMethod } from "../types/controller"
import { authService } from "./auth.service"
import userLoginSchema from "../schemas/userLoginSchema"

export const login = async (req, res) => {
  const { email, password } = req.body

  const result = await authService.login(email, password)
  if (!result) {
    return res.status(401)
      .clearCookie('session-token')
      .json({ message: 'Invalid username or password' })
  }
  if (!result.token) return res.status(401)
    .clearCookie('session-token')
    .json({ message: 'Invalid username or password' })

  res.cookie('session-token', result.token, { httpOnly: true })
  return res.status(200).json(result.user)
}

// middleware to check if username and password are provided

export const checkLoginInput = (req, res, next) => {
  const { email, password } = req.body
  const result = userLoginSchema.safeParse({ email, password })
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }
  next()
}