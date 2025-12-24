import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const { lesson_id, completed, progress_percentage } = await request.json()

  // Upsert progress (insert or update)
  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      lesson_id,
      completed,
      progress_percentage,
      last_accessed: new Date().toISOString(),
    },
    {
      onConflict: "user_id,lesson_id",
    },
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
