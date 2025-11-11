export type Project = {
  title: string;
  date?: string;
  description: string;
  repo?: string;
  image?: string;
  tech?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'ProPlay Assistant Chatbot',
    date: '09/2025',
    description:
      'Built AI-driven sports chatbot providing real-time insights on 20+ sports. Integrated LLaMA-3.1-70B, Gemma-2-27B, and Mistral for <2s response latency. Optimized pipeline for 35% higher accuracy and 30% lower GPU usage.',
    repo: 'https://github.com/MADSKULL21/ProPlay-Assistant',
    image: 'https://opengraph.githubassets.com/1/MADSKULL21/ProPlay-Assistant',
    tech: 'Python, Streamlit, Groq API, TensorFlow',
    featured: true,
  },
  {
    title: 'JARVIS AI Agent',
    date: '01/2025',
    description:
      'Multimodal AI assistant integrating Whisper (speech-to-text), TTS, image generation, and GPT-based NLP. Automated 10+ tasks via Selenium voice commands with practical model deployments.',
    repo: 'https://github.com/MADSKULL21/JARVIS',
    image: 'https://opengraph.githubassets.com/1/MADSKULL21/JARVIS',
    tech: 'Python, Selenium, Whisper, TTS',
  },
  {
    title: 'Stock Price Predictor',
    date: '03/2025',
    description:
      'Developed LSTM and Random Forest prediction system using multi-year stock data. Achieved significant MSE improvements and provided interactive visualizations for analysis.',
    repo: 'https://github.com/MADSKULL21/TIME-SERIES-FORCASTING',
    image: 'https://opengraph.githubassets.com/1/MADSKULL21/TIME-SERIES-FORCASTING',
    tech: 'Python, Keras, Scikit-learn',
  },
  {
    title: 'Minutes of Meeting Recorder',
    date: '06/2024',
    description: 'Bilingual speech-to-text system with GUI and export features for structured meeting minutes and quick summarization.',
    repo: 'https://github.com/MADSKULL21/MINUTES-OF-MEETING',
    image: 'https://opengraph.githubassets.com/1/MADSKULL21/MINUTES-OF-MEETING',
    tech: 'Python, Web Speech API, Tkinter',
  },
  {
    title: 'Twitter Sentiment Analysis',
    date: '11/2024',
    description: 'End-to-end sentiment analysis pipeline for Twitter data including collection, preprocessing, and classifier training with visual reports.',
    repo: 'https://github.com/MADSKULL21/TWITTER-SENTIMENT-ANALYSIS',
    image: 'https://opengraph.githubassets.com/1/MADSKULL21/TWITTER-SENTIMENT-ANALYSIS',
    tech: 'Python, Tweepy, NLP',
  },
  {
    title: 'Type Mood App',
    date: '02/2025',
    description: 'A small app that analyzes typed text to infer mood and gives feedback/visualization.',
    repo: 'https://github.com/MADSKULL21/TYPE-MOOD-APP',
    image: 'https://opengraph.githubassets.com/1/MADSKULL21/TYPE-MOOD-APP',
    tech: 'React, JS',
  },
];

export default projects;
