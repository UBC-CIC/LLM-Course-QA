import {
  Book,
  Settings,
  SquareUser,
} from "lucide-react"

import SideNav from "@/components/navbar/SideNav"
import ChatHistory from "@/components/chat/ChatHistory"
import { CardsChat } from "../components/chat/Chat"

const Chat = () => {
  return (
    <div className="flex flex-row">
      <SideNav
        navItems={[
          {
            url: "/",
            name: "Courses",
            icon: <Book size={24} />,
          },
          {
            url: "/settings",
            name: "Settings",
            icon: <Settings size={24} />,
          },
        ]}
      />

      <div className="flex h-screen w-screen">
        <div className="text-white w-64 flex-none">
          <ChatHistory />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex-grow overflow-auto">
            <CardsChat className="h-full w-full" />
          </div>
        </div>
      </div>

    </div>

  )
}

export default Chat;