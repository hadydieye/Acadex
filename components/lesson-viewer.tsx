"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Download } from "lucide-react"
import { useState } from "react"

type Lesson = {
  id: string
  title: string
  content_type: string
  content_url: string | null
  content_text: string | null
  duration_minutes: number
  is_downloadable: boolean
}

type UserProgress = {
  completed: boolean
  progress_percentage: number
} | null

export function LessonViewer({
  lesson,
  progress,
  userId,
  courseId,
}: {
  lesson: Lesson
  progress: UserProgress
  userId: string
  courseId: string
}) {
  const [isCompleted, setIsCompleted] = useState(progress?.completed || false)
  const [progressPercentage, setProgressPercentage] = useState(progress?.progress_percentage || 0)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleMarkComplete = async () => {
    setIsCompleted(true)
    setProgressPercentage(100)

    // Update progress in database
    try {
      const response = await fetch("/api/progress/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lesson_id: lesson.id,
          completed: true,
          progress_percentage: 100,
        }),
      })
      if (!response.ok) {
        console.error("[v0] Failed to update progress")
      }
    } catch (error) {
      console.error("[v0] Error updating progress:", error)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(`/api/download/${lesson.id}`, {
        method: "POST",
      })
      if (response.ok) {
        alert("Contenu téléchargé avec succès pour un accès hors ligne!")
      }
    } catch (error) {
      console.error("[v0] Download error:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
            <div className="mt-2 flex items-center gap-4">
              <Progress value={progressPercentage} className="flex-1" />
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
          </CardHeader>
          <CardContent>
            {lesson.content_type === "video" && lesson.content_url && (
              <div className="aspect-video w-full rounded-lg bg-muted">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Lecteur vidéo: {lesson.content_url}</p>
                </div>
              </div>
            )}
            {lesson.content_type === "text" && lesson.content_text && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap leading-relaxed">{lesson.content_text}</div>
              </div>
            )}
            {lesson.content_type === "pdf" && lesson.content_url && (
              <div className="rounded-lg border p-8 text-center">
                <p className="mb-4 text-muted-foreground">Document PDF disponible</p>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le PDF
                </Button>
              </div>
            )}
            {lesson.content_type === "quiz" && (
              <div className="rounded-lg border p-8 text-center">
                <p className="mb-4 text-muted-foreground">Quiz interactif</p>
                <Button>Commencer le quiz</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Progression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Durée estimée</p>
              <p className="text-lg font-semibold">{lesson.duration_minutes} minutes</p>
            </div>
            {lesson.is_downloadable && (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Téléchargement..." : "Télécharger pour hors ligne"}
              </Button>
            )}
            {!isCompleted ? (
              <Button className="w-full" onClick={handleMarkComplete}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marquer comme terminé
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-950 dark:text-green-300">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Leçon terminée</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
