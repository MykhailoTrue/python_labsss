import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getAthletes,
  getMedicalRecords,
  getTrainingSessions,
  createMedicalRecord,
  createTrainingSession,
} from '../api/athleteApi';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  TextField,
  Box,
} from '@mui/material';

const MainPage = () => {
  const { logout } = useContext(AuthContext);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [recordDetails, setRecordDetails] = useState('');
  const [sessionDetails, setSessionDetails] = useState({
    date: '',
    duration: '',
    description: '',
  });

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    const data = await getAthletes();
    setAthletes(data);
  };

  const fetchMedicalRecords = async (athleteId) => {
    const data = await getMedicalRecords(athleteId);
    setMedicalRecords(data);
  };

  const fetchTrainingSessions = async (athleteId) => {
    const data = await getTrainingSessions(athleteId);
    setTrainingSessions(data);
  };

  const handleSelectAthlete = (athlete) => {
    setSelectedAthlete(athlete);
    fetchMedicalRecords(athlete.id);
    fetchTrainingSessions(athlete.id);
  };

  const handleCreateMedicalRecord = async () => {
    try {
      await createMedicalRecord(selectedAthlete.id, { details: recordDetails });
      setRecordDetails('');
      fetchMedicalRecords(selectedAthlete.id); // Оновити список після додавання
    } catch (error) {
      console.error('Error creating medical record:', error);
    }
  };

  const handleCreateTrainingSession = async () => {
    try {
      const { date, duration, description } = sessionDetails;
      await createTrainingSession(selectedAthlete.id, {
        session_date: date,
        duration: parseInt(duration),
        description,
      });
      setSessionDetails({ date: '', duration: '', description: '' });
      fetchTrainingSessions(selectedAthlete.id); // Оновити список після додавання
    } catch (error) {
      console.error('Error creating training session:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Main Page
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
      <List>
        {athletes.map((athlete) => (
          <ListItem
            button
            key={athlete.id}
            onClick={() => handleSelectAthlete(athlete)}
          >
            {athlete.name}
          </ListItem>
        ))}
      </List>

      {selectedAthlete && (
        <div>
          <Typography variant="h5">Medical Records</Typography>
          <List>
            {medicalRecords.map((record) => (
              <ListItem key={record.id}>{record.details}</ListItem>
            ))}
          </List>
          <Box mt={2}>
            <TextField
              label="New Medical Record"
              value={recordDetails}
              onChange={(e) => setRecordDetails(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateMedicalRecord}
              sx={{ mt: 1 }}
            >
              Add Medical Record
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5">Training Sessions</Typography>
          <List>
            {trainingSessions.map((session) => (
              <ListItem key={session.id}>
                {session.description} - {session.duration} mins on{' '}
                {session.session_date}
              </ListItem>
            ))}
          </List>
          <Box mt={2}>
            <TextField
              label="Date"
              type="date"
              value={sessionDetails.date}
              onChange={(e) =>
                setSessionDetails({ ...sessionDetails, date: e.target.value })
              }
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Duration (mins)"
              type="number"
              value={sessionDetails.duration}
              onChange={(e) =>
                setSessionDetails({
                  ...sessionDetails,
                  duration: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Description"
              value={sessionDetails.description}
              onChange={(e) =>
                setSessionDetails({
                  ...sessionDetails,
                  description: e.target.value,
                })
              }
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTrainingSession}
              sx={{ mt: 1 }}
            >
              Add Training Session
            </Button>
          </Box>
        </div>
      )}
    </Container>
  );
};

export default MainPage;
