# Acadex MVP

Plateforme d'apprentissage universitaire conçue pour les étudiants africains avec accès hors ligne.

## Fonctionnalités principales

- **Authentification** : Inscription et connexion avec Supabase Auth
- **Bibliothèque de cours** : Navigation dans les cours disponibles par catégorie et niveau
- **Contenu structuré** : Modules et leçons organisés avec progression
- **Téléchargement hors ligne** : Téléchargez les leçons pour étudier sans connexion
- **Suivi de progression** : Marquez les leçons comme terminées et suivez votre avancement
- **Interface responsive** : Optimisé pour mobile et desktop

## Architecture technique

### Base de données (Supabase)

- **profiles** : Profils utilisateurs étendant auth.users
- **courses** : Catalogue de cours universitaires
- **modules** : Chapitres au sein des cours
- **lessons** : Leçons individuelles (vidéo, texte, PDF, quiz)
- **user_progress** : Suivi de progression par leçon
- **downloads** : Gestion du contenu téléchargé hors ligne
- **enrollments** : Inscriptions aux cours

### Sécurité

Toutes les tables utilisent Row Level Security (RLS) pour protéger les données :
- Les utilisateurs peuvent uniquement voir/modifier leurs propres données
- Les cours et contenus sont accessibles en lecture publique
- Les inscriptions et téléchargements sont privés par utilisateur

### Stack technique

- **Framework** : Next.js 16 avec App Router
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Styling** : Tailwind CSS v4
- **UI Components** : shadcn/ui
- **TypeScript** : Pour la sécurité des types

## Démarrage

1. Les scripts SQL dans `/scripts` créent la structure de base de données
2. Exécutez-les dans l'ordre : 001, 002, 003
3. L'authentification est configurée avec Supabase
4. Le middleware protège les routes `/dashboard`

## Prochaines étapes

- Implémenter les quiz interactifs
- Ajouter le lecteur vidéo natif
- Intégrer Service Workers pour un vrai mode hors ligne
- Système de notifications pour les nouveaux cours
- Forums de discussion par cours
- Certifications et badges
