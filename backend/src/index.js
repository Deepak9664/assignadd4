const express=require('express');
const bodyParser = require('body-parser');
const multer=require('multer');
const awsFunction= require("./awsfunction")
const aws = require('aws-sdk')
const cors = require("cors")
const mongoose  = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(multer().any());
app.use(cors())

mongoose.connect("mongodb+srv://Deepak1234:TrU8MdmpPJ72rGI3@cluster0.l1wlrcl.mongodb.net/test", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

aws.config.update({

    accessKeyId: 'AKIA5TMTTHTB6ZV22NZU',
    secretAccessKey: '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',
     region: 'ap-south-1'

})

app.post("/uploadfile", async function (req, res) {
    try {
        let files = req.files
       console.log( "backen file",files)
       
        files.forEach( async (file)=>{
        const filetype= file.originalname.split(".")[1];
        if(filetype === "mp4"){
            if (files && files.length > 0) {
                let genURL = await awsFunction.uploadFile(files[0])
                // console.log(files[0])
                res.status(201).send({ message: "Video is uploaded", data: genURL });
            }else {
                res.status(400).send({message:'No file found'})
            }
            
        }  else {
            res.status(400).send({data:file,msg:"file not supported"})
        }       })
       
    }
    catch (err) {
        res.status(500).send({message:err.message})
    }

})




app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});