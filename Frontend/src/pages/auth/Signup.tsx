import './Signup.css'
import Form from '../../components/Form'
import Input from '../../components/Input'
import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FormValidator } from '../../utils/formValidation'
import Constants from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

const SignUp = () => {

    let navigate = useNavigate();

    const formSubmission = () => {

        let firstName = document.getElementById('signup-name') as HTMLInputElement;
        let email = document.getElementById('signup-email') as HTMLInputElement;
        let password = document.getElementById('signup-password') as HTMLInputElement;

        const validateFirstName = FormValidator.validateEmptyField('signup-name', firstName.value, "First Name");
        const validateEmail = FormValidator.validateEmptyField('signup-email', email.value, "Email Address");
        const validatePassword = FormValidator.validateEmptyField('signup-password', password.value, "Password");
        if (validateFirstName && validateEmail && validatePassword) {
            
        }
    }

    const signup = async (email, password) => {
        // const response = await fetch('', {
        //     method: 'POST',
        //     body: JSON.stringify({ email, password }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <div className="signup-container">
                {/* <img className="logo" src={Constants.LOGO_FILE_PATH} alt='xl-logo'/> */}
                <Form
                    heading="Create your account"
                    width={480}
                    height={540}
                    buttonText='Sign Up'
                    formSubmission={formSubmission}
                    checkbox>
                    <Input placeholder="Name" icon={faUser} inputId="signup-name" />
                    <Input placeholder="Email Address" icon={faEnvelope} inputId="signup-email" />
                    <Input placeholder="Password" icon={faLock} inputId="signup-password" />
                </Form>
            </div>
        </div>
    )
}

export default SignUp