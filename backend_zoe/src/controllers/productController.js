import { supabase } from '../services/supabase.js'

export async function getProducts(req, res) {
  try {
    const { category, search, include_drafts } = req.query

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (category) query = query.eq('category', category)
    if (search) query = query.ilike('name', `%${search}%`)
    if (include_drafts !== 'true') query = query.eq('is_draft', false)

    const { data, error } = await query
    if (error) throw error

    res.json({ products: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
}

export async function getProductById(req, res) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error || !data) return res.status(404).json({ error: 'Produto não encontrado' })

    res.json({ product: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produto' })
  }
}


export async function createProduct(req, res) {
  try {
    const { name, description, price, promo_price, is_promo, category, material, size, image, stock, is_draft } = req.body

    if (!name || !price) return res.status(400).json({ error: 'Nome e preço são obrigatórios' })

    const { data, error } = await supabase
      .from('products')
      .insert({ 
        name, 
        description: description || null,
        price: parseFloat(price), 
        promo_price: promo_price ? parseFloat(promo_price) : null, 
        is_promo: is_promo || false, 
        is_draft: is_draft || false,
        category: category || null, 
        material: material || null, 
        size: size || null, 
        image: image || null, 
        stock: parseInt(stock) || 0 
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ product: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar produto' })
  }
}

export async function updateProduct(req, res) {
  try {
    const { name, description, price, promo_price, is_promo, category, material, size, image, stock, is_draft } = req.body

    const { data, error } = await supabase
      .from('products')
      .update({ 
        name, 
        description: description || null,
        price: parseFloat(price), 
        promo_price: promo_price ? parseFloat(promo_price) : null, 
        is_promo, 
        is_draft,
        category: category || null, 
        material: material || null, 
        size: size || null, 
        image: image || null, 
        stock: parseInt(stock) || 0 
      })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error || !data) return res.status(404).json({ error: 'Produto não encontrado' })

    res.json({ product: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
}

export async function deleteProduct(req, res) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error

    res.json({ message: 'Produto removido com sucesso' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover produto' })
  }
}

export async function uploadProductImage(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem enviada' })

    const fileExt = req.file.originalname.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      })

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)

    res.json({ url: urlData.publicUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' })
  }
}