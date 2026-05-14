export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    // Hero section
    hero: {
      greeting: "Hi, I'm",
      description: 'Crafting intelligent solutions from data, one model at a time. Building robust ML systems that transform raw data into actionable insights.',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV',
      stats: {
        ml: { value: 'ML', label: 'Engineer' },
        ai: { value: 'AI', label: 'Solutions' },
        data: { value: 'Data', label: 'Driven' },
      },
    },
    // About section
    about: {
      badge: 'About Me',
      title: 'Passionate about turning',
      titleHighlight: 'data into intelligence',
      description: 'I am a dedicated Machine Learning Engineer with a fascination for data and its power to uncover hidden patterns. I specialize in developing, deploying, and maintaining robust ML models, from natural language processing to computer vision.',
      highlights: {
        mlEngineering: {
          title: 'ML Engineering',
          description: 'Building intelligent systems that solve real-world problems with robust machine learning models.',
        },
        cleanCode: {
          title: 'Clean Code',
          description: 'Writing maintainable, production-ready code following best practices and design patterns.',
        },
        dataPipeline: {
          title: 'Data Pipeline',
          description: 'Designing efficient data pipelines from collection to preprocessing and model deployment.',
        },
        problemSolver: {
          title: 'Problem Solver',
          description: 'Combining technical rigor with a creative, product-focused mindset for practical solutions.',
        },
      },
    },
    // Projects section
    projects: {
      badge: 'Portfolio',
      title: 'Featured',
      titleHighlight: 'projects',
      description: 'A selection of my most impactful work in machine learning and data science.',
    },
    // Skills section
    skills: {
      badge: 'Tech Stack',
      title: 'Tools & technologies I',
      titleHighlight: 'work with',
    },
    // Contact section
    contact: {
      badge: 'Get in Touch',
      title: "Let's build something",
      titleHighlight: 'together',
      description: "I'm always open to new challenges and opportunities. If you'd like to learn more about my work or discuss potential collaborations, feel free to reach out.",
      links: {
        linkedin: 'Connect on LinkedIn',
        github: 'View my GitHub',
        email: 'Send me an email',
      },
    },
  },
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    // Hero section
    hero: {
      greeting: 'Hola, soy',
      description: 'Creando soluciones inteligentes a partir de datos, un modelo a la vez. Construyendo sistemas de ML robustos que transforman datos en información procesable.',
      viewProjects: 'Ver Proyectos',
      downloadCV: 'Descargar CV',
      stats: {
        ml: { value: 'ML', label: 'Ingeniero' },
        ai: { value: 'IA', label: 'Soluciones' },
        data: { value: 'Datos', label: 'Orientado' },
      },
    },
    // About section
    about: {
      badge: 'Sobre Mí',
      title: 'Apasionado por convertir',
      titleHighlight: 'datos en inteligencia',
      description: 'Soy un Ingeniero de Machine Learning dedicado con fascinación por los datos y su poder para descubrir patrones ocultos. Me especializo en desarrollar, desplegar y mantener modelos de ML robustos, desde procesamiento de lenguaje natural hasta visión por computadora.',
      highlights: {
        mlEngineering: {
          title: 'Ingeniería ML',
          description: 'Construyendo sistemas inteligentes que resuelven problemas del mundo real con modelos de aprendizaje automático robustos.',
        },
        cleanCode: {
          title: 'Código Limpio',
          description: 'Escribiendo código mantenible y listo para producción siguiendo las mejores prácticas y patrones de diseño.',
        },
        dataPipeline: {
          title: 'Pipeline de Datos',
          description: 'Diseñando pipelines de datos eficientes desde la recolección hasta el preprocesamiento y despliegue del modelo.',
        },
        problemSolver: {
          title: 'Solucionador',
          description: 'Combinando rigor técnico con una mentalidad creativa y enfocada en el producto para soluciones prácticas.',
        },
      },
    },
    // Projects section
    projects: {
      badge: 'Portafolio',
      title: 'Proyectos',
      titleHighlight: 'destacados',
      description: 'Una selección de mis trabajos más impactantes en aprendizaje automático y ciencia de datos.',
    },
    // Skills section
    skills: {
      badge: 'Stack Tecnológico',
      title: 'Herramientas y tecnologías con las que',
      titleHighlight: 'trabajo',
    },
    // Contact section
    contact: {
      badge: 'Contacto',
      title: 'Construyamos algo',
      titleHighlight: 'juntos',
      description: 'Siempre estoy abierto a nuevos desafíos y oportunidades. Si te gustaría saber más sobre mi trabajo o discutir posibles colaboraciones, no dudes en contactarme.',
      links: {
        linkedin: 'Conectar en LinkedIn',
        github: 'Ver mi GitHub',
        email: 'Enviarme un email',
      },
    },
  },
} as const;

export type Language = keyof typeof translations;
export type Translations = typeof translations.en;
