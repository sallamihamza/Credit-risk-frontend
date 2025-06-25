export interface ClientData {
  person_age: number;
  person_gender: string;
  person_education: string;
  person_income: number;
  person_emp_exp: number;
  person_home_ownership: string;
  loan_amnt: number;
  loan_intent: string;
  loan_int_rate: number;
  loan_percent_income: number;
  cb_person_cred_hist_length: number;
  credit_score: number;
  previous_loan_defaults_on_file: string;
}

export interface PredictionResult {
  risk_class: number;
  risk_label: string;
  probability_score: number;
  confidence_level: string;
}

export interface ModelInfo {
  model_name: string;
  model_version: string;
  features_used: number;
}

export interface PredictionResponse {
  status: string;
  prediction: PredictionResult;
  model_info: ModelInfo;
  timestamp: string;
  processing_time_ms: number;
}

export interface ApiHealthResponse {
  status: string;
  model_loaded: boolean;
  preprocessor_loaded: boolean;
  timestamp: string;
}