/**
 * Document Processor Service
 * Handles processing raw data into structured research paper format
 */

import { Section } from '../types/paper';

/**
 * Processes raw text data into structured paper sections
 * @param rawData The raw text data to process
 * @returns Object containing structured paper sections
 */
export const processRawData = (rawData: string): Record<string, string> => {
  // This is a simplified implementation
  // In a real application, this would use NLP to identify sections
  const sections: Record<string, string> = {
    abstract: '',
    introduction: '',
    methods: '',
    results: '',
    discussion: '',
    conclusion: '',
    references: ''
  };

  // Simple logic to extract sections based on keywords
  const lines = rawData.split('\n');
  let currentSection: keyof typeof sections | null = null;

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    if (lowerLine.includes('abstract')) {
      currentSection = 'abstract';
      continue;
    } else if (lowerLine.includes('introduction') || lowerLine.includes('background')) {
      currentSection = 'introduction';
      continue;
    } else if (lowerLine.includes('method') || lowerLine.includes('methodology')) {
      currentSection = 'methods';
      continue;
    } else if (lowerLine.includes('result')) {
      currentSection = 'results';
      continue;
    } else if (lowerLine.includes('discussion')) {
      currentSection = 'discussion';
      continue;
    } else if (lowerLine.includes('conclusion')) {
      currentSection = 'conclusion';
      continue;
    } else if (lowerLine.includes('reference') || lowerLine.includes('bibliography')) {
      currentSection = 'references';
      continue;
    }

    if (currentSection) {
      sections[currentSection] += line + '\n';
    }
  }

  // Trim whitespace from all sections
  Object.keys(sections).forEach(key => {
    sections[key as keyof typeof sections] = sections[key as keyof typeof sections].trim();
  });

  return sections;
};

/**
 * Converts paper content to LaTeX format
 * @param title Paper title
 * @param author Paper author
 * @param content Object containing paper content by section
 * @returns LaTeX formatted string
 */
export const generateLatex = (
  title: string,
  author: string,
  content: Record<string, string>
): string => {
  return `\\documentclass[12pt]{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage[utf8]{inputenc}
\\usepackage[english]{babel}

\\title{${title}}
\\author{${author}}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
${content.abstract}
\\end{abstract}

\\section{Introduction}
${content.introduction}

\\section{Methods}
${content.methods}

\\section{Results}
${content.results}

\\section{Discussion}
${content.discussion}

\\section{Conclusion}
${content.conclusion}

\\section{References}
\\begin{thebibliography}{99}
${formatReferences(content.references)}
\\end{thebibliography}

\\end{document}`;
};

/**
 * Formats references for LaTeX bibliography
 * @param references Raw references text
 * @returns Formatted LaTeX bibliography entries
 */
const formatReferences = (references: string): string => {
  if (!references) return '';
  
  // Split references by newline and filter out empty lines
  const refList = references.split('\n\n').filter(ref => ref.trim() !== '');
  
  // Format each reference as a bibitem
  return refList.map((ref, i) => {
    // If reference starts with [X], remove that part
    const cleanRef = ref.replace(/^\[\d+\]\s*/, '');
    return `\\bibitem{ref${i+1}} ${cleanRef}`;
  }).join('\n');
};

/**
 * Uploads a file and processes its content
 * @param file The file to upload and process
 * @returns Promise resolving to the processed content
 */
export const uploadAndProcessFile = async (file: File): Promise<Record<string, string>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const processedData = processRawData(text);
        resolve(processedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};