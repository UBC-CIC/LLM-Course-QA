import {
    Book,
    OctagonAlert,
    Settings,
    Trash2Icon
} from "lucide-react"
import SideNav from "@/components/navbar/SideNav"
import { Separator } from "@/components/separator/Separator"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/card.tsx"

export type Message = {
    role: string;
    message: string;
}

export type Report = {
    report_id: string;
    name: string;
}

const Reports = () => {
    const { id } = useParams<{ id: string }>()
    const [reports, setReports] = useState<Report[]>([]);
    const [report_id, setReportId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = React.useState("")
    const [courseName, setCourseName] = useState("")
    const [bubbles, setBubbles] = useState(false)
    const [reason, setReason] = useState("")

    const inputLength = input.trim().length

    const handleSendMessage = async () => {
        setBubbles(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/queries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "question": input,
                "course_id": id,
                "user_id": userId,
                "report_id": report_id
            })
        });

        const json = await response.json();

        setBubbles(false);

        if (response.ok) {
            setMessages(messages => [
                ...messages,
                {
                    role: "llm",
                    message: json.response,
                },
            ])

            if (json.report_id != report_id) {
                setReportId(json.report_id);
                setReports([{
                    report_id: json.report_id,
                    name: input
                }, ...reports]);
            }
        }
    }

    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    const getReportConversation = async (report_id: string) => {
        setMessages([]);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/queries/conversations/${report_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const msgs: Message[] = [];
        const json = await response.json();

        if (response.ok) {
            json.queries.forEach((message: any) => {
                msgs.push({
                    role: "user",
                    message: message.question
                },
                    {
                        role: "llm",
                        message: message.answer
                    }
                );
            });

            setMessages(msgs);
        }
    }

    const getReports = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/reports/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (response.ok) {
            setReports(json);
        }
    }

    const handleReportClick = (convo_id: string, course_code: string, reason: string) => {
        if (report_id != convo_id) {
            setReportId(convo_id);
            setCourseName(course_code);
            setReason(reason);
            getReportConversation(convo_id);
        }
    }

    const deleteReport = (report_id: string) => async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/reports/${report_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            console.log('Report deleted successfully');
            getReports();
            setCourseName("");
            setReason("");
            setMessages([]);
        } else {
            console.error('Failed to delete report');
        }
    }

    useEffect(() => {
        getReports();
    }, [])

    return (
        <div className="flex flex-row">
            <SideNav navItems={[
                {
                    url: "/dashboard",
                    name: "Courses",
                    icon: <Book size={24} />,
                },
                {
                    url: "/reports",
                    name: "Reports",
                    icon: <OctagonAlert size={24} />,
                },
                {
                    url: "/settings",
                    name: "Settings",
                    icon: <Settings size={24} />,
                },
            ]} />

            <div className="flex h-screen w-screen">
                <div className="text-white w-64 flex-none">
                    <>
                        <aside className="text-black w-64 flex-none h-screen overflow-y-auto p-5">
                            <h2 className="text-xl">Reports</h2>
                            <ul>
                                <Separator className="my-4" />
                                {reports && reports.map((report: any) => (
                                    <li key={report.conversation_id} className="mb-2 truncate cursor-pointer">
                                        <div className="flex flex-row">
                                            <p className="w-10/12 truncate" onClick={() => handleReportClick(report.conversation_id, report.course_code, report.reason)}>{report.reason}</p>
                                            <Trash2Icon className="ml-auto text-red-600 hover:animate-pulse" onClick={deleteReport(report.report_id)}/>
                                        </div>
                                        <Separator className="my-4" />
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </>
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="flex-grow overflow-auto">
                        {/* Modified from: https://github.com/shadcn-ui/ui */}
                        <div className={'h-full w-full overflow-auto'}>
                            <Card className={`w-full h-full flex flex-col`}>
                                <CardHeader className="flex flex-row items-center ">
                                    <div className="flex items-center space-x-4 w-full">
                                        {reason && <div className="w-full">
                                            <p className="text-xl font-medium leading-none mb-4">{courseName}</p>
                                            <p className="text-md leading-none mb-4 leading-6"><strong>Report Reason: </strong>{reason}</p>
                                            <Separator className="my-4 w-full" />
                                        </div>}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 overflow-auto">
                                    <div className="space-y-4">
                                        {messages && messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                                    message.role === "user"
                                                        ? "ml-auto bg-primary text-primary-foreground"
                                                        : "bg-muted"
                                                )}
                                            >
                                                {message.message}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Reports;