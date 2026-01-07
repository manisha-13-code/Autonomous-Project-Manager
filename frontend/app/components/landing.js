"ise client"
import Navbar from "./navbar";
import Hero from "./hero";
import About from "./about";
import HowItWorks from "./howItWorks";
import Agents from "./agents";
import Demo from "./demo";

export default function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black to-gray-900 text-white">
      <Navbar />
      <Hero />
      <About/>
      <HowItWorks/>
      <Agents />
      <Demo/>
    </div>
  );
}
