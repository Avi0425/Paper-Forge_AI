/**
 * Citation Service
 * Handles citation suggestions, formatting, and management
 */

interface Citation {
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

type CitationStyle = 'IEEE' | 'APA' | 'MLA' | 'Chicago';

/**
 * Search for citations based on a query
 * @param query The search query
 * @param limit Maximum number of results to return
 * @returns Promise resolving to an array of citations
 */
export const searchCitations = async (query: string, limit: number = 10): Promise<Citation[]> => {
  // In a real implementation, this would call an external API like Crossref, Google Scholar, or Semantic Scholar
  // For now, we'll return mock data based on the query
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  const mockCitations: Citation[] = [
    {
      id: 'c1',
      title: 'Quantum machine learning',
      authors: 'Biamonte, J., Wittek, P., Pancotti, N., Rebentrost, P., Wiebe, N., & Lloyd, S.',
      journal: 'Nature',
      year: 2017,
      volume: '549',
      issue: '7671',
      pages: '195-202',
      doi: '10.1038/nature23474'
    },
    {
      id: 'c2',
      title: 'Supervised learning with quantum-enhanced feature spaces',
      authors: 'Havlíček, V., Córcoles, A. D., Temme, K., Harrow, A. W., Kandala, A., Chow, J. M., & Gambetta, J. M.',
      journal: 'Nature',
      year: 2019,
      volume: '567',
      issue: '7747',
      pages: '209-212',
      doi: '10.1038/s41586-019-0980-2'
    },
    {
      id: 'c3',
      title: 'An introduction to quantum machine learning',
      authors: 'Schuld, M., Sinayskiy, I., & Petruccione, F.',
      journal: 'Contemporary Physics',
      year: 2015,
      volume: '56',
      issue: '2',
      pages: '172-185',
      doi: '10.1080/00107514.2014.964942'
    },
    {
      id: 'c4',
      title: 'Machine learning & artificial intelligence in the quantum domain: a review of recent progress',
      authors: 'Dunjko, V., & Briegel, H. J.',
      journal: 'Reports on Progress in Physics',
      year: 2018,
      volume: '81',
      issue: '7',
      pages: '074001',
      doi: '10.1088/1361-6633/aab406'
    },
    {
      id: 'c5',
      title: 'Variational quantum algorithms',
      authors: 'Cerezo, M., Arrasmith, A., Babbush, R., Benjamin, S. C., Endo, S., Fujii, K., ... & Yuan, X.',
      journal: 'Nature Reviews Physics',
      year: 2021,
      volume: '3',
      issue: '9',
      pages: '625-644',
      doi: '10.1038/s42254-021-00348-9'
    }
  ];
  
  // Filter citations based on query (case-insensitive)
  const lowerQuery = query.toLowerCase();
  const filteredCitations = mockCitations.filter(citation => 
    citation.title.toLowerCase().includes(lowerQuery) ||
    citation.authors.toLowerCase().includes(lowerQuery) ||
    (citation.journal && citation.journal.toLowerCase().includes(lowerQuery))
  );
  
  return filteredCitations.slice(0, limit);
};

/**
 * Format a citation according to a specific style
 * @param citation The citation to format
 * @param style The citation style to use
 * @returns Formatted citation string
 */
export const formatCitation = (citation: Citation, style: CitationStyle): string => {
  switch (style) {
    case 'IEEE':
      return formatIEEE(citation);
    case 'APA':
      return formatAPA(citation);
    case 'MLA':
      return formatMLA(citation);
    case 'Chicago':
      return formatChicago(citation);
    default:
      return formatIEEE(citation);
  }
};

/**
 * Format a citation in IEEE style
 */
const formatIEEE = (citation: Citation): string => {
  const authors = citation.authors;
  const title = citation.title;
  const journal = citation.journal || citation.conference || '';
  const year = citation.year;
  const volume = citation.volume ? `vol. ${citation.volume}` : '';
  const issue = citation.issue ? `no. ${citation.issue}` : '';
  const pages = citation.pages ? `pp. ${citation.pages}` : '';
  
  return `${authors}, "${title}," ${journal}, ${volume}${issue ? ', ' + issue : ''}, ${pages}, ${year}.`;
};

/**
 * Format a citation in APA style
 */
const formatAPA = (citation: Citation): string => {
  const authors = citation.authors;
  const year = citation.year;
  const title = citation.title;
  const journal = citation.journal || citation.conference || '';
  const volume = citation.volume || '';
  const issue = citation.issue ? `(${citation.issue})` : '';
  const pages = citation.pages || '';
  
  return `${authors} (${year}). ${title}. ${journal}, ${volume}${issue}, ${pages}.`;
};

/**
 * Format a citation in MLA style
 */
const formatMLA = (citation: Citation): string => {
  const authors = citation.authors;
  const title = `"${citation.title}."` ;
  const journal = citation.journal || citation.conference || '';
  const volume = citation.volume || '';
  const issue = citation.issue ? `.${citation.issue}` : '';
  const year = citation.year;
  const pages = citation.pages ? `pp. ${citation.pages}` : '';
  
  return `${authors}. ${title} ${journal}, vol. ${volume}${issue}, ${year}, ${pages}.`;
};

/**
 * Format a citation in Chicago style
 */
const formatChicago = (citation: Citation): string => {
  const authors = citation.authors;
  const title = `"${citation.title}."` ;
  const journal = citation.journal || citation.conference || '';
  const volume = citation.volume || '';
  const issue = citation.issue ? `, no. ${citation.issue}` : '';
  const year = citation.year;
  const pages = citation.pages || '';
  
  return `${authors}. ${title} ${journal} ${volume}${issue} (${year}): ${pages}.`;
};

/**
 * Generate citation suggestions based on paper content
 * @param content The paper content by section
 * @param limit Maximum number of suggestions to return
 * @returns Promise resolving to an array of suggested citations
 */
export const generateCitationSuggestions = async (
  content: Record<string, string>,
  limit: number = 5
): Promise<{citation: Citation, relevance: 'High' | 'Medium' | 'Low', reason: string}[]> => {
  // In a real implementation, this would analyze the paper content and use an API
  // to find relevant citations. For now, we'll return mock suggestions.
  
  // Extract keywords from content
  const allContent = Object.values(content).join(' ');
  const keywords = extractKeywords(allContent);
  
  // Get citations based on keywords
  const citations = await searchCitations(keywords.join(' '), 10);
  
  // Assign relevance and reasons
  const suggestions = citations.map(citation => {
    // Determine relevance based on keyword matches
    const titleMatches = keywords.filter(kw => citation.title.toLowerCase().includes(kw.toLowerCase())).length;
    let relevance: 'High' | 'Medium' | 'Low' = 'Low';
    
    if (titleMatches >= 3) {
      relevance = 'High';
    } else if (titleMatches >= 1) {
      relevance = 'Medium';
    }
    
    // Generate a reason for the suggestion
    let reason = '';
    if (relevance === 'High') {
      reason = `Strongly related to your paper's focus on ${keywords.slice(0, 2).join(' and ')}.`;
    } else if (relevance === 'Medium') {
      reason = `Contains relevant information about ${keywords[0]}.`;
    } else {
      reason = `May provide additional context for your research.`;
    }
    
    return { citation, relevance, reason };
  });
  
  // Sort by relevance and limit results
  return suggestions
    .sort((a, b) => {
      const relevanceOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return relevanceOrder[a.relevance] - relevanceOrder[b.relevance];
    })
    .slice(0, limit);
};

/**
 * Extract keywords from text content
 * @param text The text to extract keywords from
 * @returns Array of keywords
 */
const extractKeywords = (text: string): string[] => {
  // In a real implementation, this would use NLP techniques
  // For now, we'll use a simple approach
  
  // Remove common words and punctuation
  const cleanText = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ');
  
  // Split into words
  const words = cleanText.split(' ');
  
  // Remove common words (stopwords)
  const stopwords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const filteredWords = words.filter(word => !stopwords.includes(word) && word.length > 3);
  
  // Count word frequency
  const wordCounts: Record<string, number> = {};
  filteredWords.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // Sort by frequency and get top keywords
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
};