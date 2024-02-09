import { useState } from 'react';
import { updateProfile } from 'hooks/useProfile';
import { toast } from 'react-toastify';
import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';

import 'components/EditProfile/edit-profile.scss';
import profile_img from 'assets/profile.png';
import genders from 'components/Constants/genders';

const EditProfile = () => {
  // const profile = useProfile();
  const profile = {
    email: 'roberto@test.com',
    firstName: 'test name',
    lastName: 'test last name',
    username: 'test user',
    gender: 'male'
  };
  const [email, setEmail] = useState(profile.email);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [username, setUsername] = useState(profile.username);
  const [gender, setGender] = useState(profile.gender);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateProfile(buildProfileRequest());
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const buildProfileRequest = () => ({
    user: {
      email,
      first_name: firstName,
      last_name: lastName,
      username,
      gender
    }
  });

  return (
    <div className="edit-profile">
      <div className="edit-profile__container">
        <img src={profile_img} alt="avatar" className="edit-profile__avatar" />
        <h1 className="edit-profile__name">cbrum</h1>

        <form className="edit-profile__form" onClick={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            className="edit-profile__input"
            label="email"
            value={email}
            onChange={setEmail}
          />

          <FormInput
            type="text"
            name="first-name"
            className="edit-profile__input"
            label="first-name"
            value={firstName}
            onChange={setFirstName}
          />

          <FormInput
            type="text"
            name="last-name"
            className="edit-profile__input"
            label="last-name"
            value={lastName}
            onChange={setLastName}
          />

          <FormInput
            type="text"
            name="username"
            className="edit-profile__input"
            label="username"
            value={username}
            onChange={setUsername}
          />

          <FormSelect
            id="gender"
            name="gender"
            label="gender"
            options={genders}
            className="edit-profile__input"
            placeholder="select your gender"
            value={gender}
            onChange={setGender}
          />

          <button type="submit" className="edit-profile__submit btn">
            save changes
          </button>

          <button type="button" className="edit-profile__delete-account">
            Delete my TARGET account
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
