import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../services/supabase.js'

export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Preencha todos os campos' })

    if (password.length < 6)
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' })

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existing)
      return res.status(409).json({ error: 'E-mail já cadastrado' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const { data: user, error } = await supabase
      .from('users')
      .insert({ name, email, password: hashedPassword, role: 'customer' })
      .select('id, name, email, role')
      .single()

    if (error) throw error

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Preencha todos os campos' })

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (!user)
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword)
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    res.json({ user: userWithoutPassword, token })
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export async function getMe(req, res) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', req.user.id)
      .single()

    if (error || !user)
      return res.status(404).json({ error: 'Usuário não encontrado' })

    res.json({ user })
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}