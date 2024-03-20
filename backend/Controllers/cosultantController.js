import consultantModel from "../Models/consultantModel";

// Registering a new consult
export const registerconsult = async (req, res) => {
  const { name,specialization, experience, phone } = req.body;
  

  const newconsult = new consultantModel({name,specialization,experience,phone,
  })

  try {
    await newconsult.save();
    res.status(200).json(newconsult);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}