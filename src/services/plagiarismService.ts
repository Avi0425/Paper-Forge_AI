/**
 * Plagiarism Detection Service
 * Handles checking paper content for potential plagiarism
 */

interface PlagiarismResult {
  score: number; // Overall plagiarism score (0-100)
  matches: PlagiarismMatch[];
}

interface PlagiarismMatch {
  section: string; // Section where plagiarism was detected
  startPos: number; // Start position of the match
  endPos: number; // End position of the match
  source: string; // Source of the plagiarized content
  text: string; // The matched text
  similarity: number; // Similarity score (0-100)
}

/**
 * Check paper content for plagiarism
 * @param content Object containing paper content by section
 * @returns Promise resolving to plagiarism detection results
 */
export const checkPlagiarism = async (content: Record<string, string>): Promise<PlagiarismResult> => {
  // In a real implementation, this would call an external plagiarism detection API
  // For now, we'll simulate the process with mock data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Initialize result
  const result: PlagiarismResult = {
    score: 0,
    matches: []
  };
  
  // Process each section
  for (const [section, text] of Object.entries(content)) {
    if (!text || text.trim() === '') continue;
    
    // Simulate finding plagiarism matches
    const sectionMatches = simulatePlagiarismDetection(section, text);
    result.matches.push(...sectionMatches);
  }
  
  // Calculate overall score based on matches
  if (result.matches.length > 0) {
    // Calculate weighted average of similarity scores
    const totalLength = Object.values(content).join('').length;
    let weightedScore = 0;
    
    for (const match of result.matches) {
      const matchLength = match.endPos - match.startPos;
      const weight = matchLength / totalLength;
      weightedScore += match.similarity * weight;
    }
    
    result.score = Math.min(Math.round(weightedScore * 10), 100);
  }
  
  return result;
};

/**
 * Simulate plagiarism detection for a section
 * @param section Section name
 * @param text Section text
 * @returns Array of plagiarism matches
 */
const simulatePlagiarismDetection = (section: string, text: string): PlagiarismMatch[] => {
  const matches: PlagiarismMatch[] = [];
  
  // For demonstration purposes, we'll create some random matches
  // In a real implementation, this would use text comparison algorithms
  
  // Only create matches for certain sections to keep the demo realistic
  if (['abstract', 'introduction', 'methods'].includes(section)) {
    // Create 0-2 random matches per section
    const numMatches = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numMatches; i++) {
      // Find a position for the match
      const maxPos = text.length - 50;
      if (maxPos <= 0) continue;
      
      const startPos = Math.floor(Math.random() * maxPos);
      const length = Math.floor(Math.random() * 50) + 20; // 20-70 characters
      const endPos = Math.min(startPos + length, text.length);
      
      // Extract the matched text
      const matchedText = text.substring(startPos, endPos);
      
      // Generate a random similarity score (50-90%)
      const similarity = Math.floor(Math.random() * 41) + 50;
      
      // Create a mock source
      const sources = [
        'Smith et al. (2022), Quantum Computing Review',
        'Johnson (2021), Introduction to Machine Learning',
        'Quantum Computing Textbook (2023)',
        'Lee & Park (2020), Neural Networks and Applications',
        'Academic Research Database (2021)'
      ];
      const source = sources[Math.floor(Math.random() * sources.length)];
      
      matches.push({
        section,
        startPos,
        endPos,
        text: matchedText,
        similarity,
        source
      });
    }
  }
  
  return matches;
};

/**
 * Get text highlighting information for UI display
 * @param content Paper content by section
 * @param matches Plagiarism matches
 * @returns Object with highlighting information by section
 */
export const getPlagiarismHighlights = (
  content: Record<string, string>,
  matches: PlagiarismMatch[]
): Record<string, {text: string, highlights: {start: number, end: number, source: string}[]}> => {
  const result: Record<string, {text: string, highlights: {start: number, end: number, source: string}[]}> = {};
  
  // Initialize result with all sections
  for (const [section, text] of Object.entries(content)) {
    result[section] = {
      text,
      highlights: []
    };
  }
  
  // Add highlights for each match
  for (const match of matches) {
    if (result[match.section]) {
      result[match.section].highlights.push({
        start: match.startPos,
        end: match.endPos,
        source: match.source
      });
    }
  }
  
  return result;
};

/**
 * Generate a report of plagiarism findings
 * @param result Plagiarism detection result
 * @returns Formatted report string
 */
export const generatePlagiarismReport = (result: PlagiarismResult): string => {
  let report = `# Plagiarism Detection Report\n\n`;
  report += `## Overall Score: ${result.score}%\n\n`;
  
  if (result.score < 15) {
    report += `**Excellent!** Your paper appears to be highly original.\n\n`;
  } else if (result.score < 30) {
    report += `**Good.** Your paper contains some similar content to existing sources, but is mostly original.\n\n`;
  } else if (result.score < 50) {
    report += `**Caution.** Your paper contains significant amounts of content similar to existing sources.\n\n`;
  } else {
    report += `**Warning!** Your paper contains high levels of content similar to existing sources.\n\n`;
  }
  
  if (result.matches.length > 0) {
    report += `## Detected Matches\n\n`;
    
    // Group matches by section
    const sectionMatches: Record<string, PlagiarismMatch[]> = {};
    for (const match of result.matches) {
      if (!sectionMatches[match.section]) {
        sectionMatches[match.section] = [];
      }
      sectionMatches[match.section].push(match);
    }
    
    // Add section-by-section breakdown
    for (const [section, matches] of Object.entries(sectionMatches)) {
      report += `### ${section.charAt(0).toUpperCase() + section.slice(1)}\n\n`;
      
      for (const match of matches) {
        report += `- **${match.similarity}% similar** to ${match.source}\n`;
        report += `  "${match.text.substring(0, 100)}${match.text.length > 100 ? '...' : ''}"\n\n`;
      }
    }
  } else {
    report += `No significant matches were found.\n`;
  }
  
  report += `\n## Recommendations\n\n`;
  report += `- Ensure all direct quotes are properly cited\n`;
  report += `- Paraphrase content from sources using your own words\n`;
  report += `- Add citations for any facts, figures, or ideas that aren't your own\n`;
  
  return report;
};