import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, TrendingUp, TrendingDown, RotateCcw, Download } from 'lucide-react';
import { PredictionResponse } from '../types/types';
import { RiskGauge } from './RiskGauge';
import jsPDF from 'jspdf';

interface PredictionResultsProps {
  result: PredictionResponse;
  onReset: () => void;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ result, onReset }) => {
  const { prediction, model_info, processing_time_ms } = result;
  
  const getRiskColor = (riskClass: number) => {
    return riskClass === 1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
  };

  const getRiskBgColor = (riskClass: number) => {
    return riskClass === 1 
      ? 'bg-red-50/80 dark:bg-red-900/20 border-red-200/50 dark:border-red-700/50' 
      : 'bg-green-50/80 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50';
  };

  const getRiskIcon = (riskClass: number) => {
    return riskClass === 1 ? 
      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" /> : 
      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />;
  };

  const getConfidenceBadge = (level: string) => {
    const colors = {
      'Élevé': 'bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'Moyen': 'bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      'Faible': 'bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    };
    
    return colors[level as keyof typeof colors] || 'bg-gray-100/80 dark:bg-gray-800/30 text-gray-800 dark:text-gray-300';
  };

  const getRiskAdvice = (riskClass: number, probabilityScore: number) => {
    if (riskClass === 1) {
      if (probabilityScore >= 0.8) {
        return {
          title: "Risque Très Élevé",
          description: "Il est fortement recommandé de refuser ce prêt ou d'exiger des garanties supplémentaires substantielles.",
          actions: [
            "Demander des garanties supplémentaires",
            "Réviser les conditions du prêt",
            "Envisager un montant réduit",
            "Effectuer une vérification approfondie"
          ]
        };
      } else {
        return {
          title: "Risque Élevé",
          description: "Ce prêt présente un risque significatif. Une évaluation plus approfondie est nécessaire.",
          actions: [
            "Analyser l'historique de crédit détaillé",
            "Vérifier les revenus et la stabilité d'emploi",
            "Considérer un taux d'intérêt ajusté",
            "Surveiller de près le remboursement"
          ]
        };
      }
    } else {
      if (probabilityScore <= 0.2) {
        return {
          title: "Risque Très Faible",
          description: "Excellent profil de crédit. Ce client présente un risque minimal de défaut de paiement.",
          actions: [
            "Approuver avec conditions standard",
            "Considérer des taux préférentiels",
            "Proposer des produits additionnels",
            "Maintenir une relation client privilégiée"
          ]
        };
      } else {
        return {
          title: "Risque Faible",
          description: "Bon profil de crédit avec un risque acceptable. Procédure d'approbation standard recommandée.",
          actions: [
            "Approuver avec conditions standard",
            "Vérifications de routine",
            "Surveiller périodiquement",
            "Maintenir le contact client"
          ]
        };
      }
    }
  };

  const advice = getRiskAdvice(prediction.risk_class, prediction.probability_score);

const handleExportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Résultat de l'Analyse du Risque Client", 10, 20);

  doc.setFontSize(12);
  doc.text(`Classification: ${prediction.risk_label}`, 10, 40);
  doc.text(`Score de Probabilité: ${(prediction.probability_score * 100).toFixed(1)}%`, 10, 50);
  doc.text(`Niveau de Confiance: ${prediction.confidence_level}`, 10, 60);

  doc.text("Recommandations :", 10, 80);
  advice.actions.forEach((action, i) => {
    doc.text(`- ${action}`, 15, 90 + i * 10);
  });

  doc.save('analyse_risque_client.pdf');
};

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Résultat Principal */}
      <motion.div 
        className={`backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl border-2 ${getRiskBgColor(prediction.risk_class)} p-6`}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {getRiskIcon(prediction.risk_class)}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Résultat de l'Analyse
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Traité en {processing_time_ms}ms
              </p>
            </div>
          </motion.div>
          <div className="flex space-x-2">
            <motion.button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nouvelle analyse</span>
            </motion.button>
            <motion.button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </motion.button>
          </div>
        </div>

        {/* Gauge de Risque */}
        <motion.div 
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <RiskGauge 
            value={prediction.probability_score * 100}
            riskClass={prediction.risk_class}
          />
        </motion.div>

        {/* Métriques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              icon: prediction.risk_class === 1 ? TrendingUp : TrendingDown,
              label: "Classification",
              value: prediction.risk_label,
              color: getRiskColor(prediction.risk_class)
            },
            {
              icon: Info,
              label: "Score de Probabilité",
              value: `${(prediction.probability_score * 100).toFixed(1)}%`,
              color: "text-blue-600 dark:text-blue-400"
            },
            {
              icon: CheckCircle,
              label: "Niveau de Confiance",
              value: prediction.confidence_level,
              color: "text-purple-600 dark:text-purple-400"
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="backdrop-blur-sm bg-white/60 dark:bg-gray-700/60 p-4 rounded-xl border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all duration-300"
            >
              <div className="flex items-center space-x-2 mb-2">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.label}</span>
              </div>
              {metric.label === "Niveau de Confiance" ? (
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getConfidenceBadge(metric.value)}`}>
                  {metric.value}
                </span>
              ) : (
                <p className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Conseils et Recommandations */}
      <motion.div 
        className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <motion.div
            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Recommandations et Actions
        </h3>
        
        <motion.div 
          className="mb-4"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {advice.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {advice.description}
          </p>
        </motion.div>

        <div>
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Actions Recommandées
          </h4>
          <ul className="space-y-2">
            {advice.actions.map((action, index) => (
              <motion.li 
                key={index} 
                className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-600/70 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <span className="text-gray-700 dark:text-gray-300">{action}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Informations sur le Modèle */}
      <motion.div 
        className="backdrop-blur-sm bg-gray-50/80 dark:bg-gray-800/50 rounded-xl p-4 border border-white/20 dark:border-gray-700/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Informations sur le Modèle
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Modèle:</span>
            <p className="font-medium text-gray-900 dark:text-white">{model_info.model_name}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Version:</span>
            <p className="font-medium text-gray-900 dark:text-white">{model_info.model_version}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Features:</span>
            <p className="font-medium text-gray-900 dark:text-white">{model_info.features_used}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};