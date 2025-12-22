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
                console.log('Sessions loaded:', data.sessions); // Debug log
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
                console.log('Session loaded:', data); // Debug log
                setCurrentSession(data.session);
                setMessages(data.messages || []);
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
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || loading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setLoading(true);

        // Optimistically add user message to UI
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
                console.log('Chat response:', data); // Debug log
                
                // If new session was created, update current session
                if (!currentSession && data.sessionId) {
                    await loadSessions();
                    setCurrentSession({ sessionId: data.sessionId, threadId: data.threadId });
                }

                // Add assistant response (backend returns 'message' field)
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
                // Remove optimistic user message on error
                setMessages(prev => prev.slice(0, -1));
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Remove optimistic user message on error
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex gap-4 h-[calc(100vh-12rem)]">
                    {/* Sidebar - Sessions List */}
                    <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col">
                        <div className="p-4 border-b dark:border-gray-700">
                            <button
                                onClick={createNewSession}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                            >
                                + New Conversation
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {loadingSessions ? (
                                <div className="p-4 text-center text-gray-500">Loading...</div>
                            ) : sessions.length === 0 ? (
                                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    No conversations yet
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
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-sm truncate dark:text-white">
                                                        {session.title || 'New Conversation'}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatTime(session.lastMessageAt)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => deleteSession(session.sessionId, e)}
                                                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
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

                    {/* Main Chat Area */}
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 border-b dark:border-gray-700">
                            <h2 className="text-xl font-semibold dark:text-white">
                                {currentSession?.title || 'New Conversation'}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Chat with your biblical guide
                            </p>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center max-w-md">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium mb-2 dark:text-white">
                                            Start a Conversation
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
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
                                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                                msg.role === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
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
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
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
                        <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Share what's on your heart..."
                                    className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !inputMessage.trim()}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

