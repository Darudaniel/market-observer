import '../styles/containers/Home.css'
import { signInWithGoogle } from '../firebase'
import Stocks from '../components/Stocks'
import { UserAuth } from '../context/AuthContext'

const Home = () => {

    const { user } = UserAuth()

    const {logOut} = UserAuth();  

    const handleSignOut = async () => {
      try {
        await logOut()
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div className='home-container'>
            {user ? (
              <div className='home'>
                <Stocks/>
                <button className="logout-button" type='button' onClick={handleSignOut}>Log out</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="google-auth-button">
                <img 
                  src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                  alt="new"
                  className='google-icon'
                />
                Sign in with google
              </button>
            )}
        </div>
    )
}

export default Home