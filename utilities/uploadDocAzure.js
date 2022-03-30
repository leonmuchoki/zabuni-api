require("dotenv").config();
const getStream = require('into-stream');
const { BlockBlobClient  } = require("@azure/storage-blob");;

const containerName = "filecontainer";

exports.uploadDocumentToAzure = (originalname, fileBuffer) => {
    console.log("orifinal file name: " + originalname);
    const blobName = getBlobName(originalname), 
        blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,blobName),
        stream = getStream(fileBuffer),
        streamLength = fileBuffer.length;
    console.log(blobName);

    return blobService.uploadStream(stream, streamLength)
    .then((result)=>{
            console.log(JSON.stringify(result))
            return {"upload_status": true, message: "Document was uploaded successfully!", blobName: blobName }
        })
    .catch((err)=>{
        if(err) {
            console.error(err);
            return {"upload_status": false, message: err.message }
        }
    });
}

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
  };