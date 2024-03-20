import businessModel from "../Models/businessModel.js";

// get businessuser

export const getbusiness = async(req,res) => {
    const id = req.params.id;

    try{
        const business = businessModel.findbyid(id);

        if(business){
            res.status(200).json(business)
        }
    }catch(error) {
        res.status(500).json(error)
    }
};