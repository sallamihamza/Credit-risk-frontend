import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Database, Cpu, Activity, Clock, Users, TrendingUp, 
  TrendingDown, AlertTriangle, CheckCircle, Download, Filter,
  Calendar, Target, Zap, Shield
} from 'lucide-react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ApiService } from '../services/ApiService';
import { PredictionResponse } from '../types/types';

interface PremiumDashboardProps {
  predictionHistory: PredictionResponse[];
}

export const PremiumDashboard: React.FC<PremiumDashboardProps> = ({ predictionHistory }) => {
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [apiHealth, setApiHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

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

  // Analytics data processing
  const riskDistribution = predictionHistory.reduce((acc, pred) => {
    const risk = pred.prediction.risk_class === 1 ? 'Risque Élevé' : 'Faible Risque';
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(riskDistribution).map(([name, value]) => ({
    name,
    value,
    color: name === 'Risque Élevé' ? '#EF4444' : '#10B981'
  }));

  const timelineData = predictionHistory.slice(0, 10).reverse().map((pred, index) => ({
    name: `P${index + 1}`,
    risk: pred.prediction.probability_score * 100,
    confidence: pred.prediction.confidence_level === 'Élevé' ? 90 : 
                pred.prediction.confidence_level === 'Moyen' ? 70 : 50
  }));

  const stats = {
    totalPredictions: predictionHistory.length,
    highRiskCount: predictionHistory.filter(p => p.prediction.risk_class === 1).length,
    averageRisk: predictionHistory.length > 0 
      ? predictionHistory.reduce((sum, p) => sum + p.prediction.probability_score, 0) / predictionHistory.length * 100
      : 0,
    averageProcessingTime: predictionHistory.length > 0
      ? predictionHistory.reduce((sum, p) => sum + p.processing_time_ms, 0) / predictionHistory.length
      : 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div 
          className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard Premium
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analytics avancées et insights en temps réel
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              whileHover={{ scale: 1.02 }}
            >
              <option value="24h">24 heures</option>
              <option value="7d">7 jours</option>
              <option value="30d">30 jours</option>
            </motion.select>
            
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Prédictions Totales",
            value: stats.totalPredictions,
            icon: Target,
            color: "from-blue-500 to-cyan-500",
            change: "+12%"
          },
          {
            title: "Risques Élevés",
            value: stats.highRiskCount,
            icon: AlertTriangle,
            color: "from-red-500 to-pink-500",
            change: "-5%"
          },
          {
            title: "Risque Moyen",
            value: `${stats.averageRisk.toFixed(1)}%`,
            icon: TrendingUp,
            color: "from-orange-500 to-yellow-500",
            change: "+2%"
          },
          {
            title: "Temps Moyen",
            value: `${stats.averageProcessingTime.toFixed(0)}ms`,
            icon: Zap,
            color: "from-green-500 to-emerald-500",
            change: "-8%"
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </h3>
              <motion.p 
                className="text-2xl font-bold text-gray-900 dark:text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              >
                {stat.value}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-500" />
            Distribution des Risques
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Évolution des Scores
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRisk)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Model Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Cpu className="w-5 h-5 mr-2 text-purple-500" />
          Informations du Modèle
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Nom du modèle:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {modelInfo?.model_name || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Version:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {modelInfo?.model_version || 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Features:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {modelInfo?.features_count || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Statut:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {apiHealth?.status === 'healthy' ? 'Opérationnel' : 'Hors ligne'}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <motion.div 
              className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200/20 dark:border-blue-700/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Performance</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.averageRisk > 50 ? '⚠️' : '✅'} {stats.averageRisk.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Risque moyen</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Recent Predictions */}
      {predictionHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-500" />
            Prédictions Récentes
          </h3>
          
          <div className="space-y-3">
            {predictionHistory.slice(0, 5).map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-600/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    prediction.prediction.risk_class === 1 ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {prediction.prediction.risk_label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Score: {(prediction.prediction.probability_score * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(prediction.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {prediction.processing_time_ms}ms
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};