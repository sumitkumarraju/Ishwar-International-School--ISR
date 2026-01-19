const fetch = require('node-fetch');

async function checkAlumni() {
    try {
        console.log('Fetching alumni...');
        const res = await fetch('http://localhost:3000/api/admin/alumni');

        if (!res.ok) {
            console.error('Failed to fetch:', res.status, res.statusText);
            const text = await res.text();
            console.error('Body:', text);
            return;
        }

        const data = await res.json();
        console.log(`Found ${data.length} alumni records.`);

        const fs = require('fs');
        for (const a of data) {
            console.log('------------------------------------------------');
            console.log(`Name: ${a.name}`);
            console.log(`ID: ${a.id}`);
            console.log(`Approved: ${a.is_approved}`);
            console.log(`Image URL: ${a.image}`);

            if (a.image) {
                try {
                    console.log('Testing access to image...');
                    const imgRes = await fetch(a.image);
                    console.log(`Image Status: ${imgRes.status} ${imgRes.statusText}`);

                    if (imgRes.ok) {
                        const buffer = await imgRes.buffer();
                        console.log(`Downloaded ${buffer.length} bytes`);
                        fs.writeFileSync('test_image.jpg', buffer);
                        console.log('Saved to test_image.jpg');
                    } else {
                        const errText = await imgRes.text();
                        console.log('Error Body:', errText.substring(0, 200));
                    }
                } catch (err) {
                    console.log('Failed to connect to image URL:', err.message);
                }
            }
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

checkAlumni();
