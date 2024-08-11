const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const {body, validationResult} = require('express-validator');
const prisma = new PrismaClient();


exports.home = asyncHandler(async (req, res)=>{
    const folders = await prisma.folder.findMany({
        where:{
            userId: `${req.user.id}`
        }
    });

  res.render('home', {
    title: 'home',
    folders: folders
  });
});

exports.create_folder = [
    body('name', 'name must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async (req, res)=>{
        await prisma.folder.create({
            data:{
                name: req.body.name,
                userId: `${req.user.id}`,
            }
        });
        res.redirect('/');
    }),
]

exports.folder_details = asyncHandler(async (req, res) => {


    const files = await prisma.file.findMany({
        where:{
            folderId: `${req.params.id}`
        }
    });
    res.render('folder_details', {
        title: 'Folder Details',
        files:files,
        id: req.params.id,
    });
});

exports.display_folder = asyncHandler()