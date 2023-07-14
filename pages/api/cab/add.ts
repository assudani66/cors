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
    const requestBody = req.body
    const addCab = await supabase.from('cab').insert({
      model_number: requestBody.model_number,
      name:requestBody.name,
      registration_number:requestBody.registration_number,
      color:requestBody.color,
    })

    res.json({"message":'create cab'})
  }
  
  module.exports = allowCors(handler)
  