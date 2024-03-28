import { useState, useEffect } from 'react';
import { updateProfile, profile } from 'services/userService';

const useProfile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [email, firstName, lastName, username, gender]);

  const fetchProfile = async () => {
    const { user } = await profile();
    setEmail(user.email);
    setFirstName(user['first_name']);
    setLastName(user['last_name']);
    setUsername(user.username);
    setGender(user.gender);
  };

  return {
    email,
    firstName,
    lastName,
    username,
    gender,
  };
};

export { useProfile, updateProfile };
