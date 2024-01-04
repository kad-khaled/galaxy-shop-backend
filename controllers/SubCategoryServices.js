const Brand = require("../models/BrandModel");
const slugify = require("slugify");
const SubCategory = require("../models/SubCategoryModel");

const getListSubCategories = async (req, res) => {
  try {
    const query = req.query;
    const pageNumber = query.page * 1 || 1;
    const pageSize = query.size * 1 || 10;
    const skipedItems = (pageNumber - 1) * pageSize;
    const categoryId = query.categoryId;
    const subCategories = await SubCategory.find({ categoryID: categoryId })
      .skip(skipedItems)
      .limit(pageSize)
      .populate({ path: "categoryID", select: "-__v" })
      .select("-__v");

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: subCategories,
      metaData: {
        pageSize: subCategories.length || 0,
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

const getSubCategoryById = async (req, res) => {
  const { id: subCategoryId } = req.params;
  try {
    const subCategory = await SubCategory.findById({
      _id: subCategoryId,
    })
      .populate({ path: "categoryID", select: "-__v" })
      .select("-__v");
    if (!subCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the sub-category with id( ${subCategoryId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: subCategory,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const deleteSubCategoryById = async (req, res) => {
  const { id: subCategoryId } = req.params;
  try {
    const deletedSubCategory = await SubCategory.findOneAndDelete(
      { _id: subCategoryId },
      { new: true }
    )
      .populate({ path: "categoryID", select: "-__v" })
      .select("-__v");

    if (!deletedSubCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the sub-category with id( ${subCategoryId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: deletedSubCategory,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const createNewSubCategory = async (req, res) => {
  const { name, categoryID } = req.body;
  const slug = slugify(name);
  const subCategory = SubCategory({
    name: name,
    categoryID: categoryID,
    slug: slug,
  });

  try {
    const newSubCategory = await subCategory.save();
    if (!newSubCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 400,
        message: `Failed to create a new sub-category with name ${name}.`,
      });
      return;
    }
    const subCat = await SubCategory.findById({ _id: newSubCategory._id })
      .populate({ path: "categoryID", select: "-__v" })
      .select("-__v");

    res.status(200).json({
      state: "success",
      stateCode: 201,
      data: subCat,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const updateSubCategoryById = async (req, res) => {
  let newSubCategory = req.body;
  const { id: subCategoryId } = req.params;
  if (newSubCategory.name) {
    newSubCategory = {
      ...newSubCategory,
      slug: slugify(newSubCategory.name),
    };
  }
  try {
    console.log(newSubCategory);
    const updatedSubCategory = await SubCategory.findOneAndUpdate(
      { _id: subCategoryId },
      newSubCategory,
      { new: true }
    )
      .populate({ path: "categoryID", select: "-__v" })
      .select("-__v");

    if (!updatedSubCategory) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the SubCategory with id( ${subCategoryId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: updatedSubCategory,
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
  getListSubCategories,
  getSubCategoryById,
  deleteSubCategoryById,
  createNewSubCategory,
  updateSubCategoryById,
};
