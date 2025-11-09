import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log("Db Connected to Db SuccessFully")
            })
    } catch (error) {
        console.log("Error while connenting the DB", error)
    }
}

export default connectDb