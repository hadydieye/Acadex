# Configuration d'Acadex

## Étapes d'installation rapide

### 1. Exécuter les scripts SQL

Vous devez exécuter les scripts dans l'ordre suivant depuis la section "Scripts" de v0 :

1. `001_create_tables.sql` - Crée toutes les tables de base de données
2. `002_seed_data.sql` - Ajoute des données de démonstration
3. `003_profile_trigger.sql` - Configure la création automatique de profils
4. `004_update_profiles_schema.sql` - Ajoute les champs académiques supplémentaires

### 2. Tester l'application

Après avoir exécuté les scripts :

1. Allez sur la page d'accueil pour voir l'interface marketing
2. Cliquez sur "S'inscrire" pour créer un compte avec le formulaire multi-étapes
3. Une fois connecté, explorez le dashboard avec les cours de démonstration
4. Testez le téléchargement de cours pour l'accès hors ligne

### 3. Variables d'environnement

Les variables Supabase sont déjà configurées dans votre projet v0. Vous n'avez rien à faire.

## Fonctionnalités principales

- ✅ Authentification complète avec Supabase
- ✅ Inscription en 3 étapes avec informations académiques
- ✅ Bibliothèque de cours avec filtres
- ✅ Lecteur de leçons avec suivi de progression  
- ✅ Téléchargement hors ligne
- ✅ Données de démonstration en français pour le contexte africain

## Structure du projet

```
app/
├── page.tsx                      # Page d'accueil marketing
├── dashboard/
│   ├── page.tsx                  # Bibliothèque de cours
│   ├── course/[courseId]/        # Détails du cours
│   └── downloads/                # Gestion des téléchargements
├── auth/
│   ├── login/                    # Connexion
│   └── sign-up/                  # Inscription multi-étapes
components/
├── inscription/                   # Composants du formulaire d'inscription
├── course-grid.tsx               # Affichage des cours
└── dashboard-header.tsx          # En-tête du dashboard
scripts/
├── 001_create_tables.sql         # Schéma de base de données
├── 002_seed_data.sql             # Données de test
├── 003_profile_trigger.sql       # Trigger pour profils
└── 004_update_profiles_schema.sql # Champs académiques
