import React, { useState } from 'react';

export default function QuizGenerator() {
  const [step, setStep] = useState(0); // 0: Form, 1: Loading, 2: Quiz Active, 3: Score Result
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // maps question index to selected option index/text
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMsg('Please enter a topic to continue.');
      return;
    }
    setErrorMsg('');
    setStep(1); // Go to loading screen

    try {
      const response = await fetch('http://localhost:5000/api/quizzes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty })
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.quiz);
        setAnswers({});
        setStep(2); // Go to active quiz
      } else {
        throw new Error('Failed to generate quiz');
      }
    } catch (error) {
      console.warn('Backend quiz generator failed. Using local simulation.');
      simulateQuizGeneration();
    }
  };

  const simulateQuizGeneration = () => {
    setTimeout(() => {
      let mockQuiz = [];
      const lowerTopic = topic.toLowerCase();

      if (lowerTopic.includes('react') || lowerTopic.includes('hook') || lowerTopic.includes('javascript')) {
        mockQuiz = [
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
      } else if (lowerTopic.includes('thermo') || lowerTopic.includes('heat') || lowerTopic.includes('physic')) {
        mockQuiz = [
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
      } else if (lowerTopic.includes('photo') || lowerTopic.includes('plant') || lowerTopic.includes('biolo')) {
        mockQuiz = [
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
      } else if (lowerTopic.includes('dbms') || lowerTopic.includes('sql') || lowerTopic.includes('databas')) {
        mockQuiz = [
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
      } else if (lowerTopic.includes('war') || lowerTopic.includes('history') || lowerTopic.includes('world war')) {
        mockQuiz = [
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
      } else if (lowerTopic.includes('calculus') || lowerTopic.includes('deriv') || lowerTopic.includes('math')) {
        mockQuiz = [
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
      } else if (lowerTopic.includes('machine') || lowerTopic.includes('ai') || lowerTopic.includes('neural')) {
        mockQuiz = [
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
      } else {
        mockQuiz = [
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
      }

      setQuestions(mockQuiz);
      setAnswers({});
      setStep(2);
    }, 1500);
  };

  const handleSelectOption = (qIdx, optionText) => {
    setAnswers((prev) => ({
      ...prev,
      [qIdx]: optionText
    }));
  };

  const handleSubmitQuiz = () => {
    let computedScore = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        computedScore += 1;
      }
    });
    setScore(computedScore);
    setStep(3); // Result view
  };

  const handleReset = () => {
    setTopic('');
    setDifficulty('Beginner');
    setQuestions([]);
    setAnswers({});
    setScore(0);
    setStep(0);
  };

  const getScoreFeedback = () => {
    const pct = (score / 5) * 100;
    if (pct === 100) return { title: 'Perfect Score! 🏆', subtitle: 'You have mastered this topic!', color: 'text-emerald-500' };
    if (pct >= 80) return { title: 'Excellent Work! 🌟', subtitle: 'Great understanding of the concepts!', color: 'text-primary' };
    if (pct >= 60) return { title: 'Good Job! 👍', subtitle: 'You understand the basics, keep polishing!', color: 'text-amber-500' };
    return { title: 'Keep Practicing! 📚', subtitle: 'Review the research guide and try again.', color: 'text-error' };
  };

  const unansweredCount = questions.length - Object.keys(answers).length;

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-background flex flex-col items-center justify-start p-4 md:p-8 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-3xl space-y-6">
        
        {/* Step 0: Input Form */}
        {step === 0 && (
          <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6 shadow-sm border border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <span className="material-symbols-outlined text-primary text-[28px]">quiz</span>
              </div>
              <div>
                <h2 className="font-h2 text-h2 text-on-surface">Generate a Custom Quiz</h2>
                <p className="text-on-surface-variant text-body-sm">Test your knowledge with AI-generated multiple-choice questions.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateQuiz} className="space-y-6">
              {errorMsg && (
                <p className="text-body-sm text-error font-semibold bg-error/10 p-3 rounded-lg border border-error/20">
                  {errorMsg}
                </p>
              )}

              {/* Topic Field */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface">Quiz Topic</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-on-surface-variant">school</span>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. React Hooks, Photoelectric Effect, Photosynthesis"
                    className="w-full pl-12 pr-4 py-3.5 bg-surface border border-outline-variant rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-colors"
                  />
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-3">
                <label className="font-label-md text-on-surface">Select Difficulty Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
                    const isActive = difficulty === level;
                    return (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`py-3.5 rounded-2xl border text-body-md font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
                          isActive
                            ? 'bg-primary text-on-primary border-primary shadow-sm'
                            : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-low'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {level === 'Beginner' ? 'filter_1' : level === 'Intermediate' ? 'filter_2' : 'filter_3'}
                        </span>
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-primary text-on-primary font-button rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">auto_awesome</span>
                <span>Generate Quiz</span>
              </button>
            </form>
          </div>
        )}

        {/* Step 1: Loading Screen */}
        {step === 1 && (
          <div className="glass-card p-12 text-center rounded-3xl flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-spin">
              <span className="material-symbols-outlined text-primary text-[32px]">sync</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-h3 text-h3 text-on-surface">Orchestrating Quiz Agent</h3>
              <p className="text-on-surface-variant max-w-sm mx-auto text-body-sm leading-relaxed">
                Generating 5 customized MCQs for <strong className="text-primary">"{topic}"</strong> at <strong className="text-primary">{difficulty}</strong> level...
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></span>
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}

        {/* Step 2: Active Quiz Viewer */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="glass-card p-5 rounded-2xl flex items-center justify-between border border-outline-variant">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary-container/30 px-2 py-0.5 rounded">
                  {difficulty} Quiz
                </span>
                <h3 className="font-h3 text-h3 text-on-surface mt-1 truncate max-w-xs md:max-w-md">{topic}</h3>
              </div>
              <div className="text-right">
                <span className="text-body-sm text-on-surface-variant">Progress</span>
                <p className="text-h3 font-bold text-primary font-h3 leading-none mt-1">
                  {Object.keys(answers).length}/5
                </p>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              {questions.map((q, qIdx) => (
                <div key={qIdx} className="glass-card p-6 rounded-3xl border border-outline-variant space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-body-sm font-bold flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h4 className="text-body-lg font-bold text-on-surface leading-tight">
                      {q.question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                    {q.options.map((option, optIdx) => {
                      const isSelected = answers[qIdx] === option;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, option)}
                          className={`p-4 rounded-xl border text-left text-body-sm font-medium transition-all duration-150 flex items-center gap-3 ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-primary font-bold'
                              : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-low'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-primary' : 'text-on-surface-variant opacity-45'}`}>
                            {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Bar */}
            <div className="glass-card p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant">
              <div>
                <p className="text-body-sm text-on-surface-variant">
                  {unansweredCount > 0 ? `Please answer ${unansweredCount} remaining question${unansweredCount > 1 ? 's' : ''}` : 'All questions answered! Ready to submit.'}
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 border border-outline-variant hover:bg-surface-container text-on-surface rounded-xl font-button transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={unansweredCount > 0}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary rounded-xl font-button hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Quiz Score Results */}
        {step === 3 && (
          <div className="space-y-6 pb-12">
            {/* Score Summary Box */}
            <div className="glass-card p-8 rounded-3xl border border-outline-variant flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="p-3 bg-primary/10 rounded-2xl inline-flex">
                  <span className="material-symbols-outlined text-primary text-[32px]">emoji_events</span>
                </div>
                <div>
                  <span className="text-body-sm text-on-surface-variant font-medium uppercase tracking-wider">Quiz Completed</span>
                  <h3 className={`font-h2 text-h2 ${getScoreFeedback().color} mt-1`}>
                    {getScoreFeedback().title}
                  </h3>
                  <p className="text-on-surface-variant text-body-sm mt-1">{getScoreFeedback().subtitle}</p>
                </div>
              </div>

              {/* Progress Circle Visual */}
              <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="54"
                    stroke="rgba(var(--color-primary-container), 0.2)"
                    strokeWidth="10"
                    fill="transparent"
                    className="stroke-outline-variant/30"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - score / 5)}
                    className={`${getScoreFeedback().color}`}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-h1 font-bold font-h1 text-on-surface leading-none">{score}</span>
                  <span className="text-body-md text-on-surface-variant block">/ 5</span>
                </div>
              </div>
            </div>

            {/* Questions Review */}
            <div className="space-y-6">
              <h4 className="font-h3 text-h3 text-on-surface pl-1">Review Answers</h4>
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={idx} className={`glass-card p-6 rounded-3xl border ${isCorrect ? 'border-emerald-500/30' : 'border-error/30'} space-y-4`}>
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-body-sm font-bold flex-shrink-0 mt-0.5 ${
                        isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-error/10 text-error'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex-grow">
                        <h4 className="text-body-lg font-bold text-on-surface leading-tight">
                          {q.question}
                        </h4>
                        <div className="mt-1 flex items-center gap-2">
                          {isCorrect ? (
                            <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px] font-bold">check</span> Correct
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-error bg-error/10 px-2 py-0.5 rounded flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px] font-bold">close</span> Incorrect
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Review Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                      {q.options.map((option, optIdx) => {
                        const isUserChoice = userAns === option;
                        const isCorrectAnswer = q.correctAnswer === option;
                        
                        let borderClass = 'border-outline-variant';
                        let bgClass = 'bg-surface text-on-surface';
                        let icon = 'radio_button_unchecked';

                        if (isCorrectAnswer) {
                          borderClass = 'border-emerald-500';
                          bgClass = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold';
                          icon = 'check_circle';
                        } else if (isUserChoice && !isCorrect) {
                          borderClass = 'border-error';
                          bgClass = 'bg-error/10 text-error font-bold';
                          icon = 'cancel';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-4 rounded-xl border text-body-sm flex items-center justify-between ${borderClass} ${bgClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-[20px]">
                                {icon}
                              </span>
                              <span>{option}</span>
                            </div>
                            {isUserChoice && (
                              <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">Your Choice</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Reset Area */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-primary text-on-primary rounded-2xl font-button hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">restart_alt</span>
                <span>Create New Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
