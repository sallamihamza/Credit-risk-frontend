import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Home, GraduationCap, Calendar, CreditCard, RotateCcw, Sparkles } from 'lucide-react';
import { ClientData } from '../types/types';

interface ClientFormProps {
  onSubmit: (data: ClientData) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, isLoading, onReset }) => {
  const [formData, setFormData] = useState<ClientData>({
    person_age: 30,
    person_gender: 'Male',
    person_education: 'Bachelor',
    person_income: 50000,
    person_emp_exp: 5,
    person_home_ownership: 'RENT',
    loan_amnt: 15000,
    loan_intent: 'PERSONAL',
    loan_int_rate: 10.5,
    loan_percent_income: 0.3,
    cb_person_cred_hist_length: 7,
    credit_score: 680,
    previous_loan_defaults_on_file: 'No'
  });

  const handleInputChange = (field: keyof ClientData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      person_age: 30,
      person_gender: 'Male',
      person_education: 'Bachelor',
      person_income: 50000,
      person_emp_exp: 5,
      person_home_ownership: 'RENT',
      loan_amnt: 15000,
      loan_intent: 'PERSONAL',
      loan_int_rate: 10.5,
      loan_percent_income: 0.3,
      cb_person_cred_hist_length: 7,
      credit_score: 680,
      previous_loan_defaults_on_file: 'No'
    });
    onReset();
  };

  const formSections = [
    {
      title: "Informations Personnelles",
      icon: User,
      color: "text-blue-600",
      fields: [
        {
          label: "Âge",
          type: "number",
          field: "person_age" as keyof ClientData,
          min: 18,
          max: 100,
          cols: 1
        },
        {
          label: "Genre",
          type: "select",
          field: "person_gender" as keyof ClientData,
          options: [
            { value: "Male", label: "Homme" },
            { value: "Female", label: "Femme" }
          ],
          cols: 1
        },
        {
          label: "Niveau d'Éducation",
          type: "select",
          field: "person_education" as keyof ClientData,
          options: [
            { value: "High School", label: "Lycée" },
            { value: "Bachelor", label: "Licence" },
            { value: "Master", label: "Master" },
            { value: "Doctorate", label: "Doctorat" }
          ],
          cols: 1
        },
        {
          label: "Expérience Professionnelle (années)",
          type: "number",
          field: "person_emp_exp" as keyof ClientData,
          min: 0,
          max: 50,
          cols: 1
        }
      ]
    },
    {
      title: "Informations Financières",
      icon: DollarSign,
      color: "text-green-600",
      fields: [
        {
          label: "Revenu Annuel (€)",
          type: "number",
          field: "person_income" as keyof ClientData,
          min: 0,
          cols: 1
        },
        {
          label: "Score de Crédit",
          type: "number",
          field: "credit_score" as keyof ClientData,
          min: 300,
          max: 850,
          cols: 1
        },
        {
          label: "Historique de Crédit (années)",
          type: "number",
          field: "cb_person_cred_hist_length" as keyof ClientData,
          min: 0,
          max: 50,
          cols: 2
        }
      ]
    },
    {
      title: "Situation de Logement",
      icon: Home,
      color: "text-purple-600",
      fields: [
        {
          label: "Propriété du Logement",
          type: "select",
          field: "person_home_ownership" as keyof ClientData,
          options: [
            { value: "RENT", label: "Locataire" },
            { value: "OWN", label: "Propriétaire" },
            { value: "MORTGAGE", label: "Hypothèque" },
            { value: "OTHER", label: "Autre" }
          ],
          cols: 1
        },
        {
          label: "Défauts de Paiement Précédents",
          type: "select",
          field: "previous_loan_defaults_on_file" as keyof ClientData,
          options: [
            { value: "No", label: "Non" },
            { value: "Yes", label: "Oui" }
          ],
          cols: 1
        }
      ]
    },
    {
      title: "Détails du Prêt",
      icon: CreditCard,
      color: "text-orange-600",
      fields: [
        {
          label: "Montant du Prêt (€)",
          type: "number",
          field: "loan_amnt" as keyof ClientData,
          min: 0,
          cols: 1
        },
        {
          label: "Taux d'Intérêt (%)",
          type: "number",
          field: "loan_int_rate" as keyof ClientData,
          min: 0,
          max: 30,
          step: 0.1,
          cols: 1
        },
        {
          label: "Intention du Prêt",
          type: "select",
          field: "loan_intent" as keyof ClientData,
          options: [
            { value: "PERSONAL", label: "Personnel" },
            { value: "EDUCATION", label: "Éducation" },
            { value: "MEDICAL", label: "Médical" },
            { value: "VENTURE", label: "Investissement" },
            { value: "HOMEIMPROVEMENT", label: "Amélioration Domicile" },
            { value: "DEBTCONSOLIDATION", label: "Consolidation de Dettes" }
          ],
          cols: 1
        },
        {
          label: "Ratio Prêt/Revenu",
          type: "number",
          field: "loan_percent_income" as keyof ClientData,
          min: 0,
          max: 1,
          step: 0.01,
          cols: 1
        }
      ]
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {formSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="space-y-4"
        >
          <motion.div 
            className="flex items-center space-x-3 mb-6"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className={`p-2 bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <section.icon className={`w-5 h-5 ${section.color}`} />
            </motion.div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {section.title}
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field, fieldIndex) => (
              <motion.div
                key={field.field}
                className={field.cols === 2 ? "md:col-span-2" : ""}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIndex * 0.1 + fieldIndex * 0.05 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <motion.select
                    value={formData[field.field] as string}
                    onChange={(e) => handleInputChange(field.field, e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    whileFocus={{ scale: 1.02 }}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </motion.select>
                ) : (
                  <motion.input
                    type={field.type}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.field]}
                    onChange={(e) => handleInputChange(field.field, 
                      field.type === "number" ? parseFloat(e.target.value) : e.target.value
                    )}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Analyse en cours...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyser le Risque</span>
            </>
          )}
        </motion.button>
        
        <motion.button
          type="button"
          onClick={resetForm}
          className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-all duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Réinitialiser</span>
        </motion.button>
      </motion.div>
    </form>
  );
};