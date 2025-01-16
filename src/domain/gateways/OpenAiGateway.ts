export interface OpenAi {
  getText(prompt: string): Promise<any>;
}
