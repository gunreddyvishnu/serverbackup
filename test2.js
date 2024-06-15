const axios = require('axios');
const cheerio = require('cheerio');

async function fetchVisaSlots() {
  try {
    const url = 'https://visaslots.info/';
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    // Select the relevant section of the page
    const visaSlots = [];
    $('details').each((i, element) => {
      const visaType = $(element).find('summary strong').text().trim();
      const slots = [];

      $(element).find('tbody tr').each((j, row) => {
        const location = $(row).find('td').eq(0).text().trim();
        const visa = $(row).find('td').eq(1).text().trim();
        const updated = $(row).find('td').eq(2).text().trim();
        const earliest = $(row).find('td').eq(3).text().trim();
        const slotCount = $(row).find('td').eq(4).text().trim();

        slots.push({ location, visa, updated, earliest, slotCount });
      });

      visaSlots.push({ visaType, slots });
    });

    console.log(JSON.stringify(visaSlots, null, 2));
  } catch (error) {
    console.error('Error fetching visa slots:', error);
  }
}

fetchVisaSlots();
