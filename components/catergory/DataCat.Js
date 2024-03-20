import DataStorage from './DataStorage'; // Adjust the import path as necessary

const CATEGORY_KEY = 'categories';

class DataCat {
  static async addCategory(newCategory) {
    try {
      // Retrieve the existing categories
      const existingCategoriesJson = await DataStorage.Retrieve();
      let existingCategories = existingCategoriesJson ? existingCategoriesJson[CATEGORY_KEY] : [];
      
      // Ensure existingCategories is an array. If not, convert it into an array.
      if (!Array.isArray(existingCategories)) {
        existingCategories = [];
      }

      // Add the new category
      const updatedCategories = [...existingCategories, newCategory];
      
      // Save the updated categories back to storage
      await DataStorage.Store({ ...existingCategoriesJson, [CATEGORY_KEY]: updatedCategories });
      console.log('Category successfully added.');
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  }

  static async getCategories() {
    try {
      const existingCategoriesJson = await DataStorage.Retrieve();
      const categories = existingCategoriesJson ? existingCategoriesJson[CATEGORY_KEY] : [];
      return Array.isArray(categories) ? categories : [];
    } catch (error) {
      console.error('Failed to retrieve categories:', error);
      return [];
    }
  }

  static async removeCategory(categoryName) {
    try {
      const existingCategoriesJson = await DataStorage.Retrieve();
      let existingCategories = existingCategoriesJson ? existingCategoriesJson[CATEGORY_KEY] : [];

      if (!Array.isArray(existingCategories)) {
        existingCategories = [];
      }

      const updatedCategories = existingCategories.filter(category => category.name !== categoryName);
      
      // Save the updated categories list back to storage
      await DataStorage.Store({ ...existingCategoriesJson, [CATEGORY_KEY]: updatedCategories });
      console.log('Category successfully removed.');
    } catch (error) {
      console.error('Failed to remove category:', error);
    }
  }
}

export default DataCat;
