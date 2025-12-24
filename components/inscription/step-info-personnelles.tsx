"use client"

import type React from "react"

import type { FormData } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StepInfoPersonnellesProps {
  formData: FormData
  onUpdate: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepInfoPersonnelles({ formData, onUpdate, onNext, onBack }: StepInfoPersonnellesProps) {
  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format for Guinea (+224)
    if (digits.startsWith("224")) {
      return `+${digits}`
    }
    return digits ? `+224${digits}` : ""
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    onUpdate({ phone: formatted })
  }

  const parseDateOfBirth = () => {
    if (!formData.date_of_birth) return { day: "", month: "", year: "" }
    const [year, month, day] = formData.date_of_birth.split("-")
    return { day, month, year }
  }

  const { day, month, year } = parseDateOfBirth()

  const handleDateChange = (type: "day" | "month" | "year", value: string) => {
    const current = parseDateOfBirth()
    const updated = { ...current, [type]: value }

    // Only update if all three values are set
    if (updated.day && updated.month && updated.year) {
      const dateString = `${updated.year}-${updated.month.padStart(2, "0")}-${updated.day.padStart(2, "0")}`
      onUpdate({ date_of_birth: dateString })
    } else {
      // Store partial date
      onUpdate({ date_of_birth: `${updated.year || "0000"}-${updated.month || "01"}-${updated.day || "01"}` })
    }
  }

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => (currentYear - i).toString())

  const months = [
    { value: "1", label: "Janvier" },
    { value: "2", label: "Février" },
    { value: "3", label: "Mars" },
    { value: "4", label: "Avril" },
    { value: "5", label: "Mai" },
    { value: "6", label: "Juin" },
    { value: "7", label: "Juillet" },
    { value: "8", label: "Août" },
    { value: "9", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ]

  const handleNext = () => {
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.date_of_birth ||
      !formData.gender
    ) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Informations Personnelles</h2>
        <p className="text-muted-foreground mt-1">Complétez votre profil</p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet *</Label>
          <Input
            id="fullName"
            placeholder="Jean Dupont"
            value={formData.full_name}
            onChange={(e) => onUpdate({ full_name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimum 6 caractères"
            value={formData.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+224 XXX XXX XXX"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <p className="text-xs text-muted-foreground">Format: +224 suivi de votre numéro</p>
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label>Date de naissance *</Label>
          <div className="grid grid-cols-3 gap-2">
            <Select value={day} onValueChange={(value) => handleDateChange("day", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Jour" />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={month} onValueChange={(value) => handleDateChange("month", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Mois" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year} onValueChange={(value) => handleDateChange("year", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <Label>Genre *</Label>
          <RadioGroup value={formData.gender} onValueChange={(value) => onUpdate({ gender: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="homme" id="homme" />
              <Label htmlFor="homme" className="font-normal cursor-pointer">
                Homme
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="femme" id="femme" />
              <Label htmlFor="femme" className="font-normal cursor-pointer">
                Femme
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="autre" id="autre" />
              <Label htmlFor="autre" className="font-normal cursor-pointer">
                Autre
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent" size="lg">
          Retour
        </Button>
        <Button onClick={handleNext} className="flex-1" size="lg">
          Continuer
        </Button>
      </div>
    </div>
  )
}
