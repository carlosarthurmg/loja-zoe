import { supabase } from '../services/supabase.js'

export async function createOrder(req, res) {
  try {
    const { items, total } = req.body

    if (!items || items.length === 0)
      return res.status(400).json({ error: 'Nenhum item no pedido' })

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ user_id: req.user.id, total, status: 'aguardando_pagamento', payment_status: 'pendente' })
      .select()
      .single()

    if (orderError) throw orderError

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) throw itemsError

    res.status(201).json({ order })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar pedido' })
  }
}

export async function getMyOrders(req, res) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name, image))')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ orders: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
}

export async function getAllOrders(req, res) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, users(name, email), order_items(*, products(name))')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ orders: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { status, payment_status } = req.body

    const { data, error } = await supabase
      .from('orders')
      .update({ status, payment_status })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error || !data) return res.status(404).json({ error: 'Pedido não encontrado' })

    res.json({ order: data })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' })
  }
}