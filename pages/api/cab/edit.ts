import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../../services/supabaseClient"

const allowCors = (fn:any) => async (req:NextApiRequest, res:any) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = async(req:NextApiRequest, res:NextApiResponse) => {
    const requestQuery = req.query
    
    const nousedCall = await supabase.from('cab').upsert({
        id:requestQuery.cabid,
        model_number: 'i40',
        color:"grt",
    }).eq('id',requestQuery.cabid)

    const {data} = await supabase.from('cab').select().eq('id',requestQuery.cabid)
   
    res.json({data})
  }
  
  module.exports = allowCors(handler)
  