import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getAthletes,
  getMedicalRecords,
  getTrainingSessions,
} from '../api/athleteApi';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
} from '@mui/material';

const MainPage = () => {
  const { logout } = useContext(AuthContext);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);

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

          <Typography variant="h5">Training Sessions</Typography>
          <List>
            {trainingSessions.map((session) => (
              <ListItem key={session.id}>
                {session.description} - {session.duration} mins
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
};

export default MainPage;
