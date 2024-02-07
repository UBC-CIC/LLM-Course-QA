import './Signup.css'
import Form from '../../components/Form'
import Input from '../../components/Input'
import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FormValidator } from '../../utils/formValidation'
import Constants from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import {useSignup} from '../../hooks/useSignup'

const SignUp = () => {

    const { signup, error, isLoading } = useSignup();

    let navigate = useNavigate();

    const formSubmission = () => {

        let firstName = document.getElementById('signup-name') as HTMLInputElement;
        let email = document.getElementById('signup-email') as HTMLInputElement;
        let password = document.getElementById('signup-password') as HTMLInputElement;
        let roleStudent = document.getElementById('role-student') as HTMLInputElement;
        let roleInstructor = document.getElementById('role-instructor') as HTMLInputElement;

        const validateFirstName = FormValidator.validateEmptyField('signup-name', firstName.value, "First Name");
        const validateEmail = FormValidator.validateEmptyField('signup-email', email.value, "Email Address");
        const validatePassword = FormValidator.validateEmptyField('signup-password', password.value, "Password");
        
        if (!roleStudent.checked && !roleInstructor.checked) {
            alert('Please select a role');
            return;
        }

        if (validateEmail && validatePassword) {
            //navigate to the Login page
            signup(firstName.value, email.value, password.value, roleStudent.checked ? 'Student' : 'Instructor');
        }
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
                    checkbox={false}>
                    <Input placeholder="Name" icon={faUser} inputId="signup-name" />
                    <Input placeholder="Username" icon={faEnvelope} inputId="signup-email" />
                    <Input placeholder="Password" icon={faLock} inputId="signup-password" />
                    <div>
                        <label>
                            <input id="role-student" type="radio" name="userType" value="student" /> Student
                        </label>
                        <label>
                            <input id="role-instructor" type="radio" name="userType" value="instructor" /> Instructor
                        </label>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignUp