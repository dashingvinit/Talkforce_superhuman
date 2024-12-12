const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');
const { UploadService } = require('../services');

const upload = async (req, res) => {
  try {
    const data = await UploadService.upload(req.file);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode).json(errorResponse);
  }
};

module.exports = {
  upload,
};
