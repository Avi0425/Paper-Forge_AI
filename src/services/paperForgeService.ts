/**
 * Paper Forge Service
 * Main service that integrates all backend features for the Paper Forge AI workflow
 */

import { processRawData, generateLatex, uploadAndProcessFile } from './documentProcessor';
import { generateCitationSuggestions, formatCitation } from './citationService';
import { checkPlagiarism, getPlagiarismHighlights, generatePlagiarismReport } from './plagiarismService';
import { exportPaper, ExportFormat, downloadBlob } from './exportService';

/**
 * Paper data interface representing a complete research paper
 */
export interface PaperData {
  title: string;
  author: string;
  content: Record<string, string>;
  citations?: any[];
  plagiarismResult?: any;
}

/**
 * Process raw input data into a structured paper format
 * @param rawData The raw text data to process
 * @param title The paper title
 * @param author The paper author
 * @returns Promise resolving to processed paper data
 */
export const processPaperData = async (
  rawData: string,
  title: string,
  author: string
): Promise<PaperData> => {
  // Process the raw data into structured sections
  const content = processRawData(rawData);
  
  // Return the processed paper data
  return {
    title,
    author,
    content
  };
};

/**
 * Upload and process a file into a structured paper format
 * @param file The file to upload and process
 * @param title The paper title
 * @param author The paper author
 * @returns Promise resolving to processed paper data
 */
export const uploadAndProcessPaper = async (
  file: File,
  title: string,
  author: string
): Promise<PaperData> => {
  // Upload and process the file
  const content = await uploadAndProcessFile(file);
  
  // Return the processed paper data
  return {
    title,
    author,
    content
  };
};

/**
 * Generate citation suggestions for a paper
 * @param paperData The paper data to generate suggestions for
 * @param limit Maximum number of suggestions to return
 * @returns Promise resolving to updated paper data with citation suggestions
 */
export const generateCitations = async (
  paperData: PaperData,
  limit: number = 5
): Promise<PaperData> => {
  // Generate citation suggestions
  const suggestions = await generateCitationSuggestions(paperData.content, limit);
  
  // Return updated paper data
  return {
    ...paperData,
    citations: suggestions
  };
};

/**
 * Check a paper for plagiarism
 * @param paperData The paper data to check
 * @returns Promise resolving to updated paper data with plagiarism results
 */
export const checkPaperPlagiarism = async (paperData: PaperData): Promise<PaperData> => {
  // Check for plagiarism
  const plagiarismResult = await checkPlagiarism(paperData.content);
  
  // Get highlighting information for UI display
  const highlights = getPlagiarismHighlights(paperData.content, plagiarismResult.matches);
  
  // Generate a report
  const report = generatePlagiarismReport(plagiarismResult);
  
  // Return updated paper data
  return {
    ...paperData,
    plagiarismResult: {
      ...plagiarismResult,
      highlights,
      report
    }
  };
};

/**
 * Export a paper to the specified format
 * @param paperData The paper data to export
 * @param format The format to export to
 * @param download Whether to trigger a download of the exported file
 * @returns Promise resolving to a Blob containing the exported file
 */
export const exportPaperToFormat = async (
  paperData: PaperData,
  format: ExportFormat,
  download: boolean = true
): Promise<Blob> => {
  // Export options
  const options = {
    title: paperData.title,
    author: paperData.author,
    includeMetadata: true,
    paperSize: 'a4' as const,
    margin: 'normal' as const
  };
  
  // Export the paper
  const blob = await exportPaper(paperData.content, format, options);
  
  // Trigger download if requested
  if (download) {
    // Generate filename
    const extension = format.toLowerCase();
    const filename = `${paperData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;
    
    // Download the blob
    downloadBlob(blob, filename);
  }
  
  return blob;
};

/**
 * Generate LaTeX code for a paper
 * @param paperData The paper data to generate LaTeX for
 * @returns LaTeX formatted string
 */
export const generatePaperLatex = (paperData: PaperData): string => {
  return generateLatex(paperData.title, paperData.author, paperData.content);
};

/**
 * Complete Paper Forge workflow - processes raw data, generates citations, and checks for plagiarism
 * @param rawData The raw text data to process
 * @param title The paper title
 * @param author The paper author
 * @returns Promise resolving to complete paper data
 */
export const completeWorkflow = async (
  rawData: string,
  title: string,
  author: string
): Promise<PaperData> => {
  // Process the raw data
  const paperData = await processPaperData(rawData, title, author);
  
  // Generate citation suggestions
  const withCitations = await generateCitations(paperData);
  
  // Check for plagiarism
  const complete = await checkPaperPlagiarism(withCitations);
  
  return complete;
};