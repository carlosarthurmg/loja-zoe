import { supabase } from '../services/supabase.js'

export async function getFavorites(req, res) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, products(*)')
      .eq('user_id', req.user.id)

    if (error) throw error

    res.json({ favorites: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' })
  }
}

export async function addFavorite(req, res) {
  try {
    const { product_id } = req.body

    if (!product_id) return res.status(400).json({ error: 'product_id é obrigatório' })

    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: req.user.id, product_id })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ favorite: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar favorito' })
  }
}

export async function removeFavorite(req, res) {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', req.user.id)
      .eq('product_id', req.params.productId)

    if (error) throw error

    res.json({ message: 'Removido dos favoritos' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover favorito' })
  }
}