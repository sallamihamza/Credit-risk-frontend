import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Shield, Wifi, WifiOff, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentView: 'form' | 'dashboard';
  onViewChange: (view: 'form' | 'dashboard') => void;
  apiHealth: boolean | null;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, apiHealth }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header 
      className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-white/20 dark:border-gray-700/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CreditRisk AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Système de Prédiction Premium</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <motion.button
              onClick={() => onViewChange('form')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentView === 'form'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" />
              <span>Évaluation</span>
            </motion.button>
            <motion.button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </motion.button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.div>
            </motion.button>

            {/* API Status */}
            <motion.div 
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium backdrop-blur-sm ${
                apiHealth === true
                  ? 'bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : apiHealth === false
                  ? 'bg-red-100/80 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-gray-100/80 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ 
                  scale: apiHealth === true ? [1, 1.2, 1] : 1,
                }}
                transition={{ 
                  duration: 2,
                  repeat: apiHealth === true ? Infinity : 0,
                }}
              >
                {apiHealth === true ? (
                  <Wifi className="w-4 h-4" />
                ) : (
                  <WifiOff className="w-4 h-4" />
                )}
              </motion.div>
              <span>
                {apiHealth === true 
                  ? 'API Connectée' 
                  : apiHealth === false 
                  ? 'API Déconnectée'
                  : 'Vérification...'
                }
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};