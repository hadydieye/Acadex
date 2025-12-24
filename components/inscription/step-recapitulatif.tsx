"use client"

import type { FormData } from "./types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface StepRecapitulatifProps {
  formData: FormData
  onBack: () => void
  onSubmit: () => void
  isLoading: boolean
}

export function StepRecapitulatif({ formData, onBack, onSubmit, isLoading }: StepRecapitulatifProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Récapitulatif</h2>
        <p className="text-muted-foreground mt-1">Vérifiez vos informations avant de valider</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Informations Académiques</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Statut:</span>
                  <span className="font-medium capitalize">{formData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Université:</span>
                  <span className="font-medium text-right">{formData.university_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Formation:</span>
                  <span className="font-medium">{formData.formation_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faculté:</span>
                  <span className="font-medium text-right">{formData.faculty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Filière:</span>
                  <span className="font-medium text-right">{formData.field_of_study}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Informations Personnelles</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nom:</span>
                  <span className="font-medium">{formData.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Téléphone:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date de naissance:</span>
                  <span className="font-medium">{formData.date_of_birth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre:</span>
                  <span className="font-medium capitalize">{formData.gender}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent" size="lg">
          Retour
        </Button>
        <Button onClick={onSubmit} className="flex-1" size="lg" disabled={isLoading}>
          {isLoading ? "Création du compte..." : "Créer mon compte"}
        </Button>
      </div>
    </div>
  )
}
