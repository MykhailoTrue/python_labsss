import axios from './axiosConfig';

export const getAthletes = async () => {
  const response = await axios.get('/athletes');
  return response.data;
};

export const getMedicalRecords = async (athleteId) => {
  const response = await axios.get(`/athletes/${athleteId}/medical_records`);
  return response.data;
};

export const createMedicalRecord = async (athleteId, recordData) => {
  const response = await axios.post(
    `/athletes/${athleteId}/medical_records`,
    recordData
  );
  return response.data;
};

export const getTrainingSessions = async (athleteId) => {
  const response = await axios.get(`/athletes/${athleteId}/training_sessions`);
  return response.data;
};

export const createTrainingSession = async (athleteId, sessionData) => {
  const response = await axios.post(
    `/athletes/${athleteId}/training_sessions`,
    sessionData
  );
  return response.data;
};
