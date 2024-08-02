import mongoose from "mongoose";

async function mongoDBConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongo DB connected`);
  } catch (error) {
    console.log(`Error message : ${error.message}`);
  }
}

export default mongoDBConnect;
