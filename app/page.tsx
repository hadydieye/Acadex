import { Button } from "@/components/ui/button"
import { BookOpen, Download, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Acadex</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>S&apos;inscrire</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Votre plateforme d&apos;apprentissage universitaire
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
            Accédez à des cours universitaires de qualité, téléchargez-les pour étudier hors ligne, et progressez à
            votre rythme. Conçu pour les étudiants africains.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Commencer gratuitement
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Explorer les cours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Pourquoi choisir Acadex ?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Download className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Accès hors ligne</h3>
              <p className="text-muted-foreground">
                Téléchargez vos cours et étudiez sans connexion internet, partout où vous êtes
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Contenu de qualité</h3>
              <p className="text-muted-foreground">
                Des cours universitaires créés par des professeurs expérimentés et adaptés au contexte africain
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Progression rapide</h3>
              <p className="text-muted-foreground">
                Suivez votre progression, complétez les quiz et validez vos connaissances
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Communauté active</h3>
              <p className="text-muted-foreground">
                Rejoignez des milliers d&apos;étudiants africains et apprenez ensemble
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-lg bg-card border p-8 text-center shadow-lg md:p-12">
            <h2 className="mb-4 text-3xl font-bold">Prêt à commencer votre apprentissage ?</h2>
            <p className="mb-8 text-muted-foreground">
              Inscrivez-vous gratuitement et accédez immédiatement à des dizaines de cours
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg">Créer mon compte</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Acadex. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
