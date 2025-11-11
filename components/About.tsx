
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 text-left">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-brand-light-gray mb-4 leading-relaxed">
              Aspiring AI/ML Engineer pursuing B.Tech in Computer Science, with a strong foundation in Python, NLP, and LLM-based systems. I have hands-on experience in integrating AI models into real-world systems with a focus on automation, performance, and user accessibility. I am passionate about applying data-driven problem-solving and model deployment skills to tackle real-world challenges.
            </p>
            <p className="text-white font-semibold leading-relaxed">
              I am currently seeking an internship to contribute to cutting-edge AI/ML and software engineering projects.
            </p>
          </div>
          <div className="md:col-span-2">
            <img src="/images/about me.png" alt="Shaunak Lad" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
