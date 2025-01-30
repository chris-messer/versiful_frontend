import React from 'react';

export default function ResponseCard({ parable, verse, resetCard }) {
    return (
        <div className="flex justify-center items-center py-10 flex-col">
            {/* Main response card */}
            <div className="flex flex-col md:flex-row max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className="w-full md:w-1/2 p-4 bg-white bg-opacity-90">
                    <h2 className="text-lg font-bold text-gray-800">Verse</h2>
                    <p className="text-gray-700 mt-2">{verse}</p>
                </div>
                <div className="w-full md:w-1/2 p-4 bg-white bg-opacity-70">
                    <h2 className="text-lg font-bold text-gray-800">Parable</h2>
                    <p className="text-gray-700 mt-2">{parable}</p>
                </div>
            </div>

            {/* Add the reload button below */}
            <button
                onClick={resetCard}
                className="mt-4 px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
                Search Again
            </button>
        </div>
    );
}
