// server.jsnode 
const path = require('path'); 
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'Public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'ProduceRawMilk.html'));
});
// Serve the display demo page
app.get('/display-demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'View', 'DisplayDemo.html')); // Adjust the path as needed
});


// PostgreSQL connection
const pool = new Pool({
    connectionString: 'postgresql://demoblockchaintest_user:Ag9eYjOZEKgRb07Zmxz2ZTk59WOu7db7@dpg-cs5p12l6l47c73f6mj7g-a.oregon-postgres.render.com/demoblockchaintest',
    ssl: {
        rejectUnauthorized: false
    } // Properly closing the 'ssl' object
});



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// GET endpoint to retrieve raw milk data
app.get('/raw-milk-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public."BatchRawMilk" ORDER BY id DESC LIMIT 1');
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Send the most recent record
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// POST endpoint to handle form submission
// POST endpoint to handle form submission
app.post('/submit', async (req, res) => {
    const {
        PersonInCharge,
        MilkTankNum,
        Quantity,
        QuantityUnit,
        Temperature,
        TemperatureUnit,
        MainQualityRM3,
        MainQualityRM4,
        MainQualityRM5,
        MainQualityRM1,
        BactrialTest,
        MainQualityRM2,
        Contaminants,
        MainQualityRM6,
        Address,
        LocationLink,
        sour_taste,
        bitter_taste,
        cloudy_appearance,
        lumpy_appearance,
        water_and_fat,
        smell_bad,
        smell_not_fresh,
        abnormal_color
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO public."BatchRawMilk" (
                person_in_charge, 
                milk_tank_number, 
                quantity, 
                quantity_unit, 
                temperature, 
                temperature_unit, 
                quality_ph, 
                quality_fat, 
                quality_protein, 
                bacterial_testing, 
                bacterial_info, 
                contaminants, 
                contaminants_info, 
                abnormal_characteristics, 
                address, 
                location_url, 
                sour_taste, 
                bitter_taste, 
                cloudy_appearance, 
                lumpy_appearance, 
                water_and_fat, 
                smell_bad, 
                smell_not_fresh, 
                abnormal_color
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING id`,
            [
                PersonInCharge,
                MilkTankNum,
                Quantity,
                QuantityUnit,
                Temperature,
                TemperatureUnit,
                MainQualityRM3,
                MainQualityRM4,
                MainQualityRM5,
                MainQualityRM1 ? true : false,
                BactrialTest || null,
                MainQualityRM2 ? true : false,
                Contaminants || null,
                MainQualityRM6 ? true : false,
                Address,
                LocationLink,
                sour_taste ? true : false,
                bitter_taste ? true : false,
                cloudy_appearance ? true : false,
                lumpy_appearance ? true : false,
                water_and_fat ? true : false,
                smell_bad ? true : false,
                smell_not_fresh ? true : false,
                abnormal_color ? true : false
            ]
        );

        // Instead of redirecting directly, send back a success status
        res.redirect('/display-demo'); // Redirect to the display page
    } catch (error) {
        console.error('Error inserting data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
