import React from 'react';

const SponsorsSection: React.FC = () => {
  // Mock sponsor logos (represented as colored circles with letters for this example)
  const sponsorClasses = [
    'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600', 
    'bg-yellow-600', 'bg-indigo-600', 'bg-pink-600', 'bg-teal-600'
  ];
  
  const sponsors = Array(12).fill(0).map((_, index) => ({
    id: index + 1,
    name: `Sponsor ${String.fromCharCode(65 + index % 26)}`,
    class: sponsorClasses[index % sponsorClasses.length],
    angle: (index * 30) % 360,
    distance: 120 + (index % 3) * 60,
  }));

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-[#001A33] to-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Powered by 50+ Industry Leaders
        </h2>
        
        <div className="relative h-[600px]">
          {/* Central element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#00A3FF] text-white rounded-full w-40 h-40 flex items-center justify-center text-4xl font-bold shadow-glow">
              $1M+
            </div>
          </div>
          
          {/* Orbiting sponsors */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full animate-slow-spin">
            {sponsors.map(sponsor => (
              <div 
                key={sponsor.id}
                className="absolute"
                style={{
                  transform: `rotate(${sponsor.angle}deg) translateX(${sponsor.distance}px) rotate(-${sponsor.angle}deg)`,
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  className={`${sponsor.class} w-16 h-16 rounded-full flex items-center justify-center
                            text-white font-bold text-xl transition-transform hover:scale-125
                            hover:shadow-glow cursor-pointer border-2 border-transparent
                            hover:border-white`}
                >
                  {sponsor.name.charAt(sponsor.name.length - 1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;