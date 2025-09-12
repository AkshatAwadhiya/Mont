import Airtable from "airtable";

const apiKey = import.meta.env.AIRTABLE_API_KEY;
const baseId = import.meta.env.AIRTABLE_ID;

const montBase = new Airtable({ apiKey: apiKey }).base(baseId);

export default montBase;
