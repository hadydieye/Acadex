import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { CourseContent } from "@/components/course-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Crown, User } from "lucide-react"
import Image from "next/image"

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch course details
  const { data: course } = await supabase.from("courses").select("*").eq("id", courseId).single()

  if (!course) {
    redirect("/dashboard")
  }

  // Fetch modules with lessons
  const { data: modules } = await supabase
    .from("modules")
    .select(
      `
      *,
      lessons:lessons(*)
    `,
    )
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })

  // Check if user is enrolled
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .maybeSingle()

  const handleEnroll = async () => {
    "use server"
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: courseId,
    })

    redirect(`/dashboard/course/${courseId}`)
  }

  return (
    <div className="flex min-h-svh flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="mb-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={course.thumbnail_url || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {course.is_premium && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Crown className="mr-1 h-3 w-3" />
                    Premium
                  </Badge>
                )}
              </div>
              <h1 className="mb-4 text-3xl font-bold">{course.title}</h1>
              <p className="mb-6 text-muted-foreground">{course.description}</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {course.instructor_name}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {course.duration_hours} heures
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-xl font-semibold">Commencer ce cours</h3>
                {enrollment ? (
                  <div>
                    <p className="mb-4 text-sm text-muted-foreground">Vous êtes inscrit à ce cours</p>
                    <Button className="w-full">Continuer l&apos;apprentissage</Button>
                  </div>
                ) : (
                  <form action={handleEnroll}>
                    <Button type="submit" className="w-full">
                      S&apos;inscrire gratuitement
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Course Content */}
          <CourseContent modules={modules || []} courseId={courseId} userId={user.id} />
        </div>
      </main>
    </div>
  )
}
