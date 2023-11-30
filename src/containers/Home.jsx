// import LoginButton from '../components/LoginButton'
// import Button from '../components/Button'
import '../styles/containers/Home.css'
import { signInWithGoogle } from '../firebase'
import Stocks from '../components/Stocks'
import { UserAuth } from '../context/AuthContext'

const Home = () => {

    const { user } = UserAuth()

    const test = () => {
        console.log(user)
    }


    return (
        <div className='home'>
            <button type='button' onClick={test}></button>
            {user && (
              <div>
                <p>Bienvenido, {user.displayName}!</p>
                <p>ID: {user.uid}</p>
              </div>
            )}
            {/* <LoginButton />
            <Button /> */}
            <button onClick={signInWithGoogle} className="google-auth-button">
                <img 
                  src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                  alt="new"
									className='google-icon'
                />
                Sign in with google
            </button>
            <Stocks/>
        </div>
    )
}

export default Home