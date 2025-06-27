import fetch from 'node-fetch';

const API_URL = 'https://api.rustmagic.com/api/affiliates-data/users';
const API_KEY = '00c5bb44-21d2-40e1-81da-8d64733de6a1';

export default async function handler(req, res) {
  try {
    const { fromTime, toTime } = req.query;

    // Формуємо URL з параметрами
    const url = new URL(API_URL);
    if (fromTime) url.searchParams.append('fromTime', fromTime);
    if (toTime) url.searchParams.append('toTime', toTime);

    // Робимо запит до RustMagic API
    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch data from RustMagic API' });
      return;
    }

    const data = await response.json();

    // Відправляємо назад клієнту
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}