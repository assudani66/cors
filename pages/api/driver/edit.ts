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
    const requestBody = req.body

    const editedDriverRequest = await supabase.from('driver').upsert({
      id:requestQuery.driverid,
      name: requestBody.name,
      email:requestBody.email,
      assigned_cab:requestBody.assigned_cab,
      phone_number:requestBody.phone_number,
      rating:requestBody.rating
    }).eq('id',requestQuery.driverid)

    const {data} = await supabase.from('driver').select().eq('id',requestQuery.driverid)
   
    res.json({data})
  }
  
  module.exports = allowCors(handler)
  