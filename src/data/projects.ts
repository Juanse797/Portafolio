export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  shortDescription: string;
  tags: string[];
  githubLink: string;
  demoLink?: string;
}

/**
 * Add, edit, or remove your projects here.
 * They will appear in the order listed below.
 *
 * For images you can:
 * - Put them in /public/images/ and reference as "/images/my-project.png"
 * - Use an external URL like "https://images.unsplash.com/..."
 * - Use a placeholder like "/placeholder.svg?height=400&width=600"
 */
export const projects: Project[] = [
  {
    id: '1',
    title: 'Sentiment Analysis Pipeline',
    image: '/placeholder.svg?height=400&width=600',
    description:
      '## Overview\n\nA production-ready NLP pipeline for real-time sentiment analysis of customer reviews.\n\n## Features\n\n- Real-time text classification using fine-tuned transformer models\n- REST API with FastAPI for seamless integration\n- Automated data preprocessing and augmentation\n- Model versioning with MLflow\n\n## Tech Stack\n\nPython, PyTorch, Hugging Face Transformers, FastAPI, Docker',
    shortDescription:
      'Production-ready NLP pipeline for real-time sentiment analysis of customer reviews.',
    tags: ['Python', 'NLP', 'PyTorch', 'FastAPI'],
    githubLink: 'https://github.com/Juanse797',
  },
  {
    id: '2',
    title: 'Image Classification System',
    image: '/placeholder.svg?height=400&width=600',
    description:
      '## Overview\n\nA deep learning system for classifying medical images with high accuracy.\n\n## Features\n\n- Transfer learning with EfficientNet architecture\n- Data augmentation for limited datasets\n- Grad-CAM visualizations for model interpretability\n- Deployed as a web service with Streamlit\n\n## Tech Stack\n\nPython, TensorFlow, Keras, Streamlit, Docker',
    shortDescription:
      'Deep learning system for classifying medical images with high accuracy and interpretability.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
    githubLink: 'https://github.com/Juanse797',
  },
  {
    id: '3',
    title: 'Predictive Maintenance Model',
    image: '/placeholder.svg?height=400&width=600',
    description:
      '## Overview\n\nA time-series forecasting model that predicts equipment failures before they occur.\n\n## Features\n\n- LSTM-based anomaly detection\n- Real-time monitoring dashboard\n- Automated alerts via Slack integration\n- Reduced downtime by 35%\n\n## Tech Stack\n\nPython, Scikit-learn, Pandas, Matplotlib, Docker',
    shortDescription:
      'Time-series forecasting model that predicts equipment failures before they occur.',
    tags: ['Python', 'Scikit-learn', 'Time Series', 'Pandas'],
    githubLink: 'https://github.com/Juanse797',
  },
];
