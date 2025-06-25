# Guide de Démarrage Rapide - Système de Prédiction de Risque de Crédit

## Installation Express (5 minutes)

### 1. Backend Flask
```bash
cd credit-risk-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/generate_models.py
python src/main.py
```
✅ Backend disponible sur http://127.0.0.1:5000

### 2. Frontend React
```bash
cd credit-risk-frontend
npm install
npm run dev
```
✅ Frontend disponible sur http://localhost:5173

## Test Rapide

### Via l'interface web
1. Ouvrez http://localhost:5173
2. Remplissez le formulaire avec les valeurs par défaut
3. Cliquez sur "Analyser le risque de crédit"
4. Consultez les résultats instantanés

### Via API (curl)
```bash
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

## Résultat Attendu
```json
{
  "prediction": "low_risk",
  "probability": 0.327,
  "confidence": "medium",
  "model_used": "RandomForestClassifier",
  "processing_time_ms": 19.06
}
```

## Dépannage Express

❌ **Erreur "Module not found"** → `pip install -r requirements.txt`  
❌ **Erreur "Model not found"** → `python src/generate_models.py`  
❌ **Port déjà utilisé** → Changez le port dans main.py  
❌ **CORS Error** → Vérifiez que les deux serveurs fonctionnent  

## Architecture Simplifiée

```
Frontend (React) ←→ API REST ←→ Backend (Flask) ←→ Modèle ML
     :5173              HTTP           :5000        RandomForest
```

Pour plus de détails, consultez le README.md complet.

