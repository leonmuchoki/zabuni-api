require("dotenv").config();
const getStream = require('into-stream');
const { streamToBuffer } = require("./stream");

const { BlobServiceClient, BlockBlobClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions  } = require("@azure/storage-blob");;

const CONTAINER_NAME = "filecontainer";

exports.uploadDocumentToAzure = (originalname, fileBuffer) => {
    console.log("orifinal file name: " + originalname);
    const blobName = getBlobName(originalname), 
        blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,CONTAINER_NAME,blobName),
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

exports.getBlobSasUrl =(blobName)=> {
    //blobName = "02033695975028138-test.txt";
    const sharedKeyCredential = new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_ACCOUNT_KEY);
    const blobSAS = generateBlobSASQueryParameters({
        containerName: CONTAINER_NAME, // Required
        blobName, // Required
        permissions: BlobSASPermissions.parse("r"), // Required
        startsOn: new Date(new Date().toUTCString()), // Required
        expiresOn: new Date(new Date().valueOf() + 86400000), // Optional. Date type
        /*cacheControl: "cache-control-override", // Optional
        contentDisposition: "content-disposition-override", // Optional
        contentEncoding: "content-encoding-override", // Optional
        contentLanguage: "content-language-override", // Optional
        contentType: "content-type-override", // Optional
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional */
        //protocol: SASProtocol.HttpsAndHttp, // Optional
       },
      sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
    ).toString();
    
    const blobServiceClient =  new BlobServiceClient(`https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const blobUrl = `${blockBlobClient.url}?${blobSAS}`;//'https://'+process.env.AZURE_STORAGE_ACCOUNT_NAME+'.blob.core.windows.net/'+CONTAINER_NAME+'/'+blobName+'?'+blobSAS;
    /* const downloadBlockBlobResponse = await blockBlobClient.download();
    try {
        console.log(
            `Downloaded blob content - ${(
              await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
            ).toString()},`
          );
          console.log(
            `requestId - ${downloadBlockBlobResponse.requestId}, statusCode - ${downloadBlockBlobResponse._response.status}\n`
          );
    }
    catch(ex) {} */

    return blobUrl;
};