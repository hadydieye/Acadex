"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Play, FileQuestion, Download } from "lucide-react"
import Link from "next/link"

type Lesson = {
  id: string
  title: string
  content_type: string
  duration_minutes: number
  order_index: number
  is_downloadable: boolean
}

type Module = {
  id: string
  title: string
  description: string
  order_index: number
  lessons: Lesson[]
}

export function CourseContent({
  modules,
  courseId,
  userId,
}: {
  modules: Module[]
  courseId: string
  userId: string
}) {
  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "text":
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "quiz":
        return <FileQuestion className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getContentTypeBadge = (type: string) => {
    const types: Record<string, string> = {
      video: "Vidéo",
      text: "Texte",
      pdf: "PDF",
      quiz: "Quiz",
    }
    return types[type] || type
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">Contenu du cours</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} leçons
        </p>
      </div>
      <Accordion type="multiple" className="w-full">
        {modules.map((module, index) => (
          <AccordionItem key={module.id} value={`module-${index}`}>
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="font-semibold">
                  Module {module.order_index}: {module.title}
                </span>
                <span className="text-sm text-muted-foreground">{module.lessons.length} leçons</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <p className="mb-4 text-sm text-muted-foreground">{module.description}</p>
              <div className="space-y-2">
                {module.lessons
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {getContentIcon(lesson.content_type)}
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {getContentTypeBadge(lesson.content_type)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{lesson.duration_minutes} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.is_downloadable && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Link href={`/dashboard/course/${courseId}/lesson/${lesson.id}`}>
                          <Button size="sm">Démarrer</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
