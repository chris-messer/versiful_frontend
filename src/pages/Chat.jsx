import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.dev.versiful.io';

export default function Chat() {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingSessions, setLoadingSessions] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const messagesEndRef = useRef(null);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin');
            return;
        }
        loadSessions();
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadSessions = async () => {
        setLoadingSessions(true);
        try {
            const response = await fetch(`${API_BASE}/chat/sessions`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Sessions loaded:', data.sessions);
                setSessions(data.sessions || []);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error loading sessions:', response.statusText, errorData);
            }
        } catch (error) {
            console.error('Error loading sessions:', error);
        } finally {
            setLoadingSessions(false);
        }
    };

    const loadSession = async (sessionId) => {
        try {
            const response = await fetch(`${API_BASE}/chat/sessions/${sessionId}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Session loaded:', data);
                setCurrentSession(data.session);
                setMessages(data.messages || []);
                setShowSidebar(false); // Close sidebar on mobile after selection
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error loading session:', response.statusText, errorData);
            }
        } catch (error) {
            console.error('Error loading session:', error);
        }
    };

    const createNewSession = async () => {
        setCurrentSession(null);
        setMessages([]);
        setInputMessage('');
        setShowSidebar(false); // Close sidebar on mobile
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || loading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setLoading(true);

        const tempUserMsg = {
            role: 'user',
            content: userMessage,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempUserMsg]);

        try {
            const response = await fetch(`${API_BASE}/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: userMessage,
                    sessionId: currentSession?.sessionId
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Chat response:', data);
                
                if (!currentSession && data.sessionId) {
                    await loadSessions();
                    setCurrentSession({ sessionId: data.sessionId, threadId: data.threadId });
                }

                const assistantMsg = {
                    role: 'assistant',
                    content: data.message,
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, assistantMsg]);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error sending message:', response.statusText, errorData);
                alert(`Failed to send message: ${errorData.error || response.statusText}`);
                setMessages(prev => prev.slice(0, -1));
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setLoading(false);
        }
    };

    const deleteSession = async (sessionId, e) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this conversation?')) return;

        try {
            const response = await fetch(`${API_BASE}/chat/sessions/${sessionId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setSessions(prev => prev.filter(s => s.sessionId !== sessionId));
                if (currentSession?.sessionId === sessionId) {
                    setCurrentSession(null);
                    setMessages([]);
                }
            }
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="h-full flex flex-col md:flex-row">
                {/* Mobile Header with Menu Button */}
                <div className="md:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-semibold dark:text-white">Versiful</h1>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                {/* Sidebar - Sessions List */}
                <div className={`
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                    fixed md:relative inset-y-0 left-0 z-30
                    w-80 md:w-72 lg:w-80
                    bg-white dark:bg-gray-800 
                    border-r dark:border-gray-700
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${showSidebar ? 'shadow-xl' : ''}
                `}>
                    {/* Sidebar Header */}
                    <div className="p-4 border-b dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold dark:text-white">Conversations</h2>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <button
                            onClick={createNewSession}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm"
                        >
                            + New Conversation
                        </button>
                    </div>

                    {/* Sessions List */}
                    <div className="flex-1 overflow-y-auto">
                        {loadingSessions ? (
                            <div className="p-4 text-center text-gray-500">Loading...</div>
                        ) : sessions.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                                No conversations yet.<br />Start your first one!
                            </div>
                        ) : (
                            <div className="space-y-1 p-2">
                                {sessions.map((session) => (
                                    <div
                                        key={session.sessionId}
                                        onClick={() => loadSession(session.sessionId)}
                                        className={`p-3 rounded-lg cursor-pointer transition-all group ${
                                            currentSession?.sessionId === session.sessionId
                                                ? 'bg-blue-100 dark:bg-blue-900'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm truncate dark:text-white">
                                                    {session.title || 'New Conversation'}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {formatTime(session.lastMessageAt)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => deleteSession(session.sessionId, e)}
                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity flex-shrink-0"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Overlay for mobile sidebar */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={() => setShowSidebar(false)}
                    />
                )}

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
                    {/* Chat Header - Desktop only */}
                    <div className="hidden md:flex p-4 border-b dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold dark:text-white">
                                {currentSession?.title || 'New Conversation'}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Chat with your biblical guide
                            </p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center max-w-md px-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium mb-2 dark:text-white">
                                        Start a Conversation
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Share what's on your heart, and receive compassionate biblical guidance.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 py-2 md:px-4 md:py-3 ${
                                            msg.role === 'user'
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap text-sm md:text-base break-words">{msg.content}</p>
                                        <p className={`text-xs mt-1 ${
                                            msg.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                            {formatTime(msg.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={sendMessage} className="p-3 md:p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Share what's on your heart..."
                                className="flex-1 px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !inputMessage.trim()}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
                            >
                                <span className="hidden sm:inline">Send</span>
                                <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
