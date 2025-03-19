/**
 * Paper Types
 * Type definitions for research paper data structures
 */

/**
 * Section of a research paper
 */
export enum Section {
  Abstract = 'abstract',
  Introduction = 'introduction',
  Methods = 'methods',
  Results = 'results',
  Discussion = 'discussion',
  Conclusion = 'conclusion',
  References = 'references'
}

/**
 * Paper metadata
 */
export interface PaperMetadata {
  title: string;
  author: string;
  date?: Date;
  keywords?: string[];
  institution?: string;
}

/**
 * Citation interface
 */
export interface Citation {
  id: string;
  title: string;
  authors: string;
  journal?: string;
  conference?: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
}

/**
 * Citation suggestion with relevance information
 */
export interface CitationSuggestion {
  citation: Citation;
  relevance: 'High' | 'Medium' | 'Low';
  reason: string;
}

/**
 * Plagiarism match information
 */
export interface PlagiarismMatch {
  section: string;
  startPos: number;
  endPos: number;
  source: string;
  text: string;
  similarity: number;
}

/**
 * Plagiarism result
 */
export interface PlagiarismResult {
  score: number;
  matches: PlagiarismMatch[];
  highlights?: Record<string, {
    text: string;
    highlights: {
      start: number;
      end: number;
      source: string;
    }[];
  }>;
  report?: string;
}

/**
 * Complete paper data structure
 */
export interface Paper {
  metadata: PaperMetadata;
  content: Record<string, string>;
  citations?: CitationSuggestion[];
  plagiarismResult?: PlagiarismResult;
  latexCode?: string;
}

/**
 * Paper project information
 */
export interface PaperProject {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  paper?: Paper;
}