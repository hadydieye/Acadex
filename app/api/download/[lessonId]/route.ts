import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  // Check if already downloaded
  const { data: existing } = await supabase
    .from("downloads")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ message: "Déjà téléchargé" })
  }

  // In a real app, calculate actual file size
  const fileSizeMb = Math.random() * 50 + 10 // Random size between 10-60 MB

  const { error } = await supabase.from("downloads").insert({
    user_id: user.id,
    lesson_id: lessonId,
    file_size_mb: fileSizeMb,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: "Téléchargement enregistré", fileSizeMb })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const { error } = await supabase.from("downloads").delete().eq("user_id", user.id).eq("lesson_id", lessonId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: "Téléchargement supprimé" })
}
