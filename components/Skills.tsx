
import React from 'react';

const skillsData = [
  {
    title: 'Languages',
    skills: ['Python', 'SQL', 'C++', 'C'],
  },
  {
    title: 'AI/ML Frameworks',
    skills: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'LangChain'],
  },
  {
    title: 'Specialized Tools',
    skills: ['LLMs', 'NLP', 'Streamlit', 'OpenCV', 'NLTK', 'SpaCy'],
  },
  {
    title: 'Data Processing',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'TF-IDF'],
  },
];

interface SkillCardProps {
    title: string;
    skills: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills }) => {
    return (
        <div className="bg-brand-gray p-8 rounded-lg transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-brand-light-gray">
                {skills.join(' | ')}
            </p>
        </div>
    );
};


const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category) => (
            <SkillCard key={category.title} title={category.title} skills={category.skills} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
