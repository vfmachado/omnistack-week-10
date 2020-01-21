const axios = require('axios');

const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')
module.exports = {

    async index(request, response) {
        const allDevs = await Dev.find();
        return response.json(allDevs);
    },

    async store(request, response) {
    
        console.log(request.body);
    
        const { github_username, techs, latitude, longitude} = request.body;
    
        const dev = await Dev.findOne({ github_username });
        
        if (!dev) {
            const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            console.log(gitResponse.data);
        
            const { name = login, avatar_url, bio } = gitResponse.data;
            const techsArray = parseStringAsArray(techs);
        
            const location = {type: 'Point', coordinates: [longitude, latitude]};
        
            const newDev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //filter connections by distance
            //check if new dev has a tech
            const sendSocketMessageTo = findConnections({latitude, longitude}, techsArray);
            
            console.log("Connections available with requirements: ", sendSocketMessageTo);            

            sendMessage(sendSocketMessageTo, 'new-dev', newDev);

            return response.json(newDev);
        }
      
        return response.json({message: 'Dev already exists'});
       
    }
}