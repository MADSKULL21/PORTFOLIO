
import React from 'react';

const certifications = [
  'Artificial Intelligence — IBM, Coursera',
  'GenAI — IBM, Coursera',
  'Python for Data Science — IBM, Coursera',
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-32 bg-cover bg-center relative" style={{ backgroundImage: "url('https://picsum.photos/seed/college/1920/1080')" }}>
      <div className="absolute inset-0 bg-brand-dark opacity-90"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center">Education & Continuous Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-4">G H Patel College of Engineering & Technology</h3>
            <p className="text-xl text-brand-light-gray mb-2">Bachelor's in Computer Science & Engineering</p>
            <p className="text-brand-pink">09/2022 – 2025 | Anand, Gujarat | CGPA: 7.96 (Till 7th Semester)</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Certifications & Courses</h3>
            <ul className="list-disc list-inside space-y-2 text-brand-light-gray">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
