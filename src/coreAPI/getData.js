const { CoreAPI } = require('./index');
const axios = require("axios");

class appData{
    getServerData(path){
        CoreAPI.getData(path)
        .then(re => {
            return re
        })
    }
    getAppData(method) {
        return axios.get('https://api.github.com/repos/vkidik/pace_music-desktop/commits')
        .then(response => {
            const data = response.data;
            const filteredData = data.filter(commitData => commitData.commit.message !== 'init');

            const newCommits = filteredData.map(commitData => {
                const parts = commitData.commit.message.split('\n');
                const version = parts.shift();
                return {
                    version: version,
                    info: parts,
                    url: commitData.html_url
                };
            });

            if (method == "GET_VERSION") {
                if (newCommits.length > 0) {
                    const latestVersionCommit = newCommits[0].version;
                    return latestVersionCommit.includes("v ") ? latestVersionCommit.split("v ")[1] : latestVersionCommit;
                }
                return null;
            } else if (method == "GET_COMMITS") {
                return newCommits;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    }

}

module.exports = {
    appData : new appData()
}