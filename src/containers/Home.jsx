// import LoginButton from '../components/LoginButton'
// import LogoutButton from '../components/LogoutButton'
import '../styles/containers/Home.css'
import { signInWithGoogle } from '../firebase'
import Stocks from '../components/Stocks'

const Home = () => {
    return (
        <div>
            {/* <LoginButton />
            <LogoutButton /> */}
            <button onClick={signInWithGoogle} className="google-auth-button">
                Sign in with google
            </button>
            <Stocks/>
        </div>
    )
}

export default Home