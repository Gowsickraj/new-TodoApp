import { User } from "../Module/userSchema.js";

export const createUser = async (req, res) => {
    const { userName, text } = req.body

    try {
        const createData = await User.create({ userName, text })
        res.status(201).json({
            message: "User data Created Successfully",
            data: userName, text,
        })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error while createing User Data" })
        console.log(error, "Error while createing User Data");
    }
}



// export const crtDta = async (req, res) => {

//     const { userName, text, userDataOfBirth } = req.body
//     try {
//         const newcta = await User.create({ userName, text })
//         res.status(201).json({ message: "User Data Created Sucessfully", data: userName, text })
//     } catch (error) {
//         res.status(500).json({ error: error.message, message: "Error While creating User Data" })
//     }

// }

// export const getUserData = async () => {
//     try {
//         const getData = await User.find()
//         res.status(201).json({ message: "Data Get Successfully" })
//     } catch (error) {
//         res.status(500).json({ error: error.message, message: "Error while getting User Data" })

//     }
// }


export const getTodoData = async (req, res) => {
    try {
        const getData = await User.find().select("userName text _id")
        res.status(200).json({ data: getData, message: "Featched data Successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error while getting User Data" })
        console.log(error, "Error while getting User Data");
    }
}

// export const updateser = async (res, req) => {
//     try {
//         const { userName, text } = req.body
//         const id = req.params.id

//         const updateData = await User.findByIdAndUpdate(
//             id,
//             { userName, text }, { new: true })

//         res.status(200).json({ message: "User Data Updated Successfully" })
//     } catch (error) {

//     }
// }



export const upDateUsers = async (req, res) => {

    try {
        const { userName, text } = req.body
        const id = req.params.id
        const updateData = await User.findByIdAndUpdate(
            id,
            {
                userName,
                text
            }, { new: true })

        res.status(200).json({ message: "User data Updated Successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error while Updaing User Data" })
        console.log(error, "Error while Updating User Data");
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User Data Deleted Successfully" })
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error while Deleting User Data" })
        console.log(error, "Error while Deleting User Data");
    }
}

export const getPageNation = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    try {
        const skip = (page - 1) * limit
        const total = await User.countDocuments()
        const data = await User.find().skip(skip).limit(limit)
        res.json({
            data,
            currentPage: page,
            totalPage: Math.ceil(total / limit),
            totalItems: total
        })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error in GetPageNation" })
        console.log(error, "Error in PageNation");
    }
}


export const getDataPageNation = async (req, res) => {
    const page = parseInt(req.quert.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ''

    try {
        const skip = (page - 1) * limit

        const total = await User.countDocuments()
        const data = await User.find().skip(skip).limit(limit)
        res.json({

        })
    } catch (error) {

    }
}

