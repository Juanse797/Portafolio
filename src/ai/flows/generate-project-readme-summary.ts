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
      'A concise and insightful summary of the project, highlighting its purpose, key features, and technologies used.'
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
  prompt: `You are an AI assistant that summarizes project README files.

  Given the content of a README file, provide a concise yet insightful summary of the project. The summary should capture the project's primary purpose, its key features, and the technologies it utilizes.

  README Content: {{{readmeContent}}}`,
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
