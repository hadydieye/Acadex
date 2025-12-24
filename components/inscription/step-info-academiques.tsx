"use client"

import type { FormData } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import universitesData from "@/data/universites-guinee.json"
import { useMemo } from "react"

interface StepInfoAcademiquesProps {
  formData: FormData
  onUpdate: (data: Partial<FormData>) => void
  onNext: () => void
}

export function StepInfoAcademiques({ formData, onUpdate, onNext }: StepInfoAcademiquesProps) {
  const allUniversites = [...universitesData.universites_publiques, ...universitesData.universites_privees]

  const selectedUniversity = useMemo(
    () => allUniversites.find((u) => u.id === formData.university_id),
    [formData.university_id],
  )

  const selectedFaculte = useMemo(
    () => selectedUniversity?.facultes.find((f) => f.nom === formData.faculty),
    [selectedUniversity, formData.faculty],
  )

  const handleNext = () => {
    if (
      !formData.status ||
      !formData.university_id ||
      !formData.formation_type ||
      !formData.faculty ||
      !formData.field_of_study
    ) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Informations Académiques</h2>
        <p className="text-muted-foreground mt-1">Parlez-nous de votre parcours universitaire</p>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="space-y-3">
          <Label>Statut actuel *</Label>
          <RadioGroup value={formData.status} onValueChange={(value) => onUpdate({ status: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lycéen" id="lyceen" />
              <Label htmlFor="lyceen" className="font-normal cursor-pointer">
                {"Apprenant"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="étudiant" id="etudiant" />
              <Label htmlFor="etudiant" className="font-normal cursor-pointer">
                Étudiant
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professionnel" id="professionnel" />
              <Label htmlFor="professionnel" className="font-normal cursor-pointer">
                Professionnel
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* University */}
        <div className="space-y-2">
          <Label htmlFor="university">Université *</Label>
          <Select
            value={formData.university_id}
            onValueChange={(value) => {
              const university = allUniversites.find((u) => u.id === value)
              onUpdate({
                university_id: value,
                university_name: university?.nom || "",
                formation_type: "",
                faculty: "",
                field_of_study: "",
              })
            }}
          >
            <SelectTrigger id="university">
              <SelectValue placeholder="Sélectionnez votre université" />
            </SelectTrigger>
            <SelectContent>
              {allUniversites.map((uni) => (
                <SelectItem key={uni.id} value={uni.id}>
                  {uni.nom} ({uni.sigle})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Formation Type */}
        {selectedUniversity && (
          <div className="space-y-2">
            <Label htmlFor="formation">Type de formation *</Label>
            <Select
              value={formData.formation_type}
              onValueChange={(value) => onUpdate({ formation_type: value, faculty: "", field_of_study: "" })}
            >
              <SelectTrigger id="formation">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BT">BT (Brevet de Technicien)</SelectItem>
                <SelectItem value="BTS">BTS (Brevet de Technicien Supérieur)</SelectItem>
                <SelectItem value="Licence">Licence</SelectItem>
                <SelectItem value="Master">Master</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Faculty */}
        {formData.formation_type && selectedUniversity && (
          <div className="space-y-2">
            <Label htmlFor="faculty">Faculté / Institut *</Label>
            <Select
              value={formData.faculty}
              onValueChange={(value) => onUpdate({ faculty: value, field_of_study: "" })}
            >
              <SelectTrigger id="faculty">
                <SelectValue placeholder="Sélectionnez votre faculté" />
              </SelectTrigger>
              <SelectContent>
                {selectedUniversity.facultes.map((fac) => (
                  <SelectItem key={fac.nom} value={fac.nom}>
                    {fac.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Field of Study */}
        {formData.faculty && selectedFaculte && (
          <div className="space-y-2">
            <Label htmlFor="filiere">Filière *</Label>
            {formData.university_id === "AUTRE" ? (
              <Input
                id="filiere"
                placeholder="Entrez votre filière"
                value={formData.field_of_study}
                onChange={(e) => onUpdate({ field_of_study: e.target.value })}
              />
            ) : (
              <Select value={formData.field_of_study} onValueChange={(value) => onUpdate({ field_of_study: value })}>
                <SelectTrigger id="filiere">
                  <SelectValue placeholder="Sélectionnez votre filière" />
                </SelectTrigger>
                <SelectContent>
                  {selectedFaculte.filieres.map((filiere) => (
                    <SelectItem key={filiere} value={filiere}>
                      {filiere}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      <Button onClick={handleNext} className="w-full" size="lg">
        Continuer
      </Button>
    </div>
  )
}
