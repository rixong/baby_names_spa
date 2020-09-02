const prod = {
  url: {
<<<<<<< HEAD
    API_URL: 'https://rixong-baby-spa.herokuapp.com/'
    // CLIENT_URL: 'https://pensive-villani-db112d.netlify.app/'
=======
    API_URL: 'https://rixong-baby-spa.herokuapp.com/',
    CLIENT_URL: 'https://pensive-villani-db112d.netlify.app/'
>>>>>>> 185511592d124142487da505adfea635d7d0be74
  }
};

const dev = {
  url: {
<<<<<<< HEAD
    API_URL: 'http://localhost:3000'
    // CLIENT_URL: 'http://localhost:3001'
=======
    API_URL: 'http://localhost:3000',
    CLIENT_URL: 'http://localhost:3001'
>>>>>>> 185511592d124142487da505adfea635d7d0be74
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;