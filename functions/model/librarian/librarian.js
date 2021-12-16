/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");

const { uploadFileToTask } = require("./tark/uploadFileToTask");
const { getFilesInTask } = require("./tark/getFilesInTask");
const { deleteFilesInTask } = require("./tark/deleteFilesInTask");
const { uploadLogoFile } = require("./tark/uploadLogoFile");
const { uploadFileToOrgDocuments } = require("./tark/uploadFileToOrgDocuments");
const { getFilesInOrgDocument } = require("./tark/getFilesInOrgDocuments");

fastify.post("/", (req, res) => {
    // createNewUser(req, res);
    // status:ok ,200, api is running
    return response.status(200).send("API is running");
  });
  
  fastify.post("/deleteFilesInTask", (req, res) => {
    deleteFilesInTask(req, res);
  });
  
  fastify.post("/getFilesInOrgDocument", (req, res) => {
    getFilesInOrgDocument(req, res);
  });

  fastify.post("/getFilesInTask", (req, res) => {
    getFilesInTask(req, res);
  });
  
  fastify.post("/uploadFileToOrgDocuments", (req, res) => {
    uploadFileToOrgDocuments(req, res);
  });

  fastify.post("/uploadFileToTask", (req, res) => {
    uploadFileToTask(req, res);
  });
  
  fastify.post("/uploadLogoFile", (req, res) => {
    uploadLogoFile(req, res);
  });

// exports.librarian = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const mode = request.body.data.mode;

//         if (mode == "UploadFileToTask") {
//             return uploadFileToTask(request, response);
//         } else if (mode == "GetFilesInTask") {
//             return getFilesInTask(request, response);
//         } else if (mode == "DeleteFilesInTask") {
//             return deleteFilesInTask(request, response);
//         } else if (mode == "UploadLogoFile") {
//             return uploadLogoFile(request, response);
//         } else if (mode == "UploadFileToOrgDocuments") {
//             return uploadFileToOrgDocuments(request, response);
//         } else if (mode == "GetFilesInOrgDocument") {
//             return getFilesInOrgDocument(request, response);
//         }
//     });
// });