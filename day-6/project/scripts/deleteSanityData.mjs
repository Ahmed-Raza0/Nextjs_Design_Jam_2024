import { createClient } from '@sanity/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-27'
})

async function deleteAllProducts() {
    try {
      // Fetch all product documents
      const products = await client.fetch('*[_type == "product"]');
  
      // Loop through and delete each product by its ID
      for (const product of products) {
        await client.delete(product._id);
        console.log(`Deleted product: ${product.title}`);
      }
  
      console.log('All products have been deleted.');
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  }
  
  deleteAllProducts();
  
  
  