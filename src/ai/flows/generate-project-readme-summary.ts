// src/ai/flows/generate-project-readme-summary.ts
'use server';

/**
 * @fileOverview Summarizes a project's README.md content using GenAI.
 *
 * - generateProjectReadMeSummary - A function that summarizes the README content.
 * - GenerateProjectReadMeSummaryInput - The input type for the generateProjectReadMeSummary function.
 * - GenerateProjectReadMeSummaryOutput - The return type for the generateProjectReadMeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectReadMeSummaryInputSchema = z.object({
  readmeContent: z
    .string()
    .describe('The complete content of the README.md file for a project.'),
});
export type GenerateProjectReadMeSummaryInput = z.infer<
  typeof GenerateProjectReadMeSummaryInputSchema
>;

const GenerateProjectReadMeSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise and insightful summary of the project, highlighting its purpose, key features, and technologies used, formatted using Markdown.'
    ),
});
export type GenerateProjectReadMeSummaryOutput = z.infer<
  typeof GenerateProjectReadMeSummaryOutputSchema
>;

export async function generateProjectReadMeSummary(
  input: GenerateProjectReadMeSummaryInput
): Promise<GenerateProjectReadMeSummaryOutput> {
  return generateProjectReadMeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectReadMeSummaryPrompt',
  input: {schema: GenerateProjectReadMeSummaryInputSchema},
  output: {schema: GenerateProjectReadMeSummaryOutputSchema},
  prompt: `You are an expert technical writer AI that specializes in summarizing project README files for portfolios. Your goal is to produce a clear, structured, and easy-to-read summary.

  Analyze the following README content and generate a summary formatted in Markdown. The summary must have the following structure:

  **1. Main Purpose:** A concise, one-sentence explanation of what the project does.
  **2. Key Features:** A bulleted list (using '*' or '-') highlighting the 3 to 5 most important features or capabilities.
  **3. Technologies Used:** A comma-separated list of the key technologies, libraries, and frameworks mentioned.

  Here is the README content:
  \`\`\`
  {{{readmeContent}}}
  \`\`\`
  `,
  model: 'googleai/gemini-2.5-flash',
});

const generateProjectReadMeSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectReadMeSummaryFlow',
    inputSchema: GenerateProjectReadMeSummaryInputSchema,
    outputSchema: GenerateProjectReadMeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
