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
            user: req.user.id
        }
    });
    
  res.render('home', {
    title: 'home',
    folders: folders
  });
});