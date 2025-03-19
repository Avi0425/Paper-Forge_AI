import React, { useState, useEffect } from 'react';
import { generateCitations, checkPaperPlagiarism, exportPaperToFormat, generatePaperLatex } from '../services/paperForgeService';
import { 
  ArrowLeft, Save, FileUp, Download, BookOpen, 
  FileCode, Search, CheckCircle, AlertTriangle, 
  ChevronDown, ChevronUp, Edit, Eye, Code, Trash2
} from 'lucide-react';

interface ProjectProps {
  id: string;
  title: string;
  lastEdited: string;
  progress: number;
  template: string;
  plagiarismScore: number;
}

interface ProjectEditorProps {
  project: ProjectProps | undefined;
  onBack: () => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [isLoading, setIsLoading] = useState({
    citations: false,
    plagiarism: false,
    export: false
  });
  const [paperData, setPaperData] = useState<any>(null);
  const [showPlagiarism, setShowPlagiarism] = useState(false);
  const [sections, setSections] = useState([
    { id: 'abstract', title: 'Abstract', expanded: true },
    { id: 'introduction', title: 'Introduction', expanded: true },
    { id: 'methods', title: 'Methods', expanded: false },
    { id: 'results', title: 'Results', expanded: false },
    { id: 'discussion', title: 'Discussion', expanded: false },
    { id: 'conclusion', title: 'Conclusion', expanded: false },
    { id: 'references', title: 'References', expanded: false },
  ]);

  // Mock content for the paper
  const paperContent = {
    abstract: `This paper presents a novel approach to machine learning that combines traditional neural networks with quantum computing principles. We demonstrate that our hybrid model achieves superior performance on benchmark datasets while requiring significantly less computational resources.`,
    introduction: `Machine learning has revolutionized numerous fields, from computer vision to natural language processing. However, current approaches face limitations in terms of computational efficiency and scalability. Quantum computing offers potential solutions to these challenges by leveraging quantum mechanical phenomena such as superposition and entanglement.

In this paper, we introduce a hybrid quantum-classical machine learning architecture that bridges the gap between these two paradigms. Our approach utilizes quantum circuits for feature extraction and dimensionality reduction, while employing classical neural networks for the final classification or regression tasks.`,
    methods: `We implemented our hybrid model using a combination of quantum circuits designed in Qiskit and classical neural networks built with TensorFlow. The quantum component consists of parameterized quantum circuits (PQCs) with a variable number of qubits depending on the input dimensionality.

For the classical component, we employed a multi-layer perceptron with ReLU activations and dropout regularization. The model was trained using the Adam optimizer with a learning rate of 0.001 and a batch size of 64.`,
    results: `Our hybrid model achieved an accuracy of 97.8% on the MNIST dataset, outperforming classical convolutional neural networks (96.2%) while using only 25% of the parameters. On the more challenging CIFAR-10 dataset, our model achieved 89.3% accuracy, comparable to state-of-the-art classical models but with significantly reduced training time.

Figure 1 shows the comparison of training curves between our hybrid model and classical baselines. The hybrid model converges faster and achieves better final performance.`,
    discussion: `The results demonstrate that quantum-enhanced machine learning can offer advantages in both performance and efficiency. The quantum circuits effectively capture complex patterns in the data that would require more parameters in a purely classical model.

However, we also observed limitations related to the current state of quantum hardware. Noise and decoherence remain significant challenges, particularly for deeper quantum circuits. Our simulations suggest that error mitigation techniques will be crucial for practical implementations on near-term quantum devices.`,
    conclusion: `We have presented a hybrid quantum-classical machine learning architecture that leverages the strengths of both paradigms. Our results demonstrate that even with limited quantum resources, significant improvements in performance and efficiency are possible.

Future work will focus on implementing our approach on actual quantum hardware and developing more sophisticated error mitigation techniques. We also plan to explore applications in other domains, such as natural language processing and drug discovery.`,
    references: `[1] Biamonte, J., Wittek, P., Pancotti, N., Rebentrost, P., Wiebe, N., & Lloyd, S. (2017). Quantum machine learning. Nature, 549(7671), 195-202.

[2] Havlíček, V., Córcoles, A. D., Temme, K., Harrow, A. W., Kandala, A., Chow, J. M., & Gambetta, J. M. (2019). Supervised learning with quantum-enhanced feature spaces. Nature, 567(7747), 209-212.

[3] Schuld, M., Sinayskiy, I., & Petruccione, F. (2015). An introduction to quantum machine learning. Contemporary Physics, 56(2), 172-185.

[4] Dunjko, V., & Briegel, H. J. (2018). Machine learning & artificial intelligence in the quantum domain: a review of recent progress. Reports on Progress in Physics, 81(7), 074001.`
  };

  // Mock plagiarism data
  const plagiarismData = [
    { section: 'abstract', startPos: 45, endPos: 90, source: 'Smith et al. (2022), Quantum Computing Review' },
    { section: 'introduction', startPos: 180, endPos: 240, source: 'Johnson (2021), Introduction to Machine Learning' },
    { section: 'methods', startPos: 50, endPos: 120, source: 'Quantum Computing Textbook (2023)' },
  ];

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, expanded: !section.expanded } : section
    ));
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'preview' ? 'code' : 'preview');
  };

  // LaTeX code for the current paper
  const latexCode = `\\documentclass[12pt]{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage[utf8]{inputenc}
\\usepackage[english]{babel}

\\title{${project?.title || 'Research Paper'}}
\\author{John Doe}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
${paperContent.abstract}
\\end{abstract}

\\section{Introduction}
${paperContent.introduction}

\\section{Methods}
${paperContent.methods}

\\section{Results}
${paperContent.results}

\\section{Discussion}
${paperContent.discussion}

\\section{Conclusion}
${paperContent.conclusion}

\\section{References}
\\begin{thebibliography}{99}
${paperContent.references.split('\n\n').map((ref, i) => 
  `\\bibitem{ref${i+1}} ${ref.substring(4)}`
).join('\n')}
\\end{thebibliography}

\\end{document}`;

  // Initialize paper data when component mounts
  useEffect(() => {
    if (project) {
      setPaperData({
        title: project.title,
        author: 'John Doe', // In a real app, this would come from user profile
        content: paperContent
      });
    }
  }, [project]);

  // Handle plagiarism check
  const handlePlagiarismCheck = async () => {
    if (!paperData) return;
    
    setIsLoading(prev => ({ ...prev, plagiarism: true }));
    try {
      const result = await checkPaperPlagiarism(paperData);
      setPaperData(result);
      setActiveTab('plagiarism');
      setShowPlagiarism(true);
    } catch (error) {
      console.error('Error checking plagiarism:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, plagiarism: false }));
    }
  };

  // Handle citation generation
  const handleGenerateCitations = async () => {
    if (!paperData) return;
    
    setIsLoading(prev => ({ ...prev, citations: true }));
    try {
      const result = await generateCitations(paperData);
      setPaperData(result);
      setActiveTab('citations');
    } catch (error) {
      console.error('Error generating citations:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, citations: false }));
    }
  };

  // Handle export
  const handleExport = async (format: 'pdf' | 'docx' | 'latex' = 'pdf') => {
    if (!paperData) return;
    
    setIsLoading(prev => ({ ...prev, export: true }));
    try {
      if (format === 'latex') {
        // Generate LaTeX code and switch to code view
        const latexCode = generatePaperLatex(paperData);
        setViewMode('code');
      } else {
        // Export to file format
        await exportPaperToFormat(paperData, format);
      }
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, export: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="p-2 rounded-md hover:bg-gray-100 mr-4"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{project?.title || 'Research Paper'}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              onClick={() => handlePlagiarismCheck()}
              disabled={isLoading.plagiarism}
            >
              <CheckCircle className={`h-5 w-5 mr-2 ${isLoading.plagiarism ? 'animate-spin text-blue-500' : 'text-gray-500'}`} />
              {isLoading.plagiarism ? 'Checking...' : 'Check Plagiarism'}
            </button>
            <div className="relative group">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                onClick={() => handleExport()}
                disabled={isLoading.export}
              >
                <Download className={`h-5 w-5 mr-2 ${isLoading.export ? 'animate-spin' : ''}`} />
                {isLoading.export ? 'Exporting...' : 'Export'}
              </button>
              <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button onClick={() => handleExport('pdf')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Export as PDF</button>
                  <button onClick={() => handleExport('docx')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Export as DOCX</button>
                  <button onClick={() => handleExport('latex')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Export as LaTeX</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('editor')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'editor'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'research'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Research Assistant
            </button>
            <button
              onClick={() => {
                setActiveTab('citations');
                if (!paperData?.citations) {
                  handleGenerateCitations();
                }
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'citations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Citations
            </button>
            <button
              onClick={() => {
                setActiveTab('plagiarism');
                if (!paperData?.plagiarismResult) {
                  handlePlagiarismCheck();
                }
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'plagiarism'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Plagiarism Check
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'editor' && (
            <div className="flex flex-col md:flex-row h-full">
              {/* Document Structure */}
              <div className="w-full md:w-64 bg-white rounded-lg shadow-sm overflow-hidden mr-6 flex-shrink-0 mb-6 md:mb-0">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Document Structure</h2>
                </div>
                <div className="p-2">
                  {sections.map(section => (
                    <div key={section.id} className="mb-1">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                      >
                        <span className="font-medium text-gray-700">{section.title}</span>
                        {section.expanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      {section.expanded && (
                        <div className="pl-4 pr-2 py-2">
                          <p className="text-sm text-gray-600">
                            {paperContent[section.id as keyof typeof paperContent]?.substring(0, 50)}...
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor/Preview */}
              <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    {viewMode === 'preview' ? 'Document Preview' : 'LaTeX Code'}
                  </h2>
                  <div className="flex items-center">
                    <button
                      onClick={toggleViewMode}
                      className="flex items-center px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      {viewMode === 'preview' ? (
                        <>
                          <Code className="h-4 w-4 mr-1" />
                          <span>View Code</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          <span>View Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                  {viewMode === 'preview' ? (
                    <div className="latex-preview">
                      <h1 className="text-2xl font-bold mb-6 text-center">{project?.title || 'Research Paper'}</h1>
                      <p className="text-center mb-8">John Doe</p>
                      
                      <h2 className="text-xl font-bold mb-2">Abstract</h2>
                      <p className="mb-6">{paperContent.abstract}</p>
                      
                      <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
                      <p className="mb-6 relative">
                        {showPlagiarism && plagiarismData.some(p => p.section === 'introduction') && (
                          <span 
                            className="bg-yellow-200 absolute" 
                            style={{ 
                              left: plagiarismData.find(p => p.section === 'introduction')?.startPos, 
                              width: (plagiarismData.find(p => p.section === 'introduction')?.endPos || 0) - 
                                    (plagiarismData.find(p => p.section === 'introduction')?.startPos || 0)
                            }}
                          ></span>
                        )}
                        {paperContent.introduction}
                      </p>
                      
                      <h2 className="text-xl font-bold mb-2">2. Methods</h2>
                      <p className="mb-6 relative">
                        {showPlagiarism && plagiarismData.some(p => p.section === 'methods') && (
                          <span 
                            className="bg-yellow-200 absolute" 
                            style={{ 
                              left: plagiarismData.find(p => p.section === 'methods')?.startPos, 
                              width: (plagiarismData.find(p => p.section === 'methods')?.endPos || 0) - 
                                    (plagiarismData.find(p => p.section === 'methods')?.startPos || 0)
                            }}
                          ></span>
                        )}
                        {paperContent.methods}
                      </p>
                      
                      <h2 className="text-xl font-bold mb-2">3. Results</h2>
                      <p className="mb-6">{paperContent.results}</p>
                      
                      <h2 className="text-xl font-bold mb-2">4. Discussion</h2>
                      <p className="mb-6">{paperContent.discussion}</p>
                      
                      <h2 className="text-xl font-bold mb-2">5. Conclusion</h2>
                      <p className="mb-6">{paperContent.conclusion}</p>
                      
                      <h2 className="text-xl font-bold mb-2">References</h2>
                      <div className="pl-8 text-sm space-y-2">
                        {paperContent.references.split('\n\n').map((reference, index) => (
                          <p key={index} className="relative">
                            {reference}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm font-mono">
                      {latexCode}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">AI Research Assistant</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="research-query" className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to research?
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="research-query"
                      className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="E.g., Recent advances in quantum machine learning"
                    />
                    <button 
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => {
                        // In a real implementation, this would call an API to search for research topics
                        // For now, we'll just show a loading state and then switch to the research tab
                        setIsLoading(prev => ({ ...prev, research: true }));
                        setTimeout(() => {
                          setIsLoading(prev => ({ ...prev, research: false }));
                        }, 1500);
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Suggested Research Topics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900">Quantum Neural Networks</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Explore the intersection of quantum computing and neural networks.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900">Variational Quantum Algorithms</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Learn about QAOA, VQE, and other variational approaches.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900">Quantum Feature Maps</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Understand how quantum computers can transform classical data.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900">Quantum Error Mitigation</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Techniques to reduce the impact of noise in quantum computations.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Research Gap Analysis</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      Based on your current paper and recent literature, we've identified the following research gaps:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Limited exploration of quantum feature maps for high-dimensional data</li>
                      <li>Few studies on the interpretability of quantum machine learning models</li>
                      <li>Lack of benchmarking on real quantum hardware for hybrid models</li>
                      <li>Insufficient analysis of the quantum advantage threshold for different problem classes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'citations' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Citation Management</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="citation-search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search for papers to cite
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="citation-search"
                      className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="E.g., Quantum machine learning review"
                    />
                    <button 
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={handleGenerateCitations}
                      disabled={isLoading.citations}
                    >
                      {isLoading.citations ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-md font-medium text-gray-900">Current Citations</h3>
                    <div className="flex items-center">
                      <label htmlFor="citation-style" className="block text-sm font-medium text-gray-700 mr-2">
                        Style:
                      </label>
                      <select
                        id="citation-style"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>IEEE</option>
                        <option>APA</option>
                        <option>MLA</option>
                        <option>Chicago</option>
                      </select>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {paperContent.references.split('\n\n').map((reference, index) => (
                      <div key={index} className="p-4 flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-900">{reference}</p>
                        </div>
                        <div className="flex items-center ml-4">
                          <button className="p-1 text-gray-400 hover:text-gray-500">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-500 ml-1">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Suggested Citations</h3>
                  <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-900">
                          Cerezo, M., Arrasmith, A., Babbush, R., Benjamin, S. C., Endo, S., Fujii, K., ... & Yuan, X. (2021). Variational quantum algorithms. Nature Reviews Physics, 3(9), 625-644.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Relevance: High - Discusses variational quantum algorithms mentioned in your methods section.
                        </p>
                      </div>
                      <button className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
                        Add
                      </button>
                    </div>
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-900">
                          Huang, H. Y., Broughton, M., Mohseni, M., Babbush, R., Boixo, S., Neven, H., & McClean, J. R. (2021). Power of data in quantum machine learning. Nature communications, 12(1), 2631.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Relevance: Medium - Explores the role of classical data in quantum machine learning performance.
                        </p>
                      </div>
                      <button className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
                        Add
                      </button>
                    </div>
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-900">
                          Bharti, K., Cervera-Lierta, A., Kyaw, T. H., Haug, T., Alperin-Lea, S., Anand, A., ... & Perdomo-Ortiz, A. (2022). Noisy intermediate-scale quantum algorithms. Reviews of Modern Physics, 94(1), 015004.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Relevance: High - Comprehensive review of NISQ algorithms relevant to your hybrid approach.
                        </p>
                      </div>
                      <button className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plagiarism' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Plagiarism Check</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">Overall Similarity Score</h3>
                      <p className="text-sm text-gray-600">Based on analysis of your entire document</p>
                    </div>
                    <button 
                      onClick={() => setShowPlagiarism(!showPlagiarism)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {showPlagiarism ? 'Hide Highlights' : 'Show Highlights'}
                    </button>
                  </div>
                  <div className="mt-4 bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-900">{project?.plagiarismScore || 3.1}%</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        (project?.plagiarismScore || 3.1) < 5 ? 'bg-green-100 text-green-800' : 
                        (project?.plagiarismScore || 3.1) < 15 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {(project?.plagiarismScore || 3.1) < 5 ? 'Low Similarity' : 
                         (project?.plagiarismScore || 3.1) < 15 ? 'Moderate Similarity' : 
                         'High Similarity'}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="plagiarism-indicator w-full h-2.5"></div>
                      <div 
                        className="plagiarism-marker" 
                        style={{ left: `${Math.min((project?.plagiarismScore || 3.1), 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Similarity by Section</h3>
                  <div className="space-y-4">
                    {sections.map(section => (
                      <div key={section.id} className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{section.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            section.id === 'abstract' ? 'bg-yellow-100 text-yellow-800' : 
                            section.id === 'introduction' ? 'bg-yellow-100 text-yellow-800' : 
                            section.id === 'methods' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {section.id === 'abstract' ? '4.2%' : 
                             section.id === 'introduction' ? '6.8%' : 
                             section.id === 'methods' ? '5.3%' : 
                             '< 2%'}
                          </span>
                        </div>
                        {(section.id === 'abstract' || section.id === 'introduction' || section.id === 'methods') && (
                          <div className="mt-2">
                            <div className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-gray-700">
                                  {section.id === 'abstract' ? 
                                    'Potential similarity with Smith et al. (2022), Quantum Computing Review' :
                                   section.id === 'introduction' ? 
                                    'Potential similarity with Johnson (2021), Introduction to Machine Learning' :
                                    'Potential similarity with Quantum Computing Textbook (2023)'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Consider rephrasing or adding proper citation.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Revision Suggestions</h3>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-700">
                          AI-Powered Revision Suggestions
                        </p>
                        <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc pl-5">
                          <li>In the abstract, consider rephrasing "combines traditional neural networks with quantum computing principles" to use your own unique description.</li>
                          <li>Add citations to support claims about quantum computing advantages in the introduction.</li>
                          <li>The methods section contains technical terminology that appears in standard textbooks. Consider adding more details about your specific implementation.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectEditor;
