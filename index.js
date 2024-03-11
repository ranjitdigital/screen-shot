// server.js

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 4000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Route to capture screenshot
app.get('/capture-screenshot', async (req, res) => {
  const url = req.query.url;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Capture screenshot of the entire page
    const screenshot = await page.screenshot({ fullPage: true });

    // Close browser
    await browser.close();

    // Send back the screenshot as image/png
    res.contentType('image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Error capturing screenshot');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

