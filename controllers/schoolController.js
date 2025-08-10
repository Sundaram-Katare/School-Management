const SchoolModel = require('../models/schoolModel');
const calculateDistance = require('../utils/distance');

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const id = await SchoolModel.addSchool({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully in the database', schoolId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error in adding school' });
  }
};

const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const schools = await SchoolModel.getAllSchools();

    const sortedSchools = schools
      .map(school => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({message: "Schools fetched successfully in sorted order", data: sortedSchools});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error in fetching data' });
  }
};

module.exports = { addSchool, listSchools };
