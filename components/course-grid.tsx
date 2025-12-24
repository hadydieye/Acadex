"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Course = {
  id: string
  title: string
  description: string
  thumbnail_url: string
  category: string
  level: string
  duration_hours: number
  instructor_name: string
  is_premium: boolean
}

export function CourseGrid({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">Aucun cours disponible pour le moment</p>
          <p className="mt-2 text-sm text-muted-foreground">Revenez bientôt pour découvrir de nouveaux cours</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
              <Image
                src={course.thumbnail_url || "/placeholder.svg?height=200&width=300&query=education"}
                alt={course.title}
                fill
                className="object-cover"
              />
              {course.is_premium && (
                <div className="absolute right-2 top-2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Crown className="mr-1 h-3 w-3" />
                    Premium
                  </Badge>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <CardTitle className="mb-2">{course.title}</CardTitle>
            <CardDescription className="mb-4">{course.description}</CardDescription>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration_hours}h
              </div>
              <div>{course.instructor_name}</div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Link href={`/dashboard/course/${course.id}`} className="w-full">
              <Button className="w-full">Voir le cours</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
