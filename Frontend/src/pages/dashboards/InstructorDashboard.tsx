import CourseCard from "@/components/card/CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';

const InstructorDashboard = () => {
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
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
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
            <SideNav/>
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