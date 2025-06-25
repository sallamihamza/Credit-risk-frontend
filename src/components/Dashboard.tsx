import React, { useState, useEffect } from 'react';
import { BarChart3, Database, Cpu, Activity, Clock, Users } from 'lucide-react';
import { ApiService } from '../services/ApiService';

export const Dashboard: React.FC = () => {
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [apiHealth, setApiHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [modelData, healthData] = await Promise.all([
        ApiService.getModelInfo(),
        ApiService.checkHealth()
      ]);
      
      setModelInfo(modelData);
      setApiHealth(healthData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard de Prédiction de Risque de Crédit
            </h1>
            <p className="text-gray-600">
              Vue d'ensemble du système et des performances du modèle
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status API */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className={`w-6 h-6 ${apiHealth?.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`} />
            <h3 className="text-lg font-semibold text-gray-900">État de l'API</h3>
          </div>
          <p className={`text-2xl font-bold ${apiHealth?.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
            {apiHealth?.status === 'healthy' ? 'Opérationnelle' : 'Hors ligne'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Modèle: {apiHealth?.model_loaded ? 'Chargé' : 'Non chargé'}
          </p>
        </div>

        {/* Modèle Actuel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Cpu className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Modèle</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {modelInfo?.model_name || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Version {modelInfo?.model_version || 'N/A'}
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Database className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Variables</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {modelInfo?.features_count || 0}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Features d'entrée
          </p>
        </div>

        {/* Dernière mise à jour */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Dernière MAJ</h3>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {modelInfo?.loaded_at ? new Date(modelInfo.loaded_at).toLocaleDateString() : 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Chargement modèle
          </p>
        </div>
      </div>

      {/* Informations détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations sur le Modèle */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Détails du Modèle
          </h3>
          {modelInfo ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nom du modèle:</span>
                <span className="font-medium">{modelInfo.model_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">{modelInfo.model_version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nombre de variables:</span>
                <span className="font-medium">{modelInfo.features_count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut:</span>
                <span className="font-medium text-green-600">{modelInfo.status}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Aucune information disponible</p>
          )}
        </div>

        {/* Variables d'entrée */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Variables d'Entrée
          </h3>
          {modelInfo?.features ? (
            <div className="max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 gap-2">
                {modelInfo.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Aucune variable disponible</p>
          )}
        </div>
      </div>

      {/* Guide d'utilisation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Guide d'Utilisation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-800">1. Saisie des Données</h4>
            </div>
            <p className="text-sm text-gray-600">
              Remplissez le formulaire avec les informations complètes du client pour obtenir une évaluation précise.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-800">2. Analyse du Risque</h4>
            </div>
            <p className="text-sm text-gray-600">
              Le modèle IA analyse les données et fournit un score de risque avec des recommandations d'actions.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-800">3. Prise de Décision</h4>
            </div>
            <p className="text-sm text-gray-600">
              Utilisez les résultats et recommandations pour prendre une décision éclairée sur l'octroi du crédit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};