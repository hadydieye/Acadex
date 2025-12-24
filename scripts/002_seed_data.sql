-- Insert sample courses
INSERT INTO public.courses (title, description, category, level, duration_hours, instructor_name, is_premium, thumbnail_url) VALUES
('Introduction à l''Informatique', 'Apprenez les bases de l''informatique et de la programmation', 'Informatique', 'beginner', 20, 'Dr. Amara Diop', FALSE, '/placeholder.svg?height=200&width=300'),
('Mathématiques Avancées', 'Algèbre linéaire et calcul différentiel', 'Mathématiques', 'advanced', 40, 'Prof. Kouassi N''Guessan', FALSE, '/placeholder.svg?height=200&width=300'),
('Gestion de Projet', 'Méthodologies agiles et gestion d''équipe', 'Management', 'intermediate', 15, 'Dr. Fatou Sow', TRUE, '/placeholder.svg?height=200&width=300'),
('Biologie Cellulaire', 'Structure et fonction des cellules', 'Sciences', 'beginner', 30, 'Prof. Kofi Mensah', FALSE, '/placeholder.svg?height=200&width=300'),
('Marketing Digital', 'Stratégies de marketing en ligne', 'Marketing', 'intermediate', 25, 'Dr. Aminata Ba', TRUE, '/placeholder.svg?height=200&width=300');

-- Get course IDs for modules
DO $$
DECLARE
  course_info_id UUID;
  course_math_id UUID;
  course_gestion_id UUID;
  course_bio_id UUID;
  module1_id UUID;
  module2_id UUID;
BEGIN
  -- Get course IDs
  SELECT id INTO course_info_id FROM public.courses WHERE title = 'Introduction à l''Informatique';
  SELECT id INTO course_math_id FROM public.courses WHERE title = 'Mathématiques Avancées';
  SELECT id INTO course_gestion_id FROM public.courses WHERE title = 'Gestion de Projet';
  SELECT id INTO course_bio_id FROM public.courses WHERE title = 'Biologie Cellulaire';

  -- Insert modules for "Introduction à l'Informatique"
  INSERT INTO public.modules (course_id, title, description, order_index) VALUES
  (course_info_id, 'Les Fondamentaux', 'Introduction aux concepts de base', 1)
  RETURNING id INTO module1_id;
  
  INSERT INTO public.modules (course_id, title, description, order_index) VALUES
  (course_info_id, 'Programmation de Base', 'Premiers pas en programmation', 2)
  RETURNING id INTO module2_id;

  -- Insert lessons for module 1
  INSERT INTO public.lessons (module_id, title, content_type, content_text, duration_minutes, order_index) VALUES
  (module1_id, 'Qu''est-ce que l''informatique?', 'text', 'L''informatique est la science du traitement automatique de l''information...', 15, 1),
  (module1_id, 'Histoire des ordinateurs', 'video', 'https://example.com/video1', 20, 2),
  (module1_id, 'Architecture des ordinateurs', 'text', 'Un ordinateur est composé de plusieurs composants...', 25, 3);

  -- Insert lessons for module 2
  INSERT INTO public.lessons (module_id, title, content_type, content_text, duration_minutes, order_index) VALUES
  (module2_id, 'Variables et Types de Données', 'text', 'Les variables sont des conteneurs pour stocker des données...', 30, 1),
  (module2_id, 'Structures de Contrôle', 'video', 'https://example.com/video2', 35, 2),
  (module2_id, 'Quiz: Programmation de Base', 'quiz', NULL, 15, 3);

  -- Insert modules for "Mathématiques Avancées"
  INSERT INTO public.modules (course_id, title, description, order_index) VALUES
  (course_math_id, 'Algèbre Linéaire', 'Vecteurs et matrices', 1),
  (course_math_id, 'Calcul Différentiel', 'Dérivées et intégrales', 2);

  -- Insert modules for "Biologie Cellulaire"
  INSERT INTO public.modules (course_id, title, description, order_index) VALUES
  (course_bio_id, 'Structure Cellulaire', 'Les composants de la cellule', 1),
  (course_bio_id, 'Métabolisme Cellulaire', 'Processus énergétiques', 2);
END $$;
