const { StatusCodes } = require('http-status-codes');
const { ContactRepository } = require('../repository');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const AppError = require('../utils/errors/app-error');

const contactRepository = new ContactRepository();

const upload = async (file) => {
  try {
    const filePath = path.join(__dirname, '../uploads', file.filename);

    const contactsData = [];

    // Parse the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          contactsData.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Use the repository method to save data in bulk
    await contactRepository.bulkCreate(contactsData);
    await fs.promises.rm(filePath, { recursive: true, force: true });
    return 'Contacts uploaded and stored successfully';
  } catch (error) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  upload,
};
