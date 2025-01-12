/**
 * Client & config
 */
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
};

export const getPage = async (pageId: string) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw new Error('Failed to fetch page');
  }
};
