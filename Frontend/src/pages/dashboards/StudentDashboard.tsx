import React, { useEffect, useState } from 'react';
import Header from "@/components/header/Header";
import CourseCard from "@/components/card/CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSlidersH, faSignIn } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import { Button } from "@/components/button/Button";

const StudentDashboard = () => {
    const [courses, setCourses] = useState<any[]>([]);
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

    return (
        <div>
            <Header />
            <div className="dashboard-container">
                <Button variant={'outline'}  className='flex flex-col justify-center rounded-lg shadow-lg w-96 h-52 p-6'>
                    <FontAwesomeIcon icon={faSignIn} size="2x" />
                    <p className="text-center mt-2">Join Course</p>
                </Button>
                <CourseCard courseCode="CPEN 491" courseSection="101" courseName="Capstone Design Project" isInstructor={false} />
                <CourseCard courseCode="CPEN 491" courseSection="101" courseName="Capstone Design Project" isInstructor={false} />
            </div>
        </div>
    );
};

export default StudentDashboard;