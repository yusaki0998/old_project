// const mongoose = require('mongoose');

// const connection = () => {
//     const uri = "mongodb+srv://huytq:"
//         + process.env.MONGO_ATLAS_PW +
//         "@capstonecluster.e4xd9.mongodb.net/cinedb?retryWrites=true&w=majority"

//     mongoose.connect(uri,
//         {
//             useCreateIndex: true,
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     )
//     .then(() => {
//         console.log("OK!");
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// module.exports = { connection };