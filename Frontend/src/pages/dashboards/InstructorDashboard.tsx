import CourseCard from "@/components/card/CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';
import React, { useEffect, useState } from 'react';

const InstructorDashboard = () => {
    type CourseData = {
        courseCode: string;
        courseSections: string;
        courseName: string;
    }

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
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        window.location.href = '/upload';
    };

    const sampleData: CourseData[] = [
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        }
    ]

    return (
        <div className='flex flex-row' >
            <SideNav />
            <div className="my-0 mx-auto grid grid-cols-3 gap-24 p-12 overflow-auto h-screen">
                <div >
                    <Button variant={'outline'} className='flex flex-col justify-center rounded-lg shadow-lg w-96 h-52 col-span-1'>
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                        <p className="text-center mt-2">Add Course</p>
                    </Button>
                </div>
                {sampleData.map((course) => (
                    <div>
                        <CourseCard courseCode={course.courseCode} courseSection={course.courseSections} courseName={course.courseName} isInstructor={true} />
                    </div>
                ))}
            </div>

            {/* div container using tailwind that has 4 elements per row */}

        </div>
    );
};

export default InstructorDashboard;