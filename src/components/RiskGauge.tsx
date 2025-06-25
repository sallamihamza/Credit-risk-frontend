import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  value: number; // 0-100
  riskClass: number; // 0 or 1
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ value, riskClass }) => {
  const radius = 90;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getGaugeGradient = () => {
    if (riskClass === 0) {
      return 'url(#lowRiskGradient)';
    } else {
      return 'url(#highRiskGradient)';
    }
  };

  const getRiskLevel = () => {
    if (value <= 25) return { label: 'Très Faible', color: '#10B981' };
    if (value <= 50) return { label: 'Faible', color: '#F59E0B' };
    if (value <= 75) return { label: 'Élevé', color: '#F97316' };
    return { label: 'Très Élevé', color: '#EF4444' };
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id="lowRiskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#6EE7B7" />
            </linearGradient>
            <linearGradient id="highRiskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle
            stroke="rgba(156, 163, 175, 0.3)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          {/* Progress circle */}
          <motion.circle
            stroke={getGaugeGradient()}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            filter="url(#glow)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {value.toFixed(1)}%
          </motion.span>
          <motion.span 
            className="text-sm text-gray-600 dark:text-gray-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Probabilité de Risque
          </motion.span>
          <motion.div
            className="mt-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${riskLevel.color}20`,
              color: riskLevel.color,
              border: `1px solid ${riskLevel.color}40`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
          >
            {riskLevel.label}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Risk level indicators */}
      <motion.div 
        className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          { range: "0-25%", label: "Très Faible", color: "#10B981" },
          { range: "25-50%", label: "Faible", color: "#F59E0B" },
          { range: "50-75%", label: "Élevé", color: "#F97316" },
          { range: "75-100%", label: "Très Élevé", color: "#EF4444" }
        ].map((level, index) => (
          <motion.div 
            key={level.range}
            className="flex flex-col items-center space-y-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ backgroundColor: level.color }}
              animate={{ 
                boxShadow: value >= (index * 25) && value < ((index + 1) * 25) 
                  ? `0 0 20px ${level.color}` 
                  : `0 0 0px ${level.color}`
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="text-center">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {level.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {level.range}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};