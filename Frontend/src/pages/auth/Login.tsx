import './Login.css'
import Form from '../../components/Form'
import Input from '../../components/Input'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FormValidator } from '../../utils/formValidation'
import Constants from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {

    const {login, error, isLoading} = useLogin();
    let navigate = useNavigate();

    const formSubmission = async () => {
        
        let email = document.getElementById('login-email') as HTMLInputElement;
        let password = document.getElementById('login-pswd') as HTMLInputElement;
        
        const validateEmail = FormValidator.validateEmptyField('login-email', email.value, "Email Address");
        const validatePassword = FormValidator.validateEmptyField('login-pswd', password.value, "Password");
        
        if (validateEmail && validatePassword) {
            //navigate to the Login page
            await login(email.value, password.value);
            if(localStorage.getItem('user')) {
                navigate('/dashboard', { replace: true });
                window.location.reload();
            }
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <div className="login-container">
                {/* <img className="logo" src={Constants.LOGO_FILE_PATH} alt='xl-logo' /> */}
                <Form
                    heading="Sign in to your account"
                    formSubmission={formSubmission}
                    checkbox={false}
                    width={480}
                    height={480}
                    buttonText='Login'>
                    <Input placeholder="Username" icon={faUser} type='text' inputId="login-email" />
                    <Input placeholder="Password" icon={faLock} type='password' inputId="login-pswd" />
                    <p className='no-account
                    ' onClick={() => navigate('/auth/signup')}> Don't have an account? Sign up</p>
                </Form>
            </div>
        </div>

    )
}

export default Login