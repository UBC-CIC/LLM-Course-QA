import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './Student.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faComment, faPlus, faSchool, faSection, faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Input from '../../components/Input';

const StudentDashboard = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [courseAccessCode, setCourseAccessCode] = useState('');

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

    const handleJoinCourse = async () => {
        // Perform validation on course inputs

        // Push the new course to the courses list
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        setShowModal(false);

        const response = await fetch('http://127.0.0.1:5000/courses/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                access_code: courseAccessCode,
            }),
        });
        
        const json = await response.json();

        if (response.ok) {
            console.log('Course added successfully');
            console.log(json);
            setCourses([...courses, ...json]);
        }
        setCourseAccessCode('');
        setShowModal(false);
    }

    const redirectToChatPage = (course: any) => {
        // Store the selected course in local storage
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        window.location.href = '/chat';
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
                        onClick={() => redirectToChatPage(course)}
                    />
                ))}
                <div className="add-course" onClick={addCourse}>
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                    <p className="add-course-txt">Join Course</p>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Join Course</h2>
                        <Input placeholder="Access Code" icon={faLock} type='text' inputId="course-name" onChange={(e) => setCourseAccessCode(e.target.value)}/>
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
                            onClick={handleJoinCourse}>
                            Join</Button>
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
