export class FormValidator {

    /**
     * Validates if a field is empty and updates the corresponding element with an error message if it is.
     * @param id - The ID of the element to update with the error message.
     * @param value - The value to check if it is empty.
     * @param fieldType - The type of field being validated.
     * @returns True if the value is not empty, false otherwise.
     */
    static validateEmptyField(id: string, value: string, fieldType: string): boolean {
        const isValid = value.trim() !== '';
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) {
            errorElement.textContent = isValid ? '' : fieldType + ' is required';
        }
        return isValid;
    }

    /**
     * Validates an email address and updates the corresponding element with an error message if invalid.
     * @param id - The ID of the element to update with the error message.
     * @param email - The email address to validate.
     * @returns True if the email address is valid, false otherwise.
     */
    static validateEmail(id: string, email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        const errorElement = document.getElementById(`${id}-error`);
        if (errorElement) {
            errorElement.textContent = isValid ? '' : 'Invalid email address';
        }
        return isValid;
    }

    /**
     * Validates a password and updates the corresponding element with an error message if invalid.
     * @param id - The ID of the element to update with the error message.
     * @param password - The password to validate.
     * @returns True if the password is valid, false otherwise.
     */
    static validatePassword(id: string, password: string): boolean {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[^\da-zA-Z]).{8,}$/;
        const isValid = passwordRegex.test(password);
        const errorElement = document.getElementById(`${id}-error`);
        
        if (errorElement) {
            errorElement.textContent = isValid ? '' : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number';
        }
        return isValid;
    }
}