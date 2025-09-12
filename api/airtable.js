import Airtable from 'airtable';

export default async function handler(req, res) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_ID;
  if (!apiKey || !baseId) {
    return res.status(500).json({ error: 'Airtable API key or Base ID not set' });
  }

  const base = new Airtable({ apiKey }).base(baseId);

  try {
    const records = await base('Table1').select({ maxRecords: 5 }).firstPage();
    const data = records.map(record => ({ id: record.id, ...record.fields }));
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}