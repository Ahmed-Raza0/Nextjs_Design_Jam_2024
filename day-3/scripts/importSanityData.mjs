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
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()
    })
    console.log(`Image uploaded successfully: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error)
    return null
  }
}async function importData() {
  try {
    console.log('Fetching products from API...')
    const response = await axios.get('https://67800beb0476123f76a9578a.mockapi.io/api/test1')
    const products = response.data
    console.log(`Fetched ${products.length} products`)

    for (const product of products) {
      console.log(`Processing product: ${product.title}`)


      const productId = Number(product.id); 
      const productPrice = Number(product.price); 

      let imageRef = null
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image)
      }

      const sanityProduct = {
        _type: 'product',
        title: product.title,
        description: product.description,
        rating: product.rating?.rate || 0,
        price: productPrice,
        category: product.category,
        inventory: productId * 2,
        id: productId, // Now storing product.id as a number
        brand: product.brand,
        image: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
      }

      console.log('Uploading product to Sanity:', sanityProduct.name)
      const result = await client.create(sanityProduct)
      console.log(`Product uploaded successfully: ${result._id}`)
    }
    console.log('Data import completed successfully!')
  } catch (error) {
    console.error('Error importing data:', error)
  }
}
importData()


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


