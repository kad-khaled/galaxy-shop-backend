const Category = require("../models/CategoryModel");
const slugify = require("slugify");

const getListCategory = async (req, res) => {
  try {
    const query = req.query;
    const pageNumber = query.page * 1 || 1;
    const pageSize = query.size * 1 || 10;
    const skipedItems = (pageNumber - 1) * pageSize;

    const categories = await Category.find({})
      .skip(skipedItems)
      .limit(pageSize);

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: categories,
      metaData: {
        pageSize: categories.length || 0,
        pagenumber: pageNumber,
      },
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const getCategoryById = async (req, res) => {
  const { id: categoryId } = req.params;
  try {
    const category = await Category.findById({ _id: categoryId });
    if (!category) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the category with id( ${categoryId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id: categoryId } = req.params;
  try {
    const deletedCategory = await Category.findOneAndDelete(
      { _id: categoryId },
      { new: true }
    );

    if (!deletedCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the category with id( ${categoryId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name);
  const category = Category({ name: name, slug: slug });

  try {
    const newCategory = await category.save();

    if (!newCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 400,
        message: `Failed to create a new category with name ${name}.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 201,
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const updateCategoryById = async (req, res) => {
  const { name: newName } = req.body;
  const { id: categoryId } = req.params;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { name: newName, slug: slugify(newName) },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the category with id( ${categoryId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

module.exports = {
  getListCategory,
  getCategoryById,
  deleteCategoryById,
  createNewCategory,
  updateCategoryById,
};
