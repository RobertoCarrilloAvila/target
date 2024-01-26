import "components/Profile/Profile.scss";
import profile from "assets/profile.png";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__container">
        <img src={profile} alt="avatar" className="profile__avatar" />
        <h1 className="profile__name">cbrum</h1>
        <div className="profile__actions">
          <span className="profile__edit">Edit</span>
          <span className="profile__slash">/</span>
          <span className="profile__logout">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
