import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DownloadManager } from "@/components/download-manager"

export default async function DownloadsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: downloads } = await supabase
    .from("downloads")
    .select(
      `
      *,
      lessons:lessons(title, content_type)
    `,
    )
    .eq("user_id", user.id)
    .order("downloaded_at", { ascending: false })

  return (
    <div className="flex min-h-svh flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Mes téléchargements</h1>
          <DownloadManager downloads={downloads || []} userId={user.id} />
        </div>
      </main>
    </div>
  )
}
