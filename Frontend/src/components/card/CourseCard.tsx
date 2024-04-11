// react card that takes in a title, image, and description
import { Button } from '../button/Button';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

type CardProps = {
    courseCode: string;
    courseSection: string;
    courseName: string;
    isInstructor: boolean;
    courseId: string;
}

const CourseCard = (props: CardProps) => {
    return (
        <div className='rounded-lg shadow-lg w-96 h-52 p-6'>
            <h1 className='text-xl font-bold'>{props.courseCode} - {props.courseSection}</h1>
            <p className='text-md font-normal mt-1'>{props.courseName}</p>

            {props.isInstructor ?
                <div className='flex justify-between mt-6'>
                    <Link to={`/chat/${props.courseId}`} className='w-1/3 m-1'>
                        <Button variant='default' className='w-full bg-blue-700'>
                            <QuestionAnswerIcon />
                        </Button>
                    </Link>
                    <Link to={`/upload/${props.courseId}`} className='w-1/3 m-1'>
                        <Button variant='default' className='w-full bg-blue-700'>
                            <UploadFileIcon />
                        </Button>
                    </Link>
                    <Link to={`/users/${props.courseId}`} className='w-1/3 m-1'>
                        <Button variant='default' className='w-full bg-blue-700'>
                            <GroupAddIcon />
                        </Button>
                    </Link>
                </div>
                :
                <Link to={`/chat/${props.courseId}`}>
                    <Button variant='default' size={"icon"} className='w-full mt-10 bg-blue-700'>
                        <QuestionAnswerIcon />
                    </Button>
                </Link>
            }
        </div>
    );
};

export default CourseCard;