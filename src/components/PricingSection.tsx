import React from 'react';
import { CheckCircle, Zap, Users, Star } from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your research needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Free Plan */}
          <div className="pricing-card bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Free</h3>
            <p className="mt-4 text-gray-600">Try before you commit</p>
            <p className="mt-6 text-4xl font-bold text-gray-900">$0<span className="text-xl text-gray-500">/month</span></p>
            <ul className="mt-6 space-y-4 min-h-[240px]">
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
            <ul className="mt-6 space-y-4 min-h-[240px]">
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
            <ul className="mt-6 space-y-4 min-h-[240px] text-white">
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
            <ul className="mt-6 space-y-4 min-h-[240px]">
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
            Need a custom plan for your institution?{' '}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Contact us
            </a>{' '}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
