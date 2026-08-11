import {useContext} from "react";
import UserContext from "../../context/UserContext";


function Profile() {
  const {user} = useContext(UserContext);

  if(!user) {
    return <h2>Please login to view your profile</h2>
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {user.username}!</p>
    </div>
  )
}

export default Profile