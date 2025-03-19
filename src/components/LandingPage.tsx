import React, { useEffect } from 'react';
import { FileUp, BookOpen, FileCode, Search, CheckCircle, Download, ArrowRight, Zap, Users, Award, Star } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  // Smooth scrolling implementation
  useEffect(() => {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for header
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FileCode className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Paper Forge AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="scroll-link text-gray-700 hover:text-blue-600">Features</a>
              <a href="#workflow" className="scroll-link text-gray-700 hover:text-blue-600">How It Works</a>
              <a href="#pricing" className="scroll-link text-gray-700 hover:text-blue-600">Pricing</a>
              <button 
                onClick={onLogin}
                className="ml-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-gradient py-16 md:py-24 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Create Publication-Ready <span className="gradient-text">Research Papers</span> with AI
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Paper Forge AI streamlines academic writing with intelligent document processing, 
                citation management, and plagiarism detection.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={onLogin}
                  className="cta-button cta-button-primary px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <a 
                  href="#demo"
                  className="cta-button cta-button-secondary px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  Watch Demo
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Research paper creation" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create high-quality academic papers from start to finish
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Document Processing</h3>
              <p className="mt-2 text-gray-600">
                Upload and process multiple document formats including PDF, DOCX, XLSX, and TXT with intelligent text extraction.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">AI Research Assistant</h3>
              <p className="mt-2 text-gray-600">
                Generate content, synthesize literature reviews, and identify research gaps with our advanced AI.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileCode className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">LaTeX Generation</h3>
              <p className="mt-2 text-gray-600">
                Automatically format your research to academic standards with customizable templates and real-time preview.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Search className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Citation Management</h3>
              <p className="mt-2 text-gray-600">
                Get automatic citation suggestions and support for multiple citation styles (APA, MLA, Chicago, IEEE).
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Plagiarism Detection</h3>
              <p className="mt-2 text-gray-600">
                Check your work in real-time with detailed similarity reports and get suggestions to improve originality.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Export Options</h3>
              <p className="mt-2 text-gray-600">
                Export your work in multiple formats with journal-specific formatting presets for submission-ready documents.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div id="workflow" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined workflow makes academic writing faster and more efficient
            </p>
          </div>

          <div className="mt-16 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Upload Materials</h3>
                <p className="mt-2 text-gray-600">
                  Upload research materials or enter text directly into the platform.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">AI Processing</h3>
                <p className="mt-2 text-gray-600">
                  Our AI structures your content and suggests improvements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Review & Edit</h3>
                <p className="mt-2 text-gray-600">
                  Review the generated paper, edit content, and check for plagiarism.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Export</h3>
                <p className="mt-2 text-gray-600">
                  Export your publication-ready paper with LaTeX code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16 pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Pricing Plans</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your research needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="pricing-card bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Free</h3>
              <p className="mt-4 text-gray-600">Try before you commit</p>
              <p className="mt-6 text-4xl font-bold text-gray-900">$0<span className="text-xl text-gray-500">/month</span></p>
              <ul className="mt-6 space-y-4">
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>1 complete research paper</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Basic document processing</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Standard templates</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Limited AI assistance</span>
                </li>
              </ul>
              <button className="cta-button mt-8 w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Get Started
              </button>
            </div>

            {/* Basic Plan */}
            <div className="pricing-card bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Basic</h3>
              <p className="mt-4 text-gray-600">For individual researchers</p>
              <p className="mt-6 text-4xl font-bold text-gray-900">$9<span className="text-xl text-gray-500">/month</span></p>
              <ul className="mt-6 space-y-4">
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>5 projects</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Basic AI assistance</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Standard templates</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Basic plagiarism check</span>
                </li>
              </ul>
              <button className="cta-button mt-8 w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card popular bg-blue-600 p-8 rounded-lg shadow-md relative">
              <div className="popular-badge">Most Popular</div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <p className="mt-4 text-blue-100">For serious academics</p>
              <p className="mt-6 text-4xl font-bold text-white">$19<span className="text-xl text-blue-200">/month</span></p>
              <ul className="mt-6 space-y-4 text-white">
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Unlimited projects</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Advanced AI research assistant</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>All citation styles</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Comprehensive plagiarism detection</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Journal-specific formatting</span>
                </li>
              </ul>
              <button className="cta-button mt-8 w-full px-4 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                Get Started
              </button>
            </div>

            {/* Team Plan */}
            <div className="pricing-card bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Team</h3>
              <p className="mt-4 text-gray-600">For research groups</p>
              <p className="mt-6 text-4xl font-bold text-gray-900">$49<span className="text-xl text-gray-500">/month</span></p>
              <ul className="mt-6 space-y-4">
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited projects</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Premium AI features</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Team collaboration tools</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Advanced plagiarism detection</span>
                </li>
                <li className="feature-list-item">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="cta-button mt-8 w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Get Started
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Need a custom plan for your institution? <a href="#" className="text-blue-600 font-medium hover:underline">Contact us</a> for enterprise pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Credentials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Academics Worldwide</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of researchers who trust Paper Forge AI for their academic writing
            </p>
          </div>

          <section className="mt-12 relative overflow-hidden">
            <div className="flex w-full overflow-hidden">
              <div className="flex animate-scroll">
                {[1, 2, 3].map((set) => (
                  <div key={set} className="flex min-w-full">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={`${set}-${item}`} className="w-1/5 px-8 flex items-center justify-center">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Bennett_University_Logo.svg/1200px-Bennett_University_Logo.svg.png"
                          alt="Bennett University logo" 
                          className="h-16 object-contain filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <FileCode className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Paper Forge AI</span>
              </div>
              <p className="mt-4 text-gray-400">
                Advanced research paper creation platform powered by artificial intelligence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="scroll-link text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#workflow" className="scroll-link text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#pricing" className="scroll-link text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 Paper Forge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
