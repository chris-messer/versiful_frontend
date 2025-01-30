import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import ResponseCard from './ResponseCard.jsx'; // Import the new ResponseCard component

export default function ChatCard() {
    const usageLimit = 100; // Set the usage limit
    const [usageCount, setUsageCount] = useState(0); // Track usage count
    const [message, setMessage] = useState('');
    const [TextSource, setTextSource] = useState('The Message (MSG)');
    const [apiResponse, setApiResponse] = useState(null);

    // Load usage count from cookies on component mount
    useEffect(() => {
        const storedCount = Cookies.get('usageCount');
        setUsageCount(storedCount ? parseInt(storedCount, 10) : 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        if (usageCount < usageLimit) {
            const newCount = usageCount + 1;
            setUsageCount(newCount);
            Cookies.set('usageCount', newCount, { expires: 7 }); // Store usage count in a cookie, valid for 7 days
        } else {
            return; // Prevent further submissions after limit is reached
        }

        const payload = {
            message,
            TextSource,
        };

        try {
            const response = await callRealApi(payload);
            console.log('API Response:', response);
            setApiResponse(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const callRealApi = async (data) => {
        const endpoint = 'https://rsket7cxx7.execute-api.us-east-1.amazonaws.com/dev/web'; // Replace with your API endpoint
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_TOKEN', // Add authorization if needed
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            return await response.json(); // Assuming the API returns JSON
        } catch (error) {
            console.error('Error calling the API:', error);
            throw error;
        }
    };

    const bibleVersions = [
        {
            label: 'Formal Equivalence (Word-for-Word Translation)',
            versions: ['King James Version (KJV)', 'New King James Version (NKJV)', 'English Standard Version (ESV)', 'New American Standard Bible (NASB)'],
        },
        {
            label: 'Dynamic Equivalence (Thought-for-Thought Translation)',
            versions: ['New International Version (NIV)', 'New Living Translation (NLT)', 'Christian Standard Bible (CSB)'],
        },
        {
            label: 'Paraphrase (Simplified/Interpretive)',
            versions: ['The Message (MSG)', 'Good News Translation (GNT)', 'Catholic Editions', 'New American Bible (NAB)', 'Revised Standard Version Catholic Edition (RSV-CE)'],
        },
        {
            label: 'Other Popular Versions',
            versions: ['Holman Christian Standard Bible (HCSB)', 'Revised Standard Version (RSV)', 'New English Translation (NET)'],
        },
    ];

    if (apiResponse) {
        // Render the ResponseCard component when there is an API response
        return <ResponseCard parable={apiResponse.parable} verse={apiResponse.verse} resetCard={() => setApiResponse(null)} />;
    }

    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-md bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                <div className="text-center text-gray-700 mb-4">
                    <h2 className="text-lg font-semibold">Try it now!</h2>
                    {usageCount >= usageLimit ? (
                        <p className="text-red-500">You’ve reached the usage limit. Please sign up to continue.</p>
                    ) : (
                        <p className="text-sm">You have {usageLimit - usageCount} tries remaining.</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex items-center space-x-2" disabled={usageCount >= usageLimit}>
                    <input
                        type="text"
                        placeholder="I am struggling with the loss of a loved one"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={usageCount >= usageLimit}
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg focus:outline-none ${
                            usageCount >= usageLimit
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'text-white bg-blue-900 hover:bg-blue-950 focus:ring-2 focus:ring-blue-900'
                        }`}
                        disabled={usageCount >= usageLimit}
                    >
                        Search
                    </button>
                </form>

                <div className="mt-4 space-y-2">
                    <div>
                        <select
                            value={TextSource}
                            onChange={(e) => setTextSource(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={usageCount >= usageLimit}
                        >
                            <option value="" disabled>Select a version</option>
                            {bibleVersions.map((group, groupIndex) => (
                                <optgroup key={groupIndex} label={group.label}>
                                    {group.versions.map((version, versionIndex) => (
                                        <option key={versionIndex} value={version}>{version}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
