import React, { useState } from 'react';
import { 
  FileUp, BookOpen, FileCode, Search, CheckCircle, Download, 
  Home, History, Settings, LogOut, Plus, Edit, Trash2, 
  FileText, Clock, AlertCircle, MessageSquare, ArrowRight, Lightbulb, X
} from 'lucide-react';
import ProjectEditor from './ProjectEditor';
import AIChat from './AIChat';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  
  // Mock projects data with content
  const projects = [
    { 
      id: '1', 
      title: 'Machine Learning Research Paper', 
      lastEdited: '2 hours ago',
      progress: 75,
      template: 'IEEE',
      plagiarismScore: 2.3,
      content: {
        abstract: 'This paper explores recent advances in machine learning techniques, focusing on deep neural networks and their applications in computer vision and natural language processing.',
        introduction: 'Machine learning has revolutionized numerous fields in recent years. This paper examines the latest developments and their implications for future research.',
        methods: 'We employed a combination of convolutional neural networks and transformer architectures to analyze our dataset, which consists of over 10,000 labeled images and text samples.',
        results: 'Our hybrid approach achieved 94.7% accuracy on the benchmark dataset, outperforming previous methods by a significant margin.',
        discussion: 'The results demonstrate the effectiveness of combining multiple architectural paradigms for complex tasks that span different data modalities.',
        conclusion: 'We have shown that hybrid architectures can effectively bridge the gap between vision and language tasks, opening new avenues for multimodal learning.',
        references: 'LeCun, Y., et al. (2015). Deep learning. Nature, 521(7553), 436-444.\n\nVaswani, A., et al. (2017). Attention is all you need. Advances in neural information processing systems, 30.'
      }
    },
    { 
      id: '2', 
      title: 'Climate Change Analysis', 
      lastEdited: '1 day ago',
      progress: 45,
      template: 'APA',
      plagiarismScore: 5.7,
      content: {
        abstract: 'This analysis examines the current state of climate change research, with a focus on recent temperature trends and their implications for policy decisions.',
        introduction: 'Climate change represents one of the most significant challenges facing humanity today. This paper analyzes recent data and projections.',
        methods: 'We collected temperature data from over 1,000 weather stations worldwide and analyzed trends using statistical methods including linear regression and time series analysis.',
        results: 'Global temperatures have increased by an average of 1.1°C since pre-industrial times, with the rate of warming accelerating in recent decades.',
        discussion: 'The observed warming trends align with climate model predictions and indicate that urgent action is needed to mitigate further temperature increases.',
        conclusion: 'Our analysis supports the scientific consensus that human-induced climate change is occurring at an unprecedented rate and requires immediate policy responses.',
        references: 'IPCC. (2021). Climate Change 2021: The Physical Science Basis.\n\nHansen, J., et al. (2016). Ice melt, sea level rise and superstorms. Atmospheric Chemistry and Physics, 16(6), 3761-3812.'
      }
    },
    { 
      id: '3', 
      title: 'Quantum Computing Review', 
      lastEdited: '3 days ago',
      progress: 90,
      template: 'ACM',
      plagiarismScore: 1.2,
      content: {
        abstract: 'This review examines the current state of quantum computing, focusing on recent hardware advances, quantum algorithms, and potential applications in cryptography and optimization.',
        introduction: 'Quantum computing has progressed rapidly in recent years, moving from theoretical concepts to practical implementations with increasing qubit counts and coherence times.',
        methods: 'We surveyed the literature on quantum computing from 2015-2023, focusing on experimental implementations, algorithmic advances, and application domains.',
        results: 'Current quantum computers have reached up to 127 qubits, though noise and decoherence remain significant challenges for practical applications.',
        discussion: 'While quantum supremacy demonstrations have shown the potential of quantum computing, practical quantum advantage for real-world problems remains elusive.',
        conclusion: 'Quantum computing is at an inflection point, with hardware improvements potentially enabling practical applications in the near future, particularly in chemistry simulation and optimization.',
        references: 'Arute, F., et al. (2019). Quantum supremacy using a programmable superconducting processor. Nature, 574(7779), 505-510.\n\nPreskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79.'
      }
    }
  ];

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleBackToDashboard = () => {
    setSelectedProject(null);
  };

  const toggleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    return <ProjectEditor project={project} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 flex items-center">
          <FileCode className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-xl font-bold">Paper Forge AI</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-8 px-4">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'home' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center w-full px-4 py-3 rounded-md mt-2 ${activeTab === 'history' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <History className="h-5 w-5 mr-3" />
              <span>History</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center w-full px-4 py-3 rounded-md mt-2 ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
            <button 
              onClick={toggleAIChat}
              className={`flex items-center w-full px-4 py-3 rounded-md mt-2 ${showAIChat ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>AI Chat</span>
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center w-full px-4 py-3 rounded-md hover:bg-gray-800">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 flex">
        <div className="flex-1">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'home' && (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
                        <p className="text-2xl font-semibold text-gray-900">3</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Time Saved</h3>
                        <p className="text-2xl font-semibold text-gray-900">24 hours</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Avg. Plagiarism Score</h3>
                        <p className="text-2xl font-semibold text-gray-900">3.1%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projects Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Your Projects</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
                      <Plus className="h-5 w-5 mr-2" />
                      New Project
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {projects.map(project => (
                      <div key={project.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Last edited {project.lastEdited}</span>
                              <span className="mx-2">•</span>
                              <span>Template: {project.template}</span>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{project.progress}%</span>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center">
                              <span className="text-sm text-gray-600 mr-2">Plagiarism:</span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    project.plagiarismScore < 3 ? 'bg-green-500' : 
                                    project.plagiarismScore < 10 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(project.plagiarismScore * 10, 100)}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-600">{project.plagiarismScore}%</span>
                            </div>
                          </div>
                          <div className="ml-4 flex items-center space-x-2">
                            <button 
                              onClick={() => handleProjectSelect(project.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Activity History</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Edited "Machine Learning Research Paper"</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Completed plagiarism check on "Quantum Computing Review"</p>
                      <p className="text-sm text-gray-500">Yesterday at 4:23 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Plus className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Created "Climate Change Analysis"</p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Profile Information</h3>
                    <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            defaultValue="John"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            defaultValue="Doe"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Default Settings</h3>
                    <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="citation-style" className="block text-sm font-medium text-gray-700">
                          Default Citation Style
                        </label>
                        <div className="mt-1">
                          <select
                            id="citation-style"
                            name="citation-style"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>APA</option>
                            <option>MLA</option>
                            <option>Chicago</option>
                            <option>IEEE</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                          Default Template
                        </label>
                        <div className="mt-1">
                          <select
                            id="template"
                            name="template"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Academic Journal</option>
                            <option>Conference Paper</option>
                            <option>Thesis</option>
                            <option>Technical Report</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
            {/* AI Chat Section */}
            <AIChat 
              showChat={showAIChat} 
              onClose={toggleAIChat} 
              paperContent={selectedProject ? projects.find(p => p.id === selectedProject)?.content : {}} 
              paperTitle={selectedProject ? projects.find(p => p.id === selectedProject)?.title : ''} 
            />
          </div>
        </div>
    
  );
};

export default Dashboard;
