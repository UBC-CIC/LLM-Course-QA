import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './Student.css';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState<any>();

    const getCourses = async () => {
        const response = await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  }),
        })

        const json = await response.json()

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            console.log(localStorage.getItem('user'))
            console.log((json))
        }
    }

    useEffect(() => {
        getCourses();
    }, []);

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
                        course={course.name}
                        studentNum={course.students.length}
                        onClick={() => redirectToUploadPage(course)}
                    />
                ))}
            </div>
        </div>
    );
};

export default InstructorDashboard;
