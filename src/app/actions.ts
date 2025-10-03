'use server';

import {generateProjectReadMeSummary} from '@/ai/flows/generate-project-readme-summary';

export async function getReadmeSummary(readmeContent: string) {
  if (!readmeContent) {
    return 'No content provided to summarize.';
  }
  
  try {
    const result = await generateProjectReadMeSummary({readmeContent});
    return result.summary;
  } catch (error) {
    console.error('Error generating README summary:', error);
    // Return a user-friendly error message
    return 'Could not generate summary at this time. Please try again later.';
  }
}
