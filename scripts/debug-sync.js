async function debugSync() {
    console.log('Testing Sync Endpoint...');
    try {
        const response = await fetch('http://localhost:3003/api/news/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ countries: ['us'] })
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response Body:', text);
    } catch (error) {
        console.error('Network Error:', error);
    }
}

debugSync();
