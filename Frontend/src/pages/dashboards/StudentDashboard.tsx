import CourseCard from "@/components/card/CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';

const StudentDashboard = () => {
    type CourseData = {
        courseCode: string;
        courseSections: string;
        courseName: string;
    }

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
            <div className="dashboard-container">
                <Button variant={'outline'} className='flex flex-col justify-center rounded-lg shadow-lg w-96 h-52 p-6'>
                    <FontAwesomeIcon icon={faSignIn} size="2x" />
                    <p className="text-center mt-2">Join Course</p>
                </Button>
                {sampleData.map((course) => (
                    <CourseCard courseCode={course.courseCode} courseSection={course.courseSections} courseName={course.courseName} isInstructor={false} />
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;