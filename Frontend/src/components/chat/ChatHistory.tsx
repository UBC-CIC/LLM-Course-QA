import { Separator } from "@/components/separator/Separator"

const messages = [
    {
        body: "What is the grading scheme for this course?",
    },
    {
        body: "How many assignments are there?",
    },
    {
        body: "What is the due date for the first assignment?",
    },
    {
        body: "What is the due date for the second assignment?",
    },
];

const ChatHistory = () => {
    return (
        <aside className="text-black w-64 flex-none h-screen overflow-y-auto p-5">
            <ul>
                {messages.map((item, index) => (
                    <div>
                        <a href="#" className="text-black">
                            <li key={index} className="mb-2 truncate">
                                {item.body}
                            </li>
                        </a>

                        <Separator className="my-4" />
                    </div>


                ))}
            </ul>
        </aside>
    );
};

export default ChatHistory;

