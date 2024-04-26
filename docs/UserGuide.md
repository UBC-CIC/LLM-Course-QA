# User Guide
**Before Continuing with this User Guide, please make sure you have deployed the application**
- [Deployment Guides](./DeploymentGuide.md)

| Index                                       | Description                                                               |
| :------------------------------------------ | :---------------------------------------------------------------- |
| [Authentication Page](#authentication-page) | Logging in and signing up                                                |
| [Admin View](#admin-view)                   | Demonstrates functionalities when logged in as an Admin                   |
| [Instructor View](#instructor-view)         | Demonstrates functionalities when logged in as an Instructor              |
| [Student View](#student-view)               | Demonstrates functionalities when logged in as a Student                  |


## Authentication Page
**Signup Screen**

The first user who signs up is granted "Admin" privileges. Subsequent users are registered as "Students" to ensure they have the lowest permissions.
![Sign Up Page](images/signup.png)

Once the user has signed up, they must enter the verification code sent to the registered email.
![Verification Popup](images/verify.png)

**Login Screen**


After successfully signing up and verifying their email, the user can login using their credentials.
![Verification Popup](images/login.png)

## Admin View
**Courses Screen**

Upon signing in with an "Admin" account, the admin can view all the courses offered at the institution.
![Admin Courses Page](images/admin-courses.png)

Clicking on the button in the "Action" column allows the user to edit the selected course.
![Edit Course Page](images/edit-course.png)

Clicking on the "Plus" button at the top right corner allows the user to create a new course, and assign an instructor to teach it.
![Create Course Page](images/admin-create-course.png)

**Institution Users Screen**

After clicking on the "Users" tab on the side navigation bar, the admin can see all of the users that are part of the institution.
![Institution Users Page](images/institution-users.png)

The admin can change the role of a user by clicking on the button at the end of the user row and selecting a new role. Users who are initally signed up as students but should be instructors or admins can have their roles elevated here.
![Institution Users Page](images/edit-role.png)

## Instructor View
## Student View


