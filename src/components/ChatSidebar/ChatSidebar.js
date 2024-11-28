import { faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ChatSidebar = ({ chatId, generatingResponse }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const loadChatList = async () => {
      try {
        const response = await fetch('/api/chat/getChatList');
        const json = await response.json();
        setChatList(json?.chats || []);
      } catch (error) {
        console.error('Failed to load chat list:', error);
      }
    };
    loadChatList();
  }, [chatId]);

  return (
    <nav
      className="flex flex-col h-full text-white bg-slate-900"
      aria-label="Chat navigation"
    >
      <div className="sticky top-0 bg-slate-900 z-10">
        <Link
          href="/chat"
          className={`side-menu-item bg-emerald-500 hover:bg-emerald-600 ${
            generatingResponse ? 'pointer-events-none opacity-50' : ''
          }`}
          aria-disabled={generatingResponse}
          aria-label="Start new chat"
          tabIndex={generatingResponse ? -1 : 0}
        >
          <FontAwesomeIcon
            icon={faPlus}
            aria-hidden="true"
            className="w-4 h-4"
          />
          <span>New chat</span>
        </Link>
      </div>

      <div
        className="flex-1 overflow-auto"
        role="navigation"
        aria-label="Chat history"
      >
        <ul className="list-none p-0 m-0">
          {chatList.map(chat => (
            <li key={chat._id}>
              <Link
                href={`/chat/${chat._id}`}
                className={`side-menu-item ${
                  chatId === chat._id ? 'bg-gray-700 hover:bg-gray-700' : ''
                } ${
                  generatingResponse ? 'pointer-events-none opacity-50' : ''
                }`}
                aria-current={chatId === chat._id ? 'page' : undefined}
                aria-disabled={generatingResponse}
                tabIndex={generatingResponse ? -1 : 0}
              >
                <FontAwesomeIcon
                  icon={faMessage}
                  aria-hidden="true"
                  className="w-4 h-4"
                />
                <span>{chat.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 bg-slate-900 z-10">
        <Link
          href="/api/auth/logout"
          className="side-menu-item bg-red-500 hover:bg-red-600"
          aria-label="Logout of chat application"
          tabIndex={0}
        >
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};
