// Import the DataStorage module to interact with storage functionalities.
import DataStorage from './DataStorage'; 

// Constant key to access category data in the storage.
const CATEGORY_KEY = 'categories';

/**
 * Class representing the category data management.
 */
class DataCat {
  /**
   * Adds a new category to the storage.
   * @param {string} newCategory - The new category to be added.
   */
  static async addCategory(newCategory) {
    try {
      // Retrieve the existing categories from storage.
      const existingCategoriesJson = await DataStorage.Retrieve();
      let existingCategories = existingCategoriesJson ? existingCategoriesJson[CATEGORY_KEY] : [];
      
      // Ensure that existingCategories is always an array format.
      if (!Array.isArray(existingCategories)) {
        existingCategories = [];
      }

      // Append the new category to the existing categories array.
      const updatedCategories = [...existingCategories, newCategory];
      
      // Persist the updated categories back to the storage.
      await DataStorage.Store({ ...existingCategoriesJson, [CATEGORY_KEY]: updatedCategories });
      console.log('Category successfully added.');
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  }

  /**
   * Retrieves all categories from the storage.
   * @returns {Array} An array of categories.
   */
  static async getCategories() {
    try {
      // Fetch the categories from storage.
      const existingCategoriesJson = await DataStorage.Retrieve();
      const categories = existingCategoriesJson ? existingCategoriesJson[CATEGORY_KEY] : [];
      // Return the categories ensuring it's in array form.
      return Array.isArray(categories) ? categories : [];
    } catch (error) {
      console.error('Failed to retrieve categories:', error);
      return [];
    }
  }

  /**
   * Removes a specified category from the storage.
   * @param {string} categoryName - The name of the category to be removed.
   */
  static async removeCategory(categoryName) {
    try {
      // Retrieve the current categories from storage.
      const existingCategoriesJson = await DataStorage.Retrieve();
      let existingCategories = existingCategoriesJson ? existingCategoriesJson[CATEGORY_KEY] : [];

      // Verify that existingCategories is in array form.
      if (!Array.isArray(existingCategories)) {
        existingCategories = [];
      }

      // Filter out the category to be removed.
      const updatedCategories = existingCategories.filter(category => category.name !== categoryName);
      
      // Save the remaining categories back to the storage.
      await DataStorage.Store({ ...existingCategoriesJson, [CATEGORY_KEY]: updatedCategories });
      console.log('Category successfully removed.');
    } catch (error) {
      console.error('Failed to remove category:', error);
    }
  }
}

// Export the DataCat class for external usage.
export default DataCat;
