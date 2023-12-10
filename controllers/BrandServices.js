const Brand = require("../models/BrandModel");
const slugify = require("slugify");

const getListBrand = async (req, res) => {
  try {
    const query = req.query;
    const pageNumber = query.page * 1 || 1;
    const pageSize = query.size * 1 || 10;
    const skipedItems = (pageNumber - 1) * pageSize;

    const brands = await Brand.find({})
      .skip(skipedItems)
      .limit(pageSize)
      .select("-__v");

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: brands,
      metaData: {
        pageSize: brands.length || 0,
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

const getBrandById = async (req, res) => {
  const { id: brandId } = req.params;
  try {
    const brand = await Brand.findById({ _id: brandId }).select("-__v");
    if (!brand) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the brand with id( ${brandId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: brand,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const deleteBrandById = async (req, res) => {
  const { id: brandId } = req.params;
  try {
    const deletedBrand = await Brand.findOneAndDelete(
      { _id: brandId },
      { new: true }
    ).select("-__v");

    if (!deletedBrand) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the brand with id( ${brandId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: deletedBrand,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const createNewBrand = async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name);
  const brand = Brand({ name: name, slug: slug });

  try {
    const newBrand = await brand.save();

    if (!newBrand) {
      res.status(404).json({
        state: "failed",
        stateCode: 400,
        message: `Failed to create a new brand with name ${name}.`,
      });
      return;
    }
    delete newBrand.__v;
    res.status(200).json({
      state: "success",
      stateCode: 201,
      data: newBrand,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const updateBrandById = async (req, res) => {
  const { name: newName } = req.body;
  const { id: brandId } = req.params;
  try {
    const updatedBrand = await Brand.findOneAndUpdate(
      { _id: brandId },
      { name: newName, slug: slugify(newName) },
      { new: true }
    ).select("-__v");

    if (!updatedBrand) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the brand with id( ${brandId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: updatedBrand,
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
  getListBrand,
  getBrandById,
  deleteBrandById,
  createNewBrand,
  updateBrandById,
};
