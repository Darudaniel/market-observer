import '../styles/containers/Home.css'
import { signInWithGoogle } from '../firebase'
import Stocks from '../components/Stocks'
import { UserAuth } from '../context/AuthContext'
import logo from '../logo.png'

const Home = () => {

    const { user } = UserAuth()

    const {logOut} = UserAuth();  

    const handleSignOut = async () => {
      try {
        await logOut()
      } catch (error) {
        console.error(error)
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
              
              <div className='login'>
                <div className='logo-container'> 
                  <img src={logo} alt="Logo" className='logo-img'/>
                </div>
                <div className='login-message-container'>
                  <h2 className='login-message'>Welcome to Mantisview please join with Google</h2>
                </div>
                <button onClick={signInWithGoogle} className="google-auth-button">
                  <img 
                    src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                    alt="new"
                    className='google-icon'
                  />
                  Sign in with google
                </button>
              </div>
            )}
        </div>
    )
}

export default Home