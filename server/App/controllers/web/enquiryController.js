const enquiryModel = require('../../models/enquiry.model');

const enquiryInsert = (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const enquiryData = new enquiryModel({
        name,
        email,
        phone,
        message
    });

    enquiryData.save()
        .then((result) => {
            res.status(200).json({ message: "Enquiry Inserted Successfully", data: result });
        })
        .catch((err) => {
            res.status(500).json({ message: "Enquiry Insertion Failed", error: err.message || err });
        });
};

module.exports = {
    enquiryInsert
}; 