import ChatCard from '../ChatCard.jsx';
import Phone from './Phone.jsx';
import CallToAction from '../CallToAction.jsx';

export default function HeroSection() {
    return (
        <section className="w-full">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-20 space-y-8 md:space-y-0">

                {/* Left: Text (70%) */}
                <div className="w-full md:w-[70%] md:pr-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Guidance from the Word, Right When You Need It
                    </h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Discover Bible verses and stories tailored to your moment, offering wisdom,
                        comfort, and inspiration for life's every situation.
                    </p>
                <CallToAction/>
                </div>

                {/* Right: Image (30%) */}
                <div className="w-full md:w-[30%]">
                    <Phone />
                </div>

            </div>
        </section>
    );
}
