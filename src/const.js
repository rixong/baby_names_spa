const prod = {
  url: {
    API_URL: 'https://rixong-baby-spa.herokuapp.com/',
    CLIENT_URL: 'https://pensive-villani-db112d.netlify.app/'
    // CLIENT_URL: 'https://pedantic-babbage-7ff9b3.netlify.app'
  }
};

const dev = {
  url: {
    API_URL: 'http://localhost:3000',
    CLIENT_URL: 'http://localhost:3001'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;