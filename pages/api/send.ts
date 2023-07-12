import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle POST request
    const requestedHeader = req.headers['requested-header']; // Replace 'requested-header' with the actual header you want to retrieve
    
    if (requestedHeader) {
      res.status(200).json({ header: requestedHeader });
    } else {
      res.status(400).json({ error: 'Requested header not found' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
