import { useParams } from "react-router";

function Profile() {

    const { username } = useParams();
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))

    return (
        <>
       <h1>{username} Profile</h1>
        </>
        
    )
}

export default Profile;