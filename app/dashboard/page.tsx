import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CourseGrid } from "@/components/course-grid"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: courses } = await supabase.from("courses").select("*").order("created_at", { ascending: false })

  return (
    <div className="flex min-h-svh flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Bibliothèque de cours</h1>
          <CourseGrid courses={courses || []} />
        </div>
      </main>
    </div>
  )
}
