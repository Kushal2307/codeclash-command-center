import UpwardSnow from "@/components/UpwardSnow";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PrizesSection from "@/components/PrizesSection";
import EventsSection from "@/components/EventsSection";
import RegistrationSection from "@/components/RegistrationSection";
import TimerSection from "@/components/TimerSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <UpwardSnow />
      <Header />
      <HeroSection />
      <PrizesSection />
      <EventsSection />
      <RegistrationSection />
      <TimerSection />
      <Footer />
    </div>
  );
};

export default Index;
