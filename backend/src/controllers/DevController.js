const axios = require('axios');

const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

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
        }
      
    
        return response.json(newDev);
    }
}