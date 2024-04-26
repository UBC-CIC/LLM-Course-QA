# Database Schema
**User Schema**

Purpose: This schema contains user login information, their role (MA1, MA2, or MA3), as well as their courses.

Fields:

    UserId: Unique identifier for each user
    Name: User’s name
    Role: User’s defined role (MA1, MA2, or MA3)
    Courses: Stores the courses a user is enrolled in, teaching or administering
    Conversations: Stores the conversations that a user has had with various courses
    Reports: Stores the reports that students have made about the instructor’s course

**Course Schema**

Purpose: This schema contains course information as well as the associated with the course.

Fields:

    CourseId: Unique identifier for the course.
    CourseCode: Course code (eg. CPEN 491)
    CourseSection: Course section (eg. 101)
    CourseName: Course name (eg. Computer Engineering Capstone Design Project)
    Description: Course description
    AccessCode: The access code for MA2 to join the course
    Documents: List of documents that are uploaded to a course
    Conversations: List of conversations that have been held within this course

**Query Schema**

Purpose: The query schema is responsible for storing the conversation history between a user and a course. 

Fields:

    QueryId: Unique identifier for the query
    Question: The question MA1 or MA2 is posing
    Answer: The response provided by the LLM
    Date: The time the query was made
    ConversationId: The conversation a query is associated with

**Document Schema**

Purpose: The document schema is responsible for storing uploaded course documents

Fields:

    DocumentId: Unique identifier for the document
    Name: The name of the document
    CourseId: The id of the course the document belongs to

**Reporting Schema**

Purpose: This schema is responsible for storing information about individual reports made about specific courses

Fields:

    ReportId: Unique identifier of the report
    ConversationId: The id of the conversation that is being reported
    InstructorId: The id of the instructor who is teaching/managing the course
    Reason: The reason for the report describing the issue or feedback

**Conversation Schema**

Purpose: This schema is responsible for storing information about all conversations between a user and course that are held throughout the institution

Fields:

    ConversationId: Unique Identifier of the conversation
    Date: Date of the last message sent in the conversation
    Name: The title of the conversation
    UserId: The id of the user who started the conversation
    CourseId: The id of the course that the conversation is held in
    Queries: List of all the queries within the conversation
    Reports: List of all reports for a conversation
