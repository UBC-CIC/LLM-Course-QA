import React from 'react';
import './CourseCard.css';
import Button from './Button';

type CourseCardProps = {
    course: string;
    studentNum: number;
    name: string;
    section: string;
    accessCode: string;
    onClick: () => void;
}

const CourseCard = (props: CourseCardProps) => {
    return (
        <div className="course-card">
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
            }}>
                <div className="course-code">{props.course}</div>
                <div className="course-code">{props.accessCode}</div>
            </div>

            <div className="course-section">{props.section}</div>
            <div className="course-name">{props.name}</div>
            <div className="number-of-students">{props.studentNum} students</div>
            <Button
                className='form-button'
                width='100%'
                height={32}
                fontSize={12}
                paddingVertical={5}
                paddingHorizontal={10}
                backgroundColour='black'
                textColour='white'
                borderRadius={4}
                onHoverColour='gray-700'
                disabled={false}
                onDisabledColour='gray-300'
                onClick={props.onClick}>
                View Course
            </Button>
        </div>
    );
};

export default CourseCard;
