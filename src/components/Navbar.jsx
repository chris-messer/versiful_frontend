export default function Navbar() {
    return (
        <header className="bg-white shadow fixed top-0 left-0 w-full">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="Logo" className="h-10" />
                    <span className="text-xl font-bold text-gray-800">Versiful-dev</span>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        {/*<li><a href="#features" className="hover:text-blue-600">Features</a></li>*/}
                        {/*<li><a href="#about" className="hover:text-blue-600">About</a></li>*/}
                        {/*<li><a href="#contact" className="hover:text-blue-600">Contact</a></li>*/}
                    </ul>
                </nav>
                {/*<button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">*/}
                {/*    Get Started*/}
                {/*</button>*/}
            </div>
        </header>
    );
}
