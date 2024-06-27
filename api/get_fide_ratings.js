const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://ratings.fide.com/profile/651010259');
    const html = response.data;
    const $ = cheerio.load(html);

    const standard = $('.profile-top-rating-data_gray').text().trim().replace('std', '');
    const rapid = $('.profile-top-rating-data_red').text().trim().replace('rapid', '');
    const blitz = $('.profile-top-rating-data_blue').text().trim().replace('blitz', '');

    res.status(200).json({ standard, rapid, blitz });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
};
