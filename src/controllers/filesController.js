


const uploadController = async (reg, res) => {
    const fileName = reg.file.originalname
    console.log(fileName);

    res.json({ status: 'success' });
}


module.exports = {
    uploadController,
}

