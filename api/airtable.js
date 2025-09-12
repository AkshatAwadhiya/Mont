import Airtable from 'airtable';

export default async function handler(req, res) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_ID;
  if (!apiKey || !baseId) {
    return res.status(500).json({ error: 'Airtable API key or Base ID not set' });
  }

  const base = new Airtable({ apiKey }).base(baseId);

  try {
    if (req.method === 'POST') {
      const { action } = req.body;
      if (action === 'registerUser') {
        const { user } = req.body;
        await base('users').create([
          { fields: user }
        ]);
        return res.status(200).json({ success: true });
      } else if (action === 'deleteUser') {
        const { userId } = req.body;
        await base('users').destroy([userId]);
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ error: 'Unknown action' });
      }
    } else {
      // Default: fetch users (for retrieveDatabase)
      const records = await base('users').select({ maxRecords: 100 }).firstPage();
      const data = records.map(record => ({ id: record.id, ...record.fields }));
      res.status(200).json({ records: data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}