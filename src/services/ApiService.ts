const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:5000/api/v1'
  : 'https://web-production-e461.up.railway.app/api/v1';

export class ApiService {
  static async predict(clientData: any) {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getModelInfo() {
    const response = await fetch(`${API_BASE_URL}/model/info`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getFeatures() {
    const response = await fetch(`${API_BASE_URL}/features`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getExample() {
    const response = await fetch(`${API_BASE_URL}/example`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}
