const express = require('express');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const {User} = require('../database/models/index');
const auth = express.Router();


auth.
    route('/login')
    .post(async(req, res, next) => {
        const {id, pwd} = req.body;

        try{
            // db에서 입력한 id와 일치한 user정보 획득
            const db_user = await User.findOne({
                attributes: ['id', 'pwd'],
                where:{
                    id: id
                }
            });

            //중복아이디 존재시 -> ajax로 변경해야됨
            if((id != db_user.id) || (pwd != db_user.pwd)){
                res.status(406).send('login failed');
                return;
            }

            //const hash = await bcrypt.hash(pwd, 10); //pasword 해쉬화


            //return res.status(200).json({success: 'true'});


            res.status(200).json({'isLoginPassed':true, 'hasNovelWritten': false})
        }
        catch(e){
            console.error(e);
            return next(e);
    };
});

module.exports = auth;

