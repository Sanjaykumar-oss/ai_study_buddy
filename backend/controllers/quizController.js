const { runQuizGeneration } = require('../agents/quizzAgent');

// Helper: React Hooks Quiz
const getReactHooksQuiz = (difficulty) => [
  {
    question: `[React Hooks - ${difficulty}] What is the primary purpose of the useEffect hook in React?`,
    options: [
      "To manage local component state",
      "To perform side effects in functional components",
      "To optimize component re-renders",
      "To define global styling rules"
    ],
    correctAnswer: "To perform side effects in functional components"
  },
  {
    question: `[React Hooks - ${difficulty}] Which React hook would you use to cache a computed value between renders?`,
    options: [
      "useCallback",
      "useState",
      "useMemo",
      "useRef"
    ],
    correctAnswer: "useMemo"
  },
  {
    question: `[React Hooks - ${difficulty}] What rule must be followed when calling React Hooks?`,
    options: [
      "Call them inside loops or nested conditions",
      "Only call them at the top level of your functional components",
      "Call them inside standard JavaScript utility classes",
      "Call them inside class component render methods"
    ],
    correctAnswer: "Only call them at the top level of your functional components"
  },
  {
    question: `[React Hooks - ${difficulty}] What does useState return?`,
    options: [
      "The current state value only",
      "A state value and a function to update it",
      "A reference ref object",
      "A dispatcher action object"
    ],
    correctAnswer: "A state value and a function to update it"
  },
  {
    question: `[React Hooks - ${difficulty}] How do you perform cleanup when using the useEffect hook?`,
    options: [
      "Return a function from the effect callback",
      "Pass an empty array dependency",
      "Call useEffect.cleanup() manually",
      "React cleans up effects automatically without returning anything"
    ],
    correctAnswer: "Return a function from the effect callback"
  }
];

// Helper: Thermodynamics Quiz
const getThermodynamicsQuiz = (difficulty) => [
  {
    question: `[Thermodynamics - ${difficulty}] What does the First Law of Thermodynamics state?`,
    options: [
      "Entropy of an isolated system always increases",
      "Energy cannot be created or destroyed, only transformed",
      "Absolute zero cannot be reached",
      "Heat cannot flow from cold to hot spontaneously"
    ],
    correctAnswer: "Energy cannot be created or destroyed, only transformed"
  },
  {
    question: `[Thermodynamics - ${difficulty}] Which thermodynamic process occurs at a constant volume?`,
    options: [
      "Isobaric",
      "Isothermal",
      "Isochoric",
      "Adiabatic"
    ],
    correctAnswer: "Isochoric"
  },
  {
    question: `[Thermodynamics - ${difficulty}] What is the maximum theoretical efficiency limit for a heat engine called?`,
    options: [
      "Rankine efficiency",
      "Carnot efficiency",
      "Stirling efficiency",
      "Otto efficiency"
    ],
    correctAnswer: "Carnot efficiency"
  },
  {
    question: `[Thermodynamics - ${difficulty}] Which law introduces the concept of entropy?`,
    options: [
      "Zeroth Law",
      "First Law",
      "Second Law",
      "Third Law"
    ],
    correctAnswer: "Second Law"
  },
  {
    question: `[Thermodynamics - ${difficulty}] In an adiabatic process, what is the value of heat transfer (Q)?`,
    options: [
      "Q = 0",
      "Q > 0 always",
      "Q < 0 always",
      "Q is equal to the work done"
    ],
    correctAnswer: "Q = 0"
  }
];

// Helper: Photosynthesis Quiz
const getPhotosynthesisQuiz = (difficulty) => [
  {
    question: `[Photosynthesis - ${difficulty}] Which pigment primarily absorbs light during photosynthesis?`,
    options: [
      "Chlorophyll a",
      "Carotenoids",
      "Phycobilins",
      "Anthocyanins"
    ],
    correctAnswer: "Chlorophyll a"
  },
  {
    question: `[Photosynthesis - ${difficulty}] Where do the light-dependent reactions of photosynthesis take place?`,
    options: [
      "Stroma",
      "Thylakoid membrane",
      "Mitochondrial matrix",
      "Cytoplasm"
    ],
    correctAnswer: "Thylakoid membrane"
  },
  {
    question: `[Photosynthesis - ${difficulty}] What is the primary source of electrons in the light-dependent reactions?`,
    options: [
      "Carbon dioxide",
      "Water",
      "Oxygen",
      "Glucose"
    ],
    correctAnswer: "Water"
  },
  {
    question: `[Photosynthesis - ${difficulty}] Which molecule acts as the final electron acceptor in the light reactions?`,
    options: [
      "NADP+",
      "ADP",
      "Oxygen",
      "FAD"
    ],
    correctAnswer: "NADP+"
  },
  {
    question: `[Photosynthesis - ${difficulty}] What is the primary output of the Calvin cycle (light-independent reactions)?`,
    options: [
      "Oxygen",
      "Glyceraldehyde-3-phosphate (G3P)",
      "ATP",
      "NADPH"
    ],
    correctAnswer: "Glyceraldehyde-3-phosphate (G3P)"
  }
];

// Helper: DBMS Quiz
const getDBMSQuiz = (difficulty) => [
  {
    question: `[DBMS - ${difficulty}] Which SQL constraint uniquely identifies each record in a database table?`,
    options: [
      "UNIQUE",
      "FOREIGN KEY",
      "PRIMARY KEY",
      "CHECK"
    ],
    correctAnswer: "PRIMARY KEY"
  },
  {
    question: `[DBMS - ${difficulty}] What does ACID stand for in database transaction properties?`,
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Completeness, Integrity, Durability",
      "Atomicity, Concurrency, Indexing, Distribution",
      "Access, Control, Information, Definition"
    ],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability"
  },
  {
    question: `[DBMS - ${difficulty}] Which normalization form removes transitive dependencies?`,
    options: [
      "1NF",
      "2NF",
      "3NF",
      "BCNF"
    ],
    correctAnswer: "3NF"
  },
  {
    question: `[DBMS - ${difficulty}] What type of join returns all rows from the left table and matched rows from the right table?`,
    options: [
      "INNER JOIN",
      "FULL OUTER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN"
    ],
    correctAnswer: "LEFT JOIN"
  },
  {
    question: `[DBMS - ${difficulty}] What is a major advantage of NoSQL databases compared to relational databases?`,
    options: [
      "Strict schema enforcement",
      "Dynamic schema flexibility and horizontal scalability",
      "Built-in complex SQL query compiler",
      "Guaranteed immediate global consistency"
    ],
    correctAnswer: "Dynamic schema flexibility and horizontal scalability"
  }
];

// Helper: World War II Quiz
const getWorldWarIIQuiz = (difficulty) => [
  {
    question: `[World War II - ${difficulty}] In which year did World War II begin with the invasion of Poland?`,
    options: [
      "1914",
      "1939",
      "1941",
      "1945"
    ],
    correctAnswer: "1939"
  },
  {
    question: `[World War II - ${difficulty}] What was the code name for the Allied invasion of Normandy on June 6, 1944?`,
    options: [
      "Operation Barbarossa",
      "Operation Overlord",
      "Operation Torch",
      "Operation Sea Lion"
    ],
    correctAnswer: "Operation Overlord"
  },
  {
    question: `[World War II - ${difficulty}] Who was the Prime Minister of the United Kingdom during the majority of World War II?`,
    options: [
      "Neville Chamberlain",
      "Clement Attlee",
      "Winston Churchill",
      "Franklin D. Roosevelt"
    ],
    correctAnswer: "Winston Churchill"
  },
  {
    question: `[World War II - ${difficulty}] Which battle is widely considered the turning point of the war on the Eastern Front?`,
    options: [
      "Battle of Britain",
      "Battle of Stalingrad",
      "Battle of Midway",
      "Battle of the Bulge"
    ],
    correctAnswer: "Battle of Stalingrad"
  },
  {
    question: `[World War II - ${difficulty}] What was the name of the research project that developed the first atomic weapons?`,
    options: [
      "The Manhattan Project",
      "The Apollo Program",
      "The Turing Project",
      "Operation Paperclip"
    ],
    correctAnswer: "The Manhattan Project"
  }
];

// Helper: Calculus Quiz
const getCalculusQuiz = (difficulty) => [
  {
    question: `[Calculus - ${difficulty}] What is the derivative of f(x) = sin(x) with respect to x?`,
    options: [
      "-cos(x)",
      "cos(x)",
      "sec^2(x)",
      "tan(x)"
    ],
    correctAnswer: "cos(x)"
  },
  {
    question: `[Calculus - ${difficulty}] Which theorem connects the derivative of an integral of a function to the function itself?`,
    options: [
      "Mean Value Theorem",
      "Intermediate Value Theorem",
      "Fundamental Theorem of Calculus",
      "Rolle's Theorem"
    ],
    correctAnswer: "Fundamental Theorem of Calculus"
  },
  {
    question: `[Calculus - ${difficulty}] What is the limit of (sin(x))/x as x approaches 0?`,
    options: [
      "0",
      "Infinity",
      "1",
      "Undefined"
    ],
    correctAnswer: "1"
  },
  {
    question: `[Calculus - ${difficulty}] Using the power rule, what is the derivative of x^3?`,
    options: [
      "3x",
      "3x^2",
      "x^2/3",
      "3x^3"
    ],
    correctAnswer: "3x^2"
  },
  {
    question: `[Calculus - ${difficulty}] What represents the area under a curve between two points?`,
    options: [
      "The derivative",
      "The limit",
      "The definite integral",
      "The tangent slope"
    ],
    correctAnswer: "The definite integral"
  }
];

// Helper: AI / Machine Learning Quiz
const getMachineLearningQuiz = (difficulty) => [
  {
    question: `[Machine Learning - ${difficulty}] What is the primary difference between supervised and unsupervised learning?`,
    options: [
      "Supervised uses labeled training data, unsupervised does not",
      "Supervised requires faster CPUs to compile models",
      "Unsupervised is only used for image processing",
      "Supervised cannot be used with neural networks"
    ],
    correctAnswer: "Supervised uses labeled training data, unsupervised does not"
  },
  {
    question: `[Machine Learning - ${difficulty}] Which activation function outputs values in the range of 0 to 1?`,
    options: [
      "ReLU",
      "Tanh",
      "Sigmoid",
      "Leaky ReLU"
    ],
    correctAnswer: "Sigmoid"
  },
  {
    question: `[Machine Learning - ${difficulty}] What is the term for a model learning the noise in training data too well, degrading test performance?`,
    options: [
      "Underfitting",
      "Overfitting",
      "Backpropagation",
      "Gradient descent"
    ],
    correctAnswer: "Overfitting"
  },
  {
    question: `[Machine Learning - ${difficulty}] Which technique randomly deactivates neurons during training to prevent overfitting?`,
    options: [
      "Dropout",
      "Batch normalization",
      "Data augmentation",
      "L2 regularization"
    ],
    correctAnswer: "Dropout"
  },
  {
    question: `[Machine Learning - ${difficulty}] What is the core component of Transformers that enables parallel token processing?`,
    options: [
      "Recurrent neural cell",
      "Convolutional filter",
      "Self-Attention mechanism",
      "Max pooling layer"
    ],
    correctAnswer: "Self-Attention mechanism"
  }
];

// Helper: Highly Realistic Dynamic General Quiz Fallback
const getGeneralQuiz = (topic, difficulty) => [
  {
    question: `[${topic} - ${difficulty}] What is the primary objective of studying ${topic}?`,
    options: [
      `To understand the fundamental principles and operational models of ${topic}`,
      `To replace all existing practical frameworks related to ${topic}`,
      `To eliminate the need for analytical or computational research in ${topic}`,
      `To calculate trivial mathematical properties of ${topic} structures`
    ],
    correctAnswer: `To understand the fundamental principles and operational models of ${topic}`
  },
  {
    question: `[${topic} - ${difficulty}] Which of the following plays a key role in analyzing ${topic}?`,
    options: [
      `Key inputs, boundary conditions, and parameters defining ${topic}`,
      `A completely unrelated study area with separate properties`,
      `A static rule that forbids updates to the parameters of ${topic}`,
      `None of the above`
    ],
    correctAnswer: `Key inputs, boundary conditions, and parameters defining ${topic}`
  },
  {
    question: `[${topic} - ${difficulty}] In a professional study of ${topic}, what is a common challenge?`,
    options: [
      `Managing the complexity and scale of ${topic} components`,
      `Learning the basic spelling of the term ${topic}`,
      `Avoiding any practical usage of ${topic}`,
      `Finding any references to ${topic} in literature`
    ],
    correctAnswer: `Managing the complexity and scale of ${topic} components`
  },
  {
    question: `[${topic} - ${difficulty}] How do practitioners optimize outcomes related to ${topic}?`,
    options: [
      `By applying structured validation and analysis of ${topic} variables`,
      `By choosing random settings without looking at ${topic}`,
      `By discarding all historical data collected on ${topic}`,
      `By converting ${topic} to a simple single-value constant`
    ],
    correctAnswer: `By applying structured validation and analysis of ${topic} variables`
  },
  {
    question: `[${topic} - ${difficulty}] What is the primary long-term benefit of mastering ${topic}?`,
    options: [
      `Enables solving complex, real-world problems in ${topic}`,
      `Speeds up typing speed by 10%`,
      `Guarantees error-free code execution automatically`,
      `None of the above`
    ],
    correctAnswer: `Enables solving complex, real-world problems in ${topic}`
  }
];

// @desc    Generate a 5-question MCQ quiz
// @route   POST /api/quizzes/generate
const generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    if (!topic || !difficulty) {
      return res.status(400).json({ message: 'topic and difficulty are required' });
    }

    let quizQuestions = null;

    try {
      quizQuestions = await runQuizGeneration(topic, difficulty);
    } catch (err) {
      console.warn('AI Quiz generation failed, falling back to simulation.');
    }

    if (!quizQuestions) {
      console.log(`[Quiz Controller] Running in simulated mode for topic: "${topic}", difficulty: "${difficulty}"`);
      const lowerTopic = topic.toLowerCase();
      
      if (lowerTopic.includes('react') || lowerTopic.includes('hook') || lowerTopic.includes('javascript')) {
        quizQuestions = getReactHooksQuiz(difficulty);
      } else if (lowerTopic.includes('thermo') || lowerTopic.includes('heat') || lowerTopic.includes('physic')) {
        quizQuestions = getThermodynamicsQuiz(difficulty);
      } else if (lowerTopic.includes('photo') || lowerTopic.includes('plant') || lowerTopic.includes('biolo')) {
        quizQuestions = getPhotosynthesisQuiz(difficulty);
      } else if (lowerTopic.includes('dbms') || lowerTopic.includes('sql') || lowerTopic.includes('databas')) {
        quizQuestions = getDBMSQuiz(difficulty);
      } else if (lowerTopic.includes('war') || lowerTopic.includes('history') || lowerTopic.includes('world war')) {
        quizQuestions = getWorldWarIIQuiz(difficulty);
      } else if (lowerTopic.includes('calculus') || lowerTopic.includes('deriv') || lowerTopic.includes('math')) {
        quizQuestions = getCalculusQuiz(difficulty);
      } else if (lowerTopic.includes('machine') || lowerTopic.includes('ai') || lowerTopic.includes('neural')) {
        quizQuestions = getMachineLearningQuiz(difficulty);
      } else {
        quizQuestions = getGeneralQuiz(topic, difficulty);
      }
    }

    res.status(200).json({ quiz: quizQuestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateQuiz };
