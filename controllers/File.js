const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const {body, validationResult} = require('express-validator');
const prisma = new PrismaClient();
const cloudinary = require('../cloudinary');



exports.upload = asyncHandler(function (req, res) {
    cloudinary.uploader.upload(req.file.path, async function(err, result){
        if(err){
            console.log(err);
            return res.json.status(500);
        }
        
        await prisma.file.create({
            data:{
                name: req.body.name,
                url: result.url,
                folderId: req.params.id
            }
        })
        res.redirect('/home');
    })
});