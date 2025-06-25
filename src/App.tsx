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
        {/* Animated Background Elements - Optimized for mobile */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl sm:blur-3xl"
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
            className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-2xl sm:blur-3xl"
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

        {/* Notification - Fixed positioning for mobile */}
        <AnimatePresence>
          {notification && (
            <div className="fixed top-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-96">
              <Notification
                type={notification.type}
                message={notification.message}
                onClose={() => setNotification(null)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>

        {/* Main Content */}
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 relative z-10">
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
                {/* Mobile-first responsive grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Form Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4 sm:space-y-6 order-1"
                  >
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20 dark:border-gray-700/20 p-4 sm:p-6">
                      <motion.h2 
                        className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 text-center sm:text-left"
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
                    className="space-y-4 sm:space-y-6 order-2 xl:order-2"
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
                          className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20 dark:border-gray-700/20 p-6 sm:p-8 text-center"
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
                            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </motion.div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            En attente d'évaluation
                          </h3>
                          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-2">
                            Complétez le formulaire pour obtenir une analyse du risque de crédit
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Mobile-specific improvements */}
                <div className="mt-6 sm:hidden">
                  {predictionResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <button
                        onClick={resetPrediction}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Nouvelle évaluation
                      </button>
                    </motion.div>
                  )}
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

        {/* Mobile-specific floating action button for quick access */}
        <div className="fixed bottom-4 right-4 sm:hidden z-40">
          <AnimatePresence>
            {currentView === 'form' && !predictionResult && (
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const formElement = document.querySelector('form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Touch-friendly scroll indicator for mobile */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 sm:hidden z-30">
          <AnimatePresence>
            {currentView === 'form' && !predictionResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center text-gray-400 dark:text-gray-500"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
                <span className="text-xs mt-1">Faites défiler</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
