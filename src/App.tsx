import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { ClientForm } from './components/ClientForm';
import { PredictionResults } from './components/PredictionResults';
import { PremiumDashboard } from './components/PremiumDashboard';
import { ApiService } from './services/ApiService';
import { Notification } from './components/Notification';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeProvider } from './contexts/ThemeContext';
import { ClientData, PredictionResponse } from './types/types';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'dashboard'>('form');
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionResponse[]>([]);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiHealth, setApiHealth] = useState<boolean | null>(null);

  useEffect(() => {
    checkApiHealth();
    loadPredictionHistory();
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await ApiService.checkHealth();
      setApiHealth(health.pipeline_loaded || false);
    } catch (error) {
      setApiHealth(false);
      showNotification('error', 'Impossible de se connecter à l\'API de prédiction');
    }
  };

  const loadPredictionHistory = () => {
    const saved = localStorage.getItem('predictionHistory');
    if (saved) {
      setPredictionHistory(JSON.parse(saved));
    }
  };

  const savePredictionToHistory = (result: PredictionResponse) => {
    const newHistory = [result, ...predictionHistory.slice(0, 9)]; // Keep last 10
    setPredictionHistory(newHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
  };

  const handlePrediction = async (clientData: ClientData) => {
    setIsLoading(true);
    try {
      const result = await ApiService.predict(clientData);
      
      if (result.status === 'success') {
        setPredictionResult(result);
        savePredictionToHistory(result);
        showNotification('success', 'Prédiction effectuée avec succès');
      } else {
        showNotification('error', result.message || 'Erreur lors de la prédiction');
      }
    } catch (error) {
      showNotification('error', 'Erreur de communication avec le serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const resetPrediction = () => {
    setPredictionResult(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-500">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Header */}
        <Header 
          currentView={currentView}
          onViewChange={setCurrentView}
          apiHealth={apiHealth}
        />

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 relative z-10">
          <AnimatePresence mode="wait">
            {currentView === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-6"
                  >
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6">
                      <motion.h2 
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Évaluation du Risque Client
                      </motion.h2>
                      <ClientForm 
                        onSubmit={handlePrediction}
                        isLoading={isLoading}
                        onReset={resetPrediction}
                      />
                    </div>
                  </motion.div>

                  {/* Results Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <AnimatePresence mode="wait">
                      {predictionResult ? (
                        <PredictionResults 
                          result={predictionResult}
                          onReset={resetPrediction}
                        />
                      ) : (
                        <motion.div
                          key="waiting"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 text-center"
                        >
                          <motion.div 
                            className="text-gray-400 dark:text-gray-500 mb-4"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </motion.div>
                          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            En attente d'évaluation
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            Complétez le formulaire pour obtenir une analyse du risque de crédit
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PremiumDashboard predictionHistory={predictionHistory} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;