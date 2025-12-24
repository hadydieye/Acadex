import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { LessonViewer } from "@/components/lesson-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { courseId, lessonId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: lesson } = await supabase
    .from("lessons")
    .select(
      `
      *,
      modules:modules(
        *,
        courses:courses(*)
      )
    `,
    )
    .eq("id", lessonId)
    .maybeSingle()

  if (!lesson) {
    redirect("/dashboard")
  }

  // Fetch user progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle()

  return (
    <div className="flex min-h-svh flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href={`/dashboard/course/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au cours
              </Button>
            </Link>
          </div>
          <LessonViewer lesson={lesson} progress={progress} userId={user.id} courseId={courseId} />
        </div>
      </main>
    </div>
  )
}
