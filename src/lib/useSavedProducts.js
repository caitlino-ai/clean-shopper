import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export function useSavedProducts(userId) {
  const [savedIds, setSavedIds] = useState([])

  useEffect(() => {
    if (!userId) return

    supabase
      .from('saved_products')
      .select('product_id')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (data) setSavedIds(data.map((r) => r.product_id))
      })
  }, [userId])

  const toggleSave = async (productId) => {
    if (savedIds.includes(productId)) {
      await supabase
        .from('saved_products')
        .delete()
        .match({ user_id: userId, product_id: productId })
      setSavedIds((prev) => prev.filter((id) => id !== productId))
    } else {
      await supabase
        .from('saved_products')
        .insert({ user_id: userId, product_id: productId })
      setSavedIds((prev) => [...prev, productId])
    }
  }

  return { savedIds, toggleSave }
}
