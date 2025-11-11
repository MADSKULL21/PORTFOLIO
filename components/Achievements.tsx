
import React from 'react';

const achievements = [
  { value: '90%+', title: 'Transcription Accuracy', description: 'Bilingual speech-to-text system' },
  { value: '85%', title: 'Churn Prediction', description: 'ML model accuracy rate' },
  { value: '35%', title: 'Pipeline Optimization', description: 'AI accuracy improvement' },
  { value: '80%', title: 'Automation', description: 'Manual effort reduction' },
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-8">Key Achievements</h2>
            <div className="grid grid-cols-2 gap-8">
              {achievements.map((ach) => (
                <div key={ach.title} className="text-left">
                  <p className="text-5xl font-extrabold text-brand-pink mb-2">{ach.value}</p>
                  <h3 className="text-xl font-bold text-white">{ach.title}</h3>
                  <p className="text-brand-light-gray">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img src="/images/key achievements.png" alt="Achievements Graphic" className="rounded-lg shadow-xl w-full h-auto object-cover"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
