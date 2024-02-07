import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './Instructor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faComment, faPlus, faSchool, faSection } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Input from '../../components/Input';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseSection, setCourseSection] = useState('');

    const getCourses = async () => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        const response = await fetch('http://127.0.0.1:5000/courses/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Courses fetched successfully');
            console.log(json);
            setCourses(json);
        }
    }

    useEffect(() => {
        getCourses();
    }, []);

    const addCourse = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleAddCourse = async () => {
        // Perform validation on course inputs

        // Push the new course to the courses list
        const newCourse = {
            name: courseName,
            description: courseDescription,
            course_code: courseCode,
            section: courseSection,
        };
        setCourses([...courses, newCourse]);
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        console.log(userId)

        const response = await fetch('http://127.0.0.1:5000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                name: courseName, 
                description: courseDescription, 
                course_code: courseCode, 
                course_section: courseSection,
                instructor: userId
            }),
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Course added successfully');
            console.log(json);
        }
        setCourseName('');
        setCourseDescription('');
        setCourseCode('');
        setCourseSection('');
        setShowModal(false);
    }

    const redirectToUploadPage = (course: any) => {
        // Store the selected course in local storage
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        window.location.href = '/upload';
    };

    return (
        <div>
            <Header />
            <div className="dashboard">
                {courses.map((course: any) => (
                    <CourseCard
                        key={course.id}
                        course={course.course_code}
                        name={course.name}
                        section={course.course_section}
                        studentNum={course.student_count}
                        accessCode={course.access_code}
                        onClick={() => redirectToUploadPage(course)}
                    />
                ))}
                <div className="add-course" onClick={addCourse}>
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                    <p className="add-course-txt">Add Course</p>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Course</h2>
                        <Input placeholder="Course Name" icon={faSchool} type='text' inputId="course-name" onChange={(e) => setCourseName(e.target.value)}/>
                        <Input placeholder="Course Code" icon={faCode} type='text' inputId="course-code" onChange={(e) => setCourseCode(e.target.value)}/>
                        <Input placeholder="Course Section" icon={faSection} type='text' inputId="course-section" onChange={(e) => setCourseSection(e.target.value)}/>
                        <Input placeholder="Course Description" icon={faComment} type='text' inputId="course-description" onChange={(e) => setCourseDescription(e.target.value)}/>
                        <Button
                            className='form-button'
                            width='45%'
                            height={48}
                            fontSize={18}
                            paddingVertical={5}
                            paddingHorizontal={10}
                            backgroundColour='error-600'
                            textColour='white'
                            borderRadius={4}
                            onHoverColour='error-700'
                            disabled={false}
                            onDisabledColour='gray-300'
                            onClick={handleCloseModal}>
                            Cancel</Button>
                        <Button
                            className='form-button'
                            width='45%'
                            height={48}
                            fontSize={18}
                            paddingVertical={5}
                            paddingHorizontal={10}
                            backgroundColour='success-600'
                            textColour='white'
                            borderRadius={4}
                            onHoverColour='success-700'
                            disabled={false}
                            onDisabledColour='success-300'
                            onClick={handleAddCourse}>
                            Add</Button>
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorDashboard;
