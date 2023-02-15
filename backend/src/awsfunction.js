const aws = require('aws-sdk');


aws.config.update({

    accessKeyId: 'AKIA5TMTTHTB6ZV22NZU',
    secretAccessKey: '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',
     region: 'ap-south-1'

})


//     Access key ID
// AKIA5TMTTHTB5LKX7YNW
// Secret access key
// 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

const uploadFile = async function (file) {
    // console.log(file);
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3();
        let uploadParams = {
            ACL: "public-read",
            Bucket: "myssignementbucket",
            Key: "RSD/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "Error": err }) 
            }
            console.log("file uploaded succesfully")
           
            return resolve(data.Location)
        })

    })
    

}

module.exports.uploadFile = uploadFile


