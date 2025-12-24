"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Trash2 } from "lucide-react"
import { useState } from "react"

type DownloadItem = {
  id: string
  lesson_id: string
  downloaded_at: string
  file_size_mb: number
  lesson?: {
    title: string
    content_type: string
  }
}

export function DownloadManager({ downloads, userId }: { downloads: DownloadItem[]; userId: string }) {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const handleDownload = async (lessonId: string) => {
    setDownloading(lessonId)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDownloading(null)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // In a real app, this would use Service Workers and IndexedDB
    // to download and cache content for offline access
  }

  const handleDelete = async (downloadId: string) => {
    // In a real app, this would make an API call to delete the download
    console.log("Deleting download:", downloadId)
  }

  const totalSize = downloads.reduce((acc, d) => acc + d.file_size_mb, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Téléchargements hors ligne</CardTitle>
        <CardDescription>
          {downloads.length} leçon{downloads.length > 1 ? "s" : ""} téléchargée{downloads.length > 1 ? "s" : ""} •{" "}
          {totalSize.toFixed(2)} MB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {downloads.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Aucun téléchargement pour le moment</p>
        ) : (
          downloads.map((download) => (
            <div key={download.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{download.lesson?.title || "Leçon"}</p>
                  <p className="text-sm text-muted-foreground">{download.file_size_mb.toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(download.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
        {downloading && (
          <div className="rounded-lg border p-4">
            <p className="mb-2 text-sm font-medium">Téléchargement en cours...</p>
            <Progress value={downloadProgress} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
