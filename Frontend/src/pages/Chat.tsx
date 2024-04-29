import {
  Book,
  Settings,
  Bot,
  OctagonAlert
} from "lucide-react"
import SideNav from "@/components/navbar/SideNav"
import { Separator } from "@/components/separator/Separator"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Plus, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button/Button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/card.tsx"
import { Input } from "@/components/input/Input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip/Tooltip"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/dialog/Dialog"
import Loading from "@/components/loading/Loading"


export type Message = {
  role: string;
  message: string;
  sources?: any[];
}

export type Conversation = {
  conversation_id: string;
  name: string;
}

const Chat = () => {
  const { id } = useParams<{ id: string }>()
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversation_id, setConversationId] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = React.useState("")
  const [courseName, setCourseName] = useState("")
  const [bubbles, setBubbles] = useState(false)
  const [reason, setReason] = useState("")
  const [open, setOpen] = useState(false)
  const [sources, setSources] = useState<any[]>([])
  const [loading, setLoading] = useState(true);
  const [loadingFade, setLoadingFade] = useState(false);

  const inputLength = input.trim().length

  const handleSendMessage = async () => {
    setBubbles(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/queries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "question": input,
        "course_id": id,
        "conversation_id": conversation_id
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
          sources: json.sources
        },
      ])


      if (json.conversation_id != conversation_id) {
        setConversationId(json.conversation_id);
        setConversations([{
          conversation_id: json.conversation_id,
          name: input
        }, ...conversations]);
      }
    }
  }

  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).id : null;
  const token = localStorage.getItem('token');


  const getMessages = async (conversation_id: string) => {
    setMessages([]);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/queries/conversations/${conversation_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
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
      setSources(json.sources);
    }
  }

  const getChatHistory = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/queries/${id}/conversations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });

    const json = await response.json();

    if (response.ok) {
      setConversations(json.conversations);
      setCourseName(json.course_name);
    }
  }

  const handleConversationClick = (convo_id: any) => {
    if (conversation_id != convo_id) {
      setConversationId(convo_id);
      getMessages(convo_id);
    }
  }

  const handleSendReport = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "reason": reason,
        "conversation_id": conversation_id
      })
    });

    if (response.ok) {
      console.log('Report sent successfully');
    } else {
      console.log('Report failed');
    }

    setOpen(false);
  }

  const handleNewChat = async () => {
    setMessages([]);
    setConversationId(null);
  }

  useEffect(() => {
    getChatHistory();
    setTimeout(() => {
      setLoadingFade(true)
      setTimeout(() => setLoading(false), 250)
    }, 1000)
  }, [])

  return (
    <div className="flex flex-row">
      <SideNav
        navItems={[
          {
            url: "/dashboard",
            name: "Courses",
            icon: <Book size={24} />,
          },
          // {
          //   url: "/settings",
          //   name: "Settings",
          //   icon: <Settings size={24} />,
          // },
        ]}
      />

      <div className="flex h-screen w-screen">
        <div className="text-white w-1/6 flex-none">
          <>
            <aside className="text-black w-full flex-none h-screen overflow-y-auto p-5">
              <h2 className="text-xl">Chat History</h2>
              <ul>
                <Separator className="my-4" />
                {conversations && conversations.map((conversation: any) => (
                  <li key={conversation.conversation_id} className="mb-2 truncate cursor-pointer" onClick={() => handleConversationClick(conversation.conversation_id)}>
                    {conversation.name}
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
                <CardHeader className="flex flex-row items-center">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-xl font-medium leading-none">{courseName}</p>
                    </div>
                  </div>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="ml-auto rounded-full"
                          onClick={handleNewChat}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">New chat</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={10}>New chat</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>

                <CardContent className="overflow-auto w-full">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex w-max max-w-[50%] flex-col rounded-lg px-3 py-2 text-sm",
                          message.role === "user"
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {message.message}
                        {message.sources && message.role !== "user" && <Separator className="my-4" />}
                        {message.sources && message.role !== "user" && <div className="flex flex-row p-4">
                          {message.sources && message.sources.map((source: any, index: number) => (
                            <a type="_blank" href={source}>Source {index + 1}&nbsp;&nbsp;&nbsp;</a>
                          ))}
                        </div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto p-4">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      if (inputLength === 0) return
                      setMessages([
                        ...messages,
                        {
                          role: "user",
                          message: input,
                        },
                      ])
                      handleSendMessage()
                      setInput("")
                    }}
                    className="flex w-full items-center space-x-2"
                  >
                    <div className="flex w-full items-center space-x-2">
                      <Bot size={32} className={`${bubbles ? "motion-safe:animate-bounce" : ""}`} />
                      <Input
                        id="message"
                        placeholder="Type your message..."
                        className="flex-1"
                        autoComplete="off"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                      />
                      <Button type="submit" size="icon" disabled={inputLength === 0}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                          <OctagonAlert size={32} className="hover:animate-pulse text-red-500" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Course</DialogTitle>
                            <DialogDescription>
                              What is the reason you are reporting this conversation?
                            </DialogDescription>
                            <Input type="text" placeholder="Reason" onChange={(e) => setReason(e.target.value)} />
                            <Button variant="default" className="w-full mt-4 bg-red-500" disabled={conversation_id ? false : true} onClick={handleSendReport}>Send Report</Button>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </form>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loading loadingFade={loadingFade} /> : ''}           
    </div>

  )
}

export default Chat;