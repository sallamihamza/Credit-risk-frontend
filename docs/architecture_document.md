# Architecture de l'Application de Prédiction de Risque de Crédit
**Date:** 18 juin 2025  
**Projet:** Intégration d'un système intelligent à l'IMX - Stage Codix TN  
**Développé par:** Hamza Sallemi

## 1. Vue d'ensemble du projet

L'application de prédiction de risque de crédit s'inscrit dans le cadre d'un stage d'intégration d'un système intelligent à l'IMX (Insurance Management eXchange) chez Codix TN. Cette solution vise à automatiser l'évaluation du risque de crédit en utilisant des techniques d'apprentissage automatique avancées, permettant ainsi aux institutions financières de prendre des décisions éclairées et rapides concernant l'octroi de prêts.

Le système proposé transforme le workflow de machine learning développé par Hamza Sallemi en une application web complète et déployable. Cette application permettra aux utilisateurs finaux d'interagir avec le modèle de prédiction via une interface intuitive, tout en maintenant la robustesse et la précision du modèle sous-jacent.

L'architecture proposée suit les principes de développement moderne avec une séparation claire entre le frontend et le backend, permettant une scalabilité et une maintenabilité optimales. Le système est conçu pour être intégré facilement dans l'écosystème existant de Codix TN tout en respectant les standards de sécurité et de performance requis dans le secteur financier.

## 2. Architecture globale du système

### 2.1 Approche architecturale

L'application adopte une architecture en couches basée sur le pattern MVC (Model-View-Controller) adapté pour les applications web modernes. Cette approche garantit une séparation claire des responsabilités et facilite la maintenance et l'évolution du système.

La solution s'articule autour de trois composants principaux interconnectés par des API REST standardisées. Cette architecture découplée permet une évolutivité indépendante de chaque composant et facilite les tests unitaires et d'intégration.

### 2.2 Composants principaux

#### Frontend React (Couche Présentation)
Le frontend constitue l'interface utilisateur de l'application, développée avec React.js pour offrir une expérience utilisateur moderne et réactive. Cette couche gère l'affichage des formulaires de saisie, la validation côté client, et la présentation des résultats de prédiction.

Les principales responsabilités du frontend incluent la collecte des données utilisateur via des formulaires intuitifs, la validation en temps réel des données saisies, l'envoi des requêtes vers l'API backend, et l'affichage des résultats de prédiction avec des visualisations appropriées. Le composant frontend intègre également des fonctionnalités de gestion d'erreurs et de feedback utilisateur pour assurer une expérience fluide.

#### Backend Flask (Couche Logique Métier)
Le backend, développé avec Flask, constitue le cœur de l'application en gérant la logique métier et l'orchestration des prédictions. Cette couche expose une API REST qui sert d'interface entre le frontend et le modèle de machine learning.

Les responsabilités principales du backend comprennent la réception et la validation des données via l'API, le prétraitement des données selon les spécifications du modèle, l'exécution des prédictions en utilisant le modèle entraîné, et la formatage des résultats pour le frontend. Le backend intègre également des mécanismes de logging, de gestion d'erreurs, et de sécurité pour assurer la robustesse du système.

#### Couche Modèle (Machine Learning)
Cette couche encapsule le modèle de machine learning entraîné et ses composants associés. Elle comprend le modèle sérialisé (best_credit_risk_model.pkl), le preprocesseur pour la transformation des données (preprocessor.pkl), et les métadonnées nécessaires au bon fonctionnement du système.

La couche modèle est responsable de la transformation des données d'entrée selon les spécifications d'entraînement, de l'exécution des prédictions avec le modèle optimal sélectionné, et du calcul des scores de probabilité pour évaluer la confiance des prédictions.




## 3. Spécifications techniques détaillées

### 3.1 Stack technologique

#### Technologies Frontend
- **React.js 18+** : Framework JavaScript moderne pour la construction d'interfaces utilisateur réactives
- **Material-UI ou Ant Design** : Bibliothèque de composants UI pour un design professionnel et cohérent
- **Axios** : Client HTTP pour les communications avec l'API backend
- **React Hook Form** : Gestion efficace des formulaires avec validation intégrée
- **Chart.js ou Recharts** : Visualisation des données et des résultats de prédiction

#### Technologies Backend
- **Flask 2.3+** : Framework web Python léger et flexible
- **Flask-CORS** : Gestion des requêtes cross-origin pour l'intégration frontend-backend
- **Flask-RESTful** : Extension pour la création d'APIs REST structurées
- **Scikit-learn** : Bibliothèque de machine learning pour le chargement et l'utilisation du modèle
- **Pandas & NumPy** : Manipulation et traitement des données
- **Joblib** : Sérialisation et désérialisation des modèles ML

#### Infrastructure et Déploiement
- **Docker** : Containerisation pour un déploiement cohérent
- **Nginx** : Serveur web pour le reverse proxy et la gestion des fichiers statiques
- **Gunicorn** : Serveur WSGI pour l'application Flask en production
- **PostgreSQL ou SQLite** : Base de données pour le logging et la persistance (optionnel)

### 3.2 Architecture de données

#### Structure des données d'entrée
Le système accepte des données structurées représentant le profil d'un demandeur de crédit. Ces données correspondent aux features utilisées lors de l'entraînement du modèle et incluent des informations démographiques, financières, et historiques.

Les données numériques comprennent l'âge de la personne (person_age), le revenu annuel (person_income), l'expérience professionnelle en années (person_emp_exp), le montant du prêt demandé (loan_amnt), le taux d'intérêt du prêt (loan_int_rate), le pourcentage du revenu représenté par le prêt (loan_percent_income), la longueur de l'historique de crédit (cb_person_cred_hist_length), et le score de crédit (credit_score).

Les données catégorielles incluent le genre (person_gender), le niveau d'éducation (person_education), le statut de propriété immobilière (person_home_ownership), l'intention du prêt (loan_intent), et l'historique de défauts de paiement (previous_loan_defaults_on_file).

#### Structure des données de sortie
Le système retourne une réponse structurée contenant la prédiction de risque, le score de probabilité, et des métadonnées contextuelles. Cette structure permet une interprétation claire des résultats et facilite l'intégration avec d'autres systèmes.

La réponse inclut la classification binaire du risque (0 pour faible risque, 1 pour risque élevé), le score de probabilité associé au risque élevé (valeur entre 0 et 1), le niveau de confiance de la prédiction, et des informations sur le modèle utilisé et la version de l'API.

## 4. Spécification des endpoints API

### 4.1 Endpoint de prédiction principal

#### POST /api/v1/predict
Cet endpoint constitue le cœur fonctionnel de l'API, permettant d'obtenir une prédiction de risque de crédit basée sur les données fournies.

**URL complète:** `http://http://127.0.0.1:5000/api/v1/predict`

**Méthode HTTP:** POST

**Headers requis:**
```
Content-Type: application/json
Accept: application/json
```

**Corps de la requête (JSON):**
```json
{
  "person_age": 35,
  "person_income": 50000,
  "person_emp_exp": 10,
  "loan_amnt": 15000,
  "loan_int_rate": 12.5,
  "loan_percent_income": 0.3,
  "cb_person_cred_hist_length": 8,
  "credit_score": 720,
  "person_gender": "Male",
  "person_education": "Bachelor",
  "person_home_ownership": "MORTGAGE",
  "loan_intent": "PERSONAL",
  "previous_loan_defaults_on_file": "No"
}
```

**Réponse en cas de succès (200 OK):**
```json
{
  "status": "success",
  "prediction": {
    "risk_class": 0,
    "risk_label": "Faible risque",
    "probability_score": 0.23,
    "confidence_level": "Élevé"
  },
  "model_info": {
    "model_name": "Random Forest",
    "model_version": "1.0",
    "features_used": 13
  },
  "timestamp": "2025-06-18T10:30:00Z",
  "processing_time_ms": 45
}
```

**Réponse en cas d'erreur (400 Bad Request):**
```json
{
  "status": "error",
  "error_code": "VALIDATION_ERROR",
  "message": "Données d'entrée invalides",
  "details": {
    "missing_fields": ["person_age", "loan_amnt"],
    "invalid_values": {
      "credit_score": "Doit être entre 300 et 850"
    }
  },
  "timestamp": "2025-06-18T10:30:00Z"
}
```

### 4.2 Endpoints auxiliaires

#### GET /api/v1/health
Endpoint de vérification de l'état de santé de l'API.

**Réponse (200 OK):**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "model_loaded": true,
  "uptime_seconds": 3600,
  "timestamp": "2025-06-18T10:30:00Z"
}
```

#### GET /api/v1/model/info
Informations détaillées sur le modèle chargé.

**Réponse (200 OK):**
```json
{
  "model_name": "Random Forest",
  "model_version": "1.0",
  "training_date": "2025-06-15",
  "features": [
    "person_age", "person_income", "person_emp_exp",
    "loan_amnt", "loan_int_rate", "loan_percent_income",
    "cb_person_cred_hist_length", "credit_score",
    "person_gender", "person_education", 
    "person_home_ownership", "loan_intent",
    "previous_loan_defaults_on_file"
  ],
  "performance_metrics": {
    "accuracy": 0.8542,
    "precision": 0.8123,
    "recall": 0.7891,
    "roc_auc": 0.8756
  }
}
```

#### POST /api/v1/batch/predict
Endpoint pour les prédictions en lot (optionnel pour les versions futures).

**Corps de la requête:**
```json
{
  "predictions": [
    {
      "id": "req_001",
      "data": { /* données de prédiction */ }
    },
    {
      "id": "req_002", 
      "data": { /* données de prédiction */ }
    }
  ]
}
```


## 5. Sécurité et authentification

### 5.1 Stratégie de sécurité

La sécurité constitue un aspect critique de l'application, particulièrement dans le contexte financier où les données sensibles doivent être protégées selon les standards industriels. L'architecture intègre plusieurs couches de sécurité pour assurer la confidentialité, l'intégrité, et la disponibilité des données.

La validation des données d'entrée s'effectue à plusieurs niveaux, incluant la validation côté client pour l'expérience utilisateur, la validation côté serveur pour la sécurité, et la sanitisation des données pour prévenir les attaques par injection. Chaque champ de données est validé selon des règles métier spécifiques, avec des contrôles de type, de plage, et de format.

### 5.2 Mécanismes de protection

#### Validation et sanitisation
- Validation stricte des types de données et des plages de valeurs
- Sanitisation des entrées pour prévenir les attaques XSS et injection
- Limitation de la taille des requêtes pour éviter les attaques DoS
- Validation des formats de données selon les spécifications du modèle

#### Sécurité des communications
- Utilisation obligatoire de HTTPS en production
- Headers de sécurité HTTP (HSTS, CSP, X-Frame-Options)
- Configuration CORS restrictive pour limiter les origines autorisées
- Chiffrement des données sensibles en transit et au repos

#### Gestion des erreurs
- Messages d'erreur génériques pour éviter la divulgation d'informations
- Logging sécurisé des tentatives d'accès et des erreurs
- Mécanismes de rate limiting pour prévenir les abus
- Monitoring des patterns d'utilisation anormaux

### 5.3 Authentification et autorisation (extension future)

Pour une intégration complète dans l'environnement Codix TN, l'application peut être étendue avec des mécanismes d'authentification robustes incluant l'intégration avec les systèmes d'identité existants, la gestion des rôles et permissions, et l'audit des accès.

## 6. Performance et scalabilité

### 6.1 Optimisations de performance

L'architecture est conçue pour offrir des temps de réponse optimaux tout en maintenant la précision des prédictions. Plusieurs stratégies d'optimisation sont mises en place pour assurer une expérience utilisateur fluide.

Le chargement du modèle s'effectue une seule fois au démarrage de l'application, évitant ainsi les latences répétées. Le modèle et le preprocesseur sont maintenus en mémoire pour des accès rapides, avec des mécanismes de cache pour les transformations de données fréquentes.

#### Optimisations côté backend
- Chargement unique du modèle ML au démarrage de l'application
- Cache en mémoire pour les transformations de données répétitives
- Pool de connexions pour les accès base de données (si applicable)
- Compression des réponses HTTP pour réduire la bande passante
- Optimisation des imports Python pour réduire le temps de démarrage

#### Optimisations côté frontend
- Lazy loading des composants React non critiques
- Mise en cache des résultats de prédiction côté client
- Optimisation du bundle JavaScript avec code splitting
- Compression des assets statiques (CSS, images, JavaScript)
- Utilisation d'un CDN pour la distribution des ressources statiques

### 6.2 Stratégies de scalabilité

L'architecture modulaire permet une montée en charge horizontale et verticale selon les besoins. Plusieurs approches peuvent être mises en œuvre pour gérer l'augmentation de la charge.

Pour la scalabilité horizontale, l'application peut être déployée sur plusieurs instances avec un load balancer pour distribuer la charge. Le backend Flask étant stateless, il peut être facilement répliqué. Pour la scalabilité verticale, l'optimisation des ressources serveur (CPU, mémoire) peut améliorer les performances d'une instance unique.

#### Solutions de mise à l'échelle
- Déploiement multi-instances avec load balancing
- Utilisation de conteneurs Docker pour la portabilité
- Intégration avec des orchestrateurs comme Kubernetes
- Mise en place de métriques de monitoring pour l'auto-scaling
- Séparation des services pour une architecture microservices (évolution future)

## 7. Monitoring et observabilité

### 7.1 Logging et audit

Un système de logging complet permet de tracer les opérations, diagnostiquer les problèmes, et maintenir un audit des prédictions effectuées. Cette traçabilité est essentielle dans le contexte financier pour la conformité réglementaire.

Les logs incluent les requêtes de prédiction avec horodatage, les données d'entrée (anonymisées si nécessaire), les résultats de prédiction, les temps de traitement, et les erreurs rencontrées. Un système de rotation des logs assure la gestion de l'espace disque.

### 7.2 Métriques de performance

Des métriques détaillées permettent de monitorer la santé de l'application et d'identifier les goulots d'étranglement. Ces métriques incluent le temps de réponse des API, le taux de succès des prédictions, l'utilisation des ressources système, et la distribution des scores de prédiction.

#### Métriques clés à surveiller
- Latence moyenne et percentiles des requêtes API
- Throughput (requêtes par seconde)
- Taux d'erreur et types d'erreurs
- Utilisation CPU et mémoire
- Distribution des scores de prédiction
- Temps de chargement du modèle

## 8. Plan de déploiement et intégration

### 8.1 Environnements de déploiement

L'application suit un pipeline de déploiement structuré avec plusieurs environnements pour assurer la qualité et la stabilité. Chaque environnement a un rôle spécifique dans le cycle de vie de l'application.

L'environnement de développement permet les tests rapides et l'itération, l'environnement de test (staging) simule la production pour les tests d'intégration, et l'environnement de production héberge la version stable pour les utilisateurs finaux.

### 8.2 Stratégie de déploiement

#### Containerisation avec Docker
```dockerfile
# Exemple de Dockerfile pour le backend
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

#### Configuration Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./models:/app/models
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### 8.3 Intégration avec l'écosystème Codix TN

L'intégration dans l'environnement Codix TN nécessite une attention particulière aux standards et protocoles existants. L'application doit s'interfacer harmonieusement avec les systèmes IMX existants tout en respectant les contraintes de sécurité et de performance.

Les points d'intégration incluent l'authentification via les systèmes d'identité Codix, l'intégration avec les bases de données clients existantes, la conformité aux standards de logging et monitoring, et l'alignement avec les processus de déploiement établis.

## 9. Conclusion et prochaines étapes

Cette architecture fournit une base solide pour le développement d'une application de prédiction de risque de crédit robuste et scalable. La séparation claire des responsabilités, l'utilisation de technologies éprouvées, et l'attention portée à la sécurité et aux performances garantissent une solution adaptée aux exigences du secteur financier.

Les prochaines étapes incluent l'implémentation détaillée de chaque composant selon les spécifications définies, la mise en place des environnements de développement et de test, et l'intégration progressive avec l'écosystème Codix TN. Cette approche itérative permettra de valider l'architecture et d'ajuster les spécifications selon les retours d'expérience.

L'architecture proposée offre également une base d'évolution pour des fonctionnalités avancées telles que l'explicabilité des prédictions avec SHAP, l'intégration de nouveaux modèles de machine learning, et l'extension vers d'autres types de prédictions financières.

