import HeroSection from "../components/landing/hero/HeroSection.jsx";
import CallToAction from "../components/landing/CallToAction.jsx";
import ChatCard from "../components/landing/ChatCard.jsx";

export default function LandingPage() {
    return (
        <div
            className="bg-cover min-h-screen bg-center py-20 text-center"
            style={{
                backgroundImage: "url('/hero-image.jpg')",
            }}
        >
            <HeroSection />
        </div>
    );
}
