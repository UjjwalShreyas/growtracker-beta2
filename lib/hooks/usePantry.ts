"use client";

// usePantry — custom hook that manages pantry items via Supabase.
// Reads/writes are scoped to the logged-in user via RLS policies
// on the pantry_items table (see database schema).

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { PantryItem } from "@/lib/data/mockData";
import { useAuth } from "@/lib/hooks/useAuth";

export function usePantry() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchItems = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoaded(true);
      return;
    }

    const { data, error } = await supabase
      .from("pantry_items")
      .select("*")
      .eq("user_id", user.id)
      .order("added_at", { ascending: false });

    if (error) {
      console.error("Error fetching pantry items:", error.message);
      setItems([]);
    } else {
      setItems(data as PantryItem[]);
    }
    setLoaded(true);
  }, [user]);

  useEffect(() => {
    // Wait until auth has resolved (so we know whether there's a user or not)
    if (!authLoading) {
      fetchItems();
    }
  }, [authLoading, fetchItems]);

  const addItems = async (newItems: PantryItem[]) => {
    if (!user) return;

    // Strip any client-generated IDs — let Supabase generate real UUIDs,
    // and attach the current user's ID to each row.
    const rowsToInsert = newItems.map(({ id, ...rest }) => ({
      ...rest,
      user_id: user.id,
    }));

    const { data, error } = await supabase
      .from("pantry_items")
      .insert(rowsToInsert)
      .select();

    if (error) {
      console.error("Error adding pantry items:", error.message);
      return;
    }

    setItems((prev) => [...(data as PantryItem[]), ...prev]);
  };

  const removeItem = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("pantry_items")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error removing pantry item:", error.message);
      return;
    }

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const consumeItems = async (consumedList: { item_name: string; quantity: number }[]) => {
    if (!user) return;

    // Work out the new state locally first (same logic as before)
    let updated = [...items];
    const toDelete: string[] = [];
    const toUpdate: { id: string; quantity: string }[] = [];

    consumedList.forEach((consumed) => {
      const idx = updated.findIndex(
        (item) => item.item_name.toLowerCase() === consumed.item_name.toLowerCase()
      );
      if (idx !== -1) {
        const item = updated[idx];
        const match = item.quantity.match(/^(\d+(?:\.\d+)?)\s*(.*)/);
        if (match) {
          const num = parseFloat(match[1]);
          const unit = match[2] ? match[2].trim() : "";
          const remaining = num - consumed.quantity;
          if (remaining <= 0) {
            toDelete.push(item.id);
            updated.splice(idx, 1);
          } else {
            const formattedNum = remaining % 1 === 0 ? remaining.toString() : remaining.toFixed(1);
            const newQuantity = formattedNum + (unit ? ` ${unit}` : "");
            toUpdate.push({ id: item.id, quantity: newQuantity });
            updated[idx] = { ...item, quantity: newQuantity };
          }
        } else {
          toDelete.push(item.id);
          updated.splice(idx, 1);
        }
      }
    });

    // Push the changes to Supabase
    if (toDelete.length > 0) {
      const { error } = await supabase
        .from("pantry_items")
        .delete()
        .in("id", toDelete)
        .eq("user_id", user.id);
      if (error) console.error("Error deleting consumed items:", error.message);
    }

    for (const u of toUpdate) {
      const { error } = await supabase
        .from("pantry_items")
        .update({ quantity: u.quantity })
        .eq("id", u.id)
        .eq("user_id", user.id);
      if (error) console.error("Error updating consumed item:", error.message);
    }

    setItems(updated);
  };

  return { items, loaded, addItems, removeItem, consumeItems, refetch: fetchItems };
}