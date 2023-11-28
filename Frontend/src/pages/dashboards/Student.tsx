import React from 'react';
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './Student.css';

const StudentDashboard = () => {
    return (
        <div>
            <Header />
            <div className="dashboard">
                <CourseCard course="CPEN 491" studentNum={100} onClick={() => { }} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={() => { }} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={() => { }} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={() => { }} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={() => { }} />
            </div>
        </div>
    );
};

export default StudentDashboard;
