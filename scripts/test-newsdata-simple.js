// Removed import to avoid TS issues
// const { fetchFromNewsData } = require('../services/newsDataService');
// Actually, let's write a pure JS script that mimics the service to avoid TS compilation issues in this quick test.

const https = require('https');

const API_KEY = process.env.NEWSDATA_API_KEY || 'pub_27888cf6af10439cafb58f0ed12b0ec4';
const BASE_URL = 'https://newsdata.io/api/1/news';

async function testApi() {
    console.log('Testing NewsData.io API...');
    console.log('API Key:', API_KEY ? 'Present' : 'Missing');

    const url = `${BASE_URL}?apikey=${API_KEY}&country=us&category=technology`;
    console.log('URL:', url.replace(API_KEY, 'HIDDEN'));

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                console.log('Status Code:', res.statusCode);
                try {
                    const json = JSON.parse(data);
                    if (json.status !== 'success') {
                        console.error('API Error Response:', json);
                    } else {
                        console.log('Success! Total Results:', json.totalResults);
                        if (json.results && json.results.length > 0) {
                            console.log('First Article:', JSON.stringify(json.results[0], null, 2));
                        } else {
                            console.log('No results found.');
                        }
                    }
                    resolve();
                } catch (e) {
                    console.error('JSON Parse Error:', e);
                    console.log('Raw Data:', data);
                    resolve();
                }
            });
        }).on('error', (err) => {
            console.error('Network Error:', err);
            resolve();
        });
    });
}

testApi();
