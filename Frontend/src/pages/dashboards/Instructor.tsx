import React from 'react';
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './Student.css';

const InstructorDashboard = () => {
    const redirectToUploadPage = () => {
        window.location.href = '/upload';
    };

    return (
        <div>
            <Header />
            <div className="dashboard">
                <CourseCard course="CPEN 491" studentNum={100} onClick={redirectToUploadPage} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={redirectToUploadPage} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={redirectToUploadPage} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={redirectToUploadPage} />
                <CourseCard course="CPEN 491" studentNum={100} onClick={redirectToUploadPage} />
            </div>
        </div>
    );
};

export default InstructorDashboard;
