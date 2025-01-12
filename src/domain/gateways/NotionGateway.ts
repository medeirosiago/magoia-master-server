export interface Notion {
  getDatabase(databaseId: string): Promise<any>;
  getPage(pageId: string): Promise<any>;
}