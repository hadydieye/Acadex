"use client"
import type { FormData } from "@/components/inscription/types"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StepInfoAcademiques } from "@/components/inscription/step-info-academiques"
import { StepInfoPersonnelles } from "@/components/inscription/step-info-personnelles"
import { StepRecapitulatif } from "@/components/inscription/step-recapitulatif"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const STEPS = ["Académique", "Personnel", "Récapitulatif"]

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    status: "",
    university_id: "",
    university_name: "",
    formation_type: "",
    faculty: "",
    field_of_study: "",
    full_name: "",
    email: "",
    password: "",
    phone: "",
    date_of_birth: "",
    gender: "",
  })

  // Load saved draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem("acadex-signup-draft")
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        setFormData(parsed)
      } catch (e) {
        console.error("Failed to load draft:", e)
      }
    }
  }, [])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("acadex-signup-draft", JSON.stringify(formData))
    }, 30000)

    return () => clearInterval(interval)
  }, [formData])

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.full_name,
            university: formData.university_name,
            field_of_study: formData.field_of_study,
            status: formData.status,
            university_id: formData.university_id,
            formation_type: formData.formation_type,
            faculty: formData.faculty,
            phone: formData.phone,
            date_of_birth: formData.date_of_birth,
            gender: formData.gender,
          },
        },
      })
      if (error) throw error

      // Clear draft on success
      localStorage.removeItem("acadex-signup-draft")
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Une erreur s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Inscription à Acadex</CardTitle>
              <CardDescription>
                Étape {currentStep + 1} sur {STEPS.length} : {STEPS[currentStep]}
              </CardDescription>
              <div className="pt-2">
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && (
                <StepInfoAcademiques formData={formData} onUpdate={updateFormData} onNext={() => setCurrentStep(1)} />
              )}

              {currentStep === 1 && (
                <StepInfoPersonnelles
                  formData={formData}
                  onUpdate={updateFormData}
                  onNext={() => setCurrentStep(2)}
                  onBack={() => setCurrentStep(0)}
                />
              )}

              {currentStep === 2 && (
                <StepRecapitulatif
                  formData={formData}
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              )}

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Déjà un compte ?{" "}
                <Link href="/auth/login" className="underline underline-offset-4 text-primary hover:text-primary/80">
                  Se connecter
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
