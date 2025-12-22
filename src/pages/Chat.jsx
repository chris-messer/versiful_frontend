import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.dev.versiful.io';

export default function Chat() {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingSessions, setLoadingSessions] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
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

    useEffect(() => {
        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);

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
                setSessions(data.sessions || []);
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
                setCurrentSession(data.session);
                setMessages(data.messages || []);
                setShowSidebar(false); // Close sidebar on mobile after selecting
            }
        } catch (error) {
            console.error('Error loading session:', error);
        }
    };

    const createNewSession = async () => {
        setCurrentSession(null);
        setMessages([]);
        setInput('');
        setShowSidebar(false); // Close sidebar on mobile
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

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
                console.error('Error sending message:', errorData);
                setMessages(prev => prev.slice(0, -1));
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
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
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 flex overflow-hidden bg-white dark:bg-gray-950 pt-14 sm:pt-16">
            {/* Sidebar - Hidden on mobile by default, slides in from left */}
            <aside className={`
                ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                fixed md:relative
                inset-y-0 left-0
                z-40
                w-64
                transition-transform duration-300 ease-in-out
                border-r border-gray-200 dark:border-gray-800 
                flex flex-col overflow-hidden
                bg-gray-50 dark:bg-gray-900
                flex-shrink-0
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                        <div className="flex items-center justify-between mb-3 md:hidden">
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Conversations</h2>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                                aria-label="Close sidebar"
                            >
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <button
                            onClick={createNewSession}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New chat
                        </button>
                    </div>

                    {/* Sessions List */}
                    <div className="flex-1 overflow-y-auto p-2 min-h-0">
                        {loadingSessions ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-gray-100"></div>
                            </div>
                        ) : sessions.length === 0 ? (
                            <div className="text-center py-8 px-4">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    No previous conversations
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {sessions.map((session) => (
                                    <div
                                        key={session.sessionId}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors group relative cursor-pointer ${
                                            currentSession?.sessionId === session.sessionId
                                                ? 'bg-gray-200 dark:bg-gray-800'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                        }`}
                                        onClick={() => loadSession(session.sessionId)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                            <span className="text-sm truncate flex-1 text-gray-700 dark:text-gray-200">
                                                {session.title || 'New conversation'}
                                            </span>
                                            <button
                                                onClick={(e) => deleteSession(session.sessionId, e)}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-opacity"
                                                aria-label="Delete conversation"
                                            >
                                                <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
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
            </aside>

            {/* Mobile Overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setShowSidebar(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Bar */}
                <header className="border-b border-gray-200 dark:border-gray-800 px-3 md:px-4 h-14 flex items-center justify-between bg-white dark:bg-gray-950 flex-shrink-0">
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    {/* New Chat Button - Bright and Visible */}
                    <button
                        onClick={createNewSession}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all shadow-md hover:shadow-lg"
                        style={{ minWidth: '100px' }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>New Chat</span>
                    </button>
                </header>

                {/* Messages Area */}
                <main className="flex-1 overflow-y-auto min-h-0">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center p-4">
                            <div className="text-center max-w-2xl px-4">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    How can I help you today?
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                    Share what's on your heart and receive biblical guidance
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto px-3 md:px-4 py-4 md:py-8 w-full">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`mb-6 md:mb-8 ${msg.role === 'assistant' ? 'ml-0' : 'ml-auto'}`}>
                                    <div className="flex gap-2 md:gap-4">
                                        {msg.role === 'assistant' && (
                                            <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <span className="text-white text-xs md:text-sm font-semibold">V</span>
                                            </div>
                                        )}
                                        <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                            <div className={`inline-block text-left ${msg.role === 'user' ? 'max-w-[85%] md:max-w-[80%]' : 'w-full'}`}>
                                                {msg.role === 'user' && (
                                                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                        You
                                                    </div>
                                                )}
                                                <div className={`prose dark:prose-invert max-w-none ${
                                                    msg.role === 'user' 
                                                        ? 'bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 md:px-4 py-2 md:py-3 text-gray-900 dark:text-gray-100' 
                                                        : 'text-gray-900 dark:text-gray-100'
                                                }`}>
                                                    <p className="whitespace-pre-wrap m-0 text-sm md:text-[15px] leading-relaxed">
                                                        {msg.content}
                                                    </p>
                                                </div>
                                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                    {formatTime(msg.timestamp)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="mb-6 md:mb-8">
                                    <div className="flex gap-2 md:gap-4">
                                        <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-xs md:text-sm font-semibold">V</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex gap-1 py-3 md:py-4">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </main>

                {/* Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex-shrink-0 safe-area-inset-bottom">
                    <div className="max-w-3xl mx-auto p-3 md:p-4 w-full">
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 focus-within:border-gray-300 dark:focus-within:border-gray-700 transition-colors p-2">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    placeholder="Message Versiful..."
                                    className="flex-1 bg-transparent border-none focus:outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-2 py-2 max-h-[200px] text-sm md:text-[15px]"
                                    disabled={isLoading}
                                    rows={1}
                                    style={{ minHeight: '24px' }}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="flex-shrink-0 p-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    aria-label="Send message"
                                >
                                    {isLoading ? (
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center hidden md:block">
                                Versiful can make mistakes. Please verify important information.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
