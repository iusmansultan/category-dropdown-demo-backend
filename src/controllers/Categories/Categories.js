const { Connection } = require('../../config/Mongodb');
const axios = require('axios');
var Promise = require('promise');

const createCategory = async (req, res, next) => {
    // console.log("creating category ", req.body);
    try {

        const response = await axios.get("https://api.sellercenter.daraz.pk?Action=GetCategoryTree&Format=json&Timestamp=2022-04-19T20%3A46%3A17%2B00%3A00&UserID=mrmuhammadusman1%40gmail.com&Version=1.0&Signature=cd98688663b756f047c183dbaab58fdf29f12785b63baf0c88ff00ce10c3d00c")
        // console.log("response==", response.data.SuccessResponse.Body)
        const result = response.data.SuccessResponse.Body;
        await Connection.open();
        let categories = [];
        result.map((r) => {
            categories.push(Connection.db.collection('darazCategories').insertOne(r));
        })

        const resp = await Promise.all(categories)
        console.log("res==", resp)

        return res.status(200).send({
            success: true,
            message: "Categories created successfully",
            data: result
        });


        // //in case of success we can return response to user with success message
        // if (result.acknowledged) {
        //     return res.status(200).send({
        //         success: true,
        //         message: "Category created successfully",
        //         data: result
        //     });
        // } else {
        //     //in case of failure notify user about failure
        //     return res.status(200).send({
        //         success: false,
        //         message: "Category creation failed",
        //     });
        // }

    } catch (e) {
        //in case of any exception
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            exception: e
        });
    }
};

const categories = async (req, res, next) => {

    try {

        await Connection.open();
        const result = await Connection.db.collection('darazCategories').find({ leaf: false }).toArray();
        //in case of success we can return response to user with success message
        if (result.length > 0) {
            return res.status(200).send({
                success: true,
                message: "Your Categories",
                data: result
            });
        } else {
            //in case of failure notify user about failure
            return res.status(200).send({
                success: false,
                message: "No Record Found",
            });
        }

    } catch (e) {
        //in case of any exception
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            exception: e
        });
    }
};

module.exports = {
    createCategory,
    categories
}