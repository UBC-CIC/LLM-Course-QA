import { Separator } from "@/components/separator/Separator"

const messages = [
    {
        body: "Is the final project due on March 25th?",
    },
];

const ChatHistory = () => {
    return (
        <>
        <aside className="text-black w-64 flex-none h-screen overflow-y-auto p-5">
            
            <ul>
                <h2 className="text-xl">Chat History</h2>
                <Separator className="my-4" />
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
        </>
    );
};

export default ChatHistory;

