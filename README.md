# Système de Prédiction de Risque de Crédit - Codix TN

## Vue d'ensemble

Cette application a été développée dans le cadre du stage d'intégration d'un système intelligent à l'IMX chez Codix TN. Elle utilise des algorithmes d'apprentissage automatique avancés pour évaluer le risque de crédit des demandeurs de prêt, offrant une solution complète et moderne pour l'analyse financière.

Le système combine un backend robuste développé avec Flask et un frontend intuitif créé avec React, permettant une évaluation précise et rapide du risque de crédit basée sur 13 facteurs clés incluant les informations personnelles, financières et l'historique de crédit du demandeur.

## 🌐 Démo

- **Frontend** (GitHub Pages) : [➡️https://sallamihamza.github.io/Credit-risk-project/]
- **Backend** (Github) : [➡️https://github.com/sallamihamza/Credit-risk-backend]

- **Backend API** (Railway) : [➡️ https://web-production-f2f2.up.railway.app/]
  
## Fonctionnalités principales

### Analyse prédictive avancée
L'application utilise un modèle RandomForestClassifier entraîné sur des données historiques pour fournir des prédictions précises du risque de crédit. Le modèle analyse simultanément plusieurs variables pour produire une évaluation complète du profil de risque.

### Interface utilisateur moderne
L'interface React offre une expérience utilisateur fluide et professionnelle avec :
- Formulaire de saisie intuitif avec validation en temps réel
- Affichage des résultats en temps réel avec indicateurs visuels
- Design responsive compatible mobile et desktop
- Feedback immédiat sur la qualité des données saisies

### API REST robuste
Le backend Flask expose une API REST complète permettant :
- Prédictions en temps réel via des endpoints sécurisés
- Gestion automatique du prétraitement des données
- Réponses structurées avec métadonnées détaillées
- Support CORS pour l'intégration frontend-backend

### Traitement intelligent des données
Le système inclut un préprocesseur automatique qui :
- Normalise les données d'entrée selon les standards du modèle
- Gère les variables catégorielles avec encodage approprié
- Valide la cohérence et la complétude des données
- Optimise les performances de prédiction

## Architecture technique

### Backend (Flask)
- **Framework** : Flask avec extensions pour API REST
- **Modèle ML** : RandomForestClassifier pré-entraîné
- **Préprocessing** : Pipeline de transformation automatisée
- **Sérialisation** : Modèles sauvegardés avec joblib/pickle
- **API** : Endpoints RESTful avec validation des données

### Frontend (React)
- **Framework** : React 18 avec hooks modernes
- **Styling** : CSS moderne avec design responsive
- **Gestion d'état** : useState pour la gestion locale
- **Communication** : Fetch API pour les requêtes HTTP
- **Validation** : Validation côté client en temps réel

### Intégration
- **Communication** : API REST avec échange JSON
- **CORS** : Configuration pour permettre les requêtes cross-origin
- **Gestion d'erreurs** : Handling complet des erreurs réseau et serveur
- **Performance** : Optimisations pour des réponses rapides

## Structure du projet

```
credit-risk-prediction/
├── credit-risk-api/          # Backend Flask
│   ├── src/
│   │   ├── main.py          # Point d'entrée de l'application
│   │   ├── prediction_service.py  # Service de prédiction
│   │   ├── routes/
│   │   │   └── prediction.py     # Routes API
│   │   ├── models/          # Modèles ML sauvegardés
│   │   └── generate_models.py    # Script de génération des modèles
│   ├── requirements.txt     # Dépendances Python
│   └── venv/               # Environnement virtuel
├── credit-risk-frontend/    # Frontend React
│   ├── src/
│   │   ├── App.jsx         # Composant principal
│   │   └── App.css         # Styles CSS
│   ├── index.html          # Page HTML principale
│   └── package.json        # Dépendances Node.js
└── documentation/          # Documentation du projet
    ├── architecture_document.md
    └── README.md
```



## Installation et configuration

### Prérequis système
Avant d'installer l'application, assurez-vous que votre système dispose des éléments suivants :

- **Python 3.8+** : Requis pour l'exécution du backend Flask
- **Node.js 16+** : Nécessaire pour le frontend React et npm
- **Git** : Pour le clonage du repository (optionnel)
- **4GB RAM minimum** : Pour le chargement des modèles ML
- **Espace disque** : Au moins 500MB d'espace libre

### Installation du backend Flask

#### 1. Préparation de l'environnement
```bash
# Naviguer vers le répertoire du backend
cd credit-risk-api

# Créer un environnement virtuel Python
python3 -m venv venv

# Activer l'environnement virtuel
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

#### 2. Installation des dépendances
```bash
# Installer les packages requis
pip install -r requirements.txt
```

Les principales dépendances incluent :
- **Flask** : Framework web pour l'API REST
- **Flask-CORS** : Gestion des requêtes cross-origin
- **scikit-learn** : Bibliothèque d'apprentissage automatique
- **pandas** : Manipulation et analyse des données
- **numpy** : Calculs numériques optimisés
- **joblib** : Sérialisation des modèles ML

#### 3. Génération des modèles
```bash
# Générer les modèles ML nécessaires
cd src
python generate_models.py
```

Cette étape crée les fichiers de modèles suivants :
- `models/best_credit_risk_model.pkl` : Modèle RandomForest entraîné
- `models/preprocessor.pkl` : Pipeline de prétraitement des données

#### 4. Démarrage du serveur
```bash
# Lancer l'application Flask
python src/main.py
```

Le serveur démarre sur `http://localhost:5000` par défaut.

### Installation du frontend React

#### 1. Installation des dépendances
```bash
# Naviguer vers le répertoire frontend
cd credit-risk-frontend

# Installer les packages Node.js
npm install
```

#### 2. Configuration de l'environnement
Le frontend est préconfiguré pour communiquer avec l'API backend sur `http://127.0.0.1:5000`. Si vous utilisez une configuration différente, modifiez l'URL dans `src/App.jsx`.

#### 3. Démarrage du serveur de développement
```bash
# Lancer le serveur React
npm run dev
```

L'application frontend sera accessible sur `http://localhost:5173`.

### Vérification de l'installation

#### Test de l'API backend
```bash
# Test de l'endpoint health
curl http://127.0.0.1:5000/api/v1/health

# Réponse attendue :
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2025-06-18T03:30:00Z"
}
```

#### Test de prédiction
```bash
# Test d'une prédiction complète
curl -X POST http://127.0.0.1:5000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{
    "person_age": 35,
    "person_income": 50000,
    "person_emp_length": 10,
    "credit_score": 720,
    "person_gender": "M",
    "person_education": "Bachelor",
    "person_home_ownership": "MORTGAGE",
    "previous_defaults": "N",
    "loan_amount": 15000,
    "loan_interest_rate": 12.5,
    "loan_percent_income": 0.3,
    "credit_history_length": 8,
    "loan_intent": "PERSONAL"
  }'
```

## Guide d'utilisation

### Interface utilisateur

L'application présente une interface claire et intuitive divisée en plusieurs sections :

#### Section "Informations du demandeur"
Cette section collecte les données personnelles et financières essentielles :

- **Âge** : Âge du demandeur (18-100 ans)
- **Revenu annuel** : Revenu brut annuel en euros
- **Expérience professionnelle** : Nombre d'années d'expérience
- **Score de crédit** : Score de crédit actuel (300-850)
- **Genre** : Homme ou Femme
- **Niveau d'éducation** : Lycée, Licence, Master, ou Doctorat
- **Statut de propriété** : Locataire, Propriétaire, Hypothèque, ou Autre
- **Défauts de paiement antérieurs** : Oui ou Non

#### Section "Informations sur le prêt"
Cette section détaille les caractéristiques du prêt demandé :

- **Montant du prêt** : Montant demandé en euros
- **Taux d'intérêt** : Taux d'intérêt proposé en pourcentage
- **Pourcentage du revenu** : Ratio prêt/revenu (0-1)
- **Historique de crédit** : Ancienneté de l'historique de crédit en années
- **Intention du prêt** : Personnel, Éducation, Médical, Entreprise, Amélioration domicile, ou Consolidation de dettes

#### Processus de prédiction

1. **Saisie des données** : Remplissez tous les champs requis du formulaire
2. **Validation** : Le système valide automatiquement la cohérence des données
3. **Analyse** : Cliquez sur "Analyser le risque de crédit" pour lancer la prédiction
4. **Résultats** : Les résultats s'affichent instantanément avec :
   - **Niveau de risque** : Faible, Moyen, ou Élevé
   - **Score de probabilité** : Pourcentage de risque calculé
   - **Niveau de confiance** : Fiabilité de la prédiction
   - **Métadonnées techniques** : Modèle utilisé, temps de traitement

### Interprétation des résultats

#### Niveaux de risque
- **Faible risque (0-33%)** : Profil favorable, probabilité élevée de remboursement
- **Risque moyen (34-66%)** : Profil modéré, analyse approfondie recommandée
- **Risque élevé (67-100%)** : Profil défavorable, prudence requise

#### Facteurs d'influence
Le modèle considère l'interaction complexe entre tous les facteurs. Les éléments les plus influents incluent généralement :
- Score de crédit et historique de crédit
- Ratio prêt/revenu et stabilité financière
- Expérience professionnelle et niveau d'éducation
- Historique de défauts de paiement

## Référence API

### Endpoints disponibles

#### GET /api/v1/health
**Description** : Vérification de l'état de santé de l'API

**Réponse** :
```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2025-06-18T03:30:00Z"
}
```

#### POST /api/v1/predict
**Description** : Prédiction du risque de crédit

**Corps de la requête** :
```json
{
  "person_age": 35,
  "person_income": 50000,
  "person_emp_length": 10,
  "credit_score": 720,
  "person_gender": "M",
  "person_education": "Bachelor",
  "person_home_ownership": "MORTGAGE",
  "previous_defaults": "N",
  "loan_amount": 15000,
  "loan_interest_rate": 12.5,
  "loan_percent_income": 0.3,
  "credit_history_length": 8,
  "loan_intent": "PERSONAL"
}
```

**Réponse** :
```json
{
  "prediction": "low_risk",
  "probability": 0.327,
  "confidence": "medium",
  "model_used": "RandomForestClassifier",
  "processing_time_ms": 19.06,
  "timestamp": "2025-06-18T03:38:37Z"
}
```

### Validation des données

#### Champs requis
Tous les champs suivants sont obligatoires :
- `person_age` : Entier entre 18 et 100
- `person_income` : Nombre positif
- `person_emp_length` : Entier positif ou zéro
- `credit_score` : Entier entre 300 et 850
- `person_gender` : "M" ou "F"
- `person_education` : "High School", "Bachelor", "Master", "Doctorate"
- `person_home_ownership` : "RENT", "OWN", "MORTGAGE", "OTHER"
- `previous_defaults` : "Y" ou "N"
- `loan_amount` : Nombre positif
- `loan_interest_rate` : Nombre positif
- `loan_percent_income` : Nombre entre 0 et 1
- `credit_history_length` : Entier positif ou zéro
- `loan_intent` : "PERSONAL", "EDUCATION", "MEDICAL", "VENTURE", "HOMEIMPROVEMENT", "DEBTCONSOLIDATION"

#### Gestion des erreurs
L'API retourne des codes d'erreur HTTP appropriés :
- **400 Bad Request** : Données manquantes ou invalides
- **500 Internal Server Error** : Erreur de traitement du modèle
- **200 OK** : Prédiction réussie


## Déploiement en production

### Considérations de sécurité

#### Backend Flask
Pour un déploiement en production, plusieurs mesures de sécurité doivent être implémentées :

**Configuration de production** :
```python
# Configuration recommandée pour la production
app.config['DEBUG'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
```

**Serveur WSGI** : Utilisez un serveur WSGI robuste comme Gunicorn :
```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 --workers 4 src.main:app
```

**Reverse Proxy** : Configurez un reverse proxy avec Nginx pour :
- Gestion SSL/TLS
- Limitation du taux de requêtes
- Compression des réponses
- Mise en cache statique

#### Frontend React
**Build de production** :
```bash
npm run build
```

**Serveur web** : Servez les fichiers statiques avec Nginx ou Apache
**CDN** : Utilisez un CDN pour optimiser les performances globales

### Surveillance et monitoring

#### Métriques recommandées
- **Temps de réponse API** : Surveillance des performances
- **Taux d'erreur** : Détection des problèmes
- **Utilisation mémoire** : Monitoring des modèles ML
- **Throughput** : Nombre de prédictions par seconde

#### Logging
Implémentez un système de logging complet :
```python
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### Maintenance et mises à jour

#### Mise à jour des modèles
Le système permet la mise à jour des modèles ML sans interruption de service :

1. **Entraînement** : Entraînez un nouveau modèle avec des données récentes
2. **Validation** : Testez les performances sur un jeu de données de validation
3. **Déploiement** : Remplacez les fichiers de modèles existants
4. **Redémarrage** : Redémarrez l'application pour charger le nouveau modèle

#### Sauvegarde des données
Implémentez une stratégie de sauvegarde pour :
- Modèles ML entraînés
- Configurations de l'application
- Logs d'activité
- Données de prédiction (si stockées)

## Développement et contribution

### Structure du code

#### Backend (Flask)
```
src/
├── main.py                 # Point d'entrée, configuration Flask
├── prediction_service.py   # Logique métier de prédiction
├── routes/
│   └── prediction.py      # Définition des routes API
├── models/                # Stockage des modèles ML
└── utils/                 # Utilitaires et helpers (à développer)
```

#### Frontend (React)
```
src/
├── App.jsx               # Composant principal
├── App.css              # Styles globaux
├── components/          # Composants réutilisables (à développer)
└── utils/               # Utilitaires frontend (à développer)
```

### Standards de développement

#### Code Python
- **PEP 8** : Respect des conventions de style Python
- **Type hints** : Utilisation des annotations de type
- **Docstrings** : Documentation des fonctions et classes
- **Tests unitaires** : Couverture de test recommandée > 80%

#### Code JavaScript/React
- **ESLint** : Linting automatique du code
- **Prettier** : Formatage automatique
- **JSDoc** : Documentation des fonctions
- **Tests** : Tests unitaires avec Jest/React Testing Library

### Extensions possibles

#### Fonctionnalités avancées
- **Authentification** : Système de login/logout
- **Historique** : Stockage des prédictions précédentes
- **Rapports** : Génération de rapports PDF
- **API versioning** : Gestion des versions d'API
- **Rate limiting** : Limitation du nombre de requêtes

#### Améliorations ML
- **Ensemble models** : Combinaison de plusieurs modèles
- **Feature importance** : Analyse de l'importance des variables
- **Model explainability** : Explication des prédictions (SHAP, LIME)
- **A/B testing** : Test de différents modèles en production

## Résolution des problèmes

### Problèmes courants

#### Backend ne démarre pas
**Symptôme** : Erreur au démarrage de Flask
**Solutions** :
1. Vérifiez que l'environnement virtuel est activé
2. Installez toutes les dépendances : `pip install -r requirements.txt`
3. Générez les modèles : `python src/generate_models.py`
4. Vérifiez les permissions des fichiers

#### Modèles non trouvés
**Symptôme** : Erreur "Model file not found"
**Solutions** :
1. Exécutez `python src/generate_models.py`
2. Vérifiez que le répertoire `models/` existe
3. Contrôlez les chemins dans `prediction_service.py`

#### Erreurs CORS
**Symptôme** : Requêtes bloquées par le navigateur
**Solutions** :
1. Vérifiez la configuration Flask-CORS
2. Assurez-vous que les origins sont correctement configurés
3. Vérifiez les headers de requête

#### Frontend ne se connecte pas à l'API
**Symptôme** : Erreurs de réseau dans la console
**Solutions** :
1. Vérifiez que le backend fonctionne sur le bon port
2. Contrôlez l'URL de l'API dans le code React
3. Vérifiez la configuration CORS du backend

### Support et contact

Pour toute question ou problème technique :

**Développeur** : Hamza Sallemi  
**Contexte** : Stage d'intégration d'un système intelligent à l'IMX  
**Entreprise** : Codix TN  
**Date de développement** : Juin 2025

## Licence et crédits

### Développement
Cette application a été développée dans le cadre d'un projet de stage chez Codix TN, démontrant l'intégration réussie de technologies d'intelligence artificielle dans un environnement professionnel.

### Technologies utilisées
- **Backend** : Flask, scikit-learn, pandas, numpy
- **Frontend** : React, CSS3, HTML5
- **Machine Learning** : RandomForestClassifier
- **Outils de développement** : Python 3.11, Node.js 20, npm

### Remerciements
Remerciements particuliers à l'équipe Codix TN pour l'encadrement et le support technique durant le développement de cette solution innovante de prédiction de risque de crédit.

---

"# Data-science-project" 
