// Modified from: https://github.com/shadcn-ui/ui
import * as React from "react"
import { Check, Plus, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/avatar/Avatar"
import { Button } from "@/components/button/Button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/card.tsx"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/command/Command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/dialog/Dialog"
import { Input } from "@/components/input/Input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip/Tooltip"
import { Message } from "../../pages/Chat.tsx"


const users = [
    {
        name: "Olivia Martin",
        email: "m@example.com",
        avatar: "/avatars/01.png",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        avatar: "/avatars/03.png",
    },
    {
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/avatars/05.png",
    },
    {
        name: "Jackson Lee",
        email: "lee@example.com",
        avatar: "/avatars/02.png",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        avatar: "/avatars/04.png",
    },
] as const

type User = (typeof users)[number]

type CardsChatProps = {
    initMessages: Message[];
    courseId: string;
    userId: string;
}

export function CardsChat({ initMessages, courseId, userId }: CardsChatProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])
    const [messages, setMessages] = React.useState<Message[]>(initMessages)

    const [input, setInput] = React.useState("")
    const inputLength = input.trim().length

    const handleSendMessage = async () => {
        // send post to /queries
        const response = await fetch(`http://127.0.0.1:5000/queries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "question": input,
                "course_id": courseId,
                "user_id": userId

            })
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Message sent successfully');
            console.log(json);
            // push the message to the messages array
            setMessages(messages => [
                ...messages,
                {
                    role: "llm",
                    message: json.response,
                },
            ])
        }

    }

    return (
        <div className={'h-full w-full overflow-auto'}>
            <Card className={`w-full h-full flex flex-col`}>
                <CardHeader className="flex flex-row items-center">
                    <div className="flex items-center space-x-4">
                        <div>
                            <p className="text-xl font-medium leading-none">CPEN 491</p>
                        </div>
                    </div>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="ml-auto rounded-full"
                                    onClick={() => setOpen(true)}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">New chat</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={10}>New message</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
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
                        </div>

                    </form>
                </CardFooter>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="gap-0 p-0 outline-none">
                    <DialogHeader className="px-4 pb-4 pt-5">
                        <DialogTitle>New message</DialogTitle>
                        <DialogDescription>
                            Invite a user to this thread. This will create a new group
                            message.
                        </DialogDescription>
                    </DialogHeader>
                    <Command className="overflow-hidden rounded-t-none border-t">
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup className="p-2">
                                {users.map((user) => (
                                    <CommandItem
                                        key={user.email}
                                        className="flex items-center px-2"
                                        onSelect={() => {
                                            if (selectedUsers.includes(user)) {
                                                return setSelectedUsers(
                                                    selectedUsers.filter(
                                                        (selectedUser) => selectedUser !== user
                                                    )
                                                )
                                            }

                                            return setSelectedUsers(
                                                [...users].filter((u) =>
                                                    [...selectedUsers, user].includes(u)
                                                )
                                            )
                                        }}
                                    >
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt="Image" />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                        {selectedUsers.includes(user) ? (
                                            <Check className="ml-auto flex h-5 w-5 text-primary" />
                                        ) : null}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                        {selectedUsers.length > 0 ? (
                            <div className="flex -space-x-2 overflow-hidden">
                                {selectedUsers.map((user) => (
                                    <Avatar
                                        key={user.email}
                                        className="inline-block border-2 border-background"
                                    >
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Select users to add to this thread.
                            </p>
                        )}
                        <Button
                            disabled={selectedUsers.length < 2}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
