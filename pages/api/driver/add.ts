import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../../services/supabaseClient"
import { error } from "console"

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
    const {data,error} = await supabase.from('driver').insert({
        name: requestBody.name,
        email:requestBody.email,
        phone_number:requestBody.phone_number,
        rating:requestBody.rating
    })
    // console.log(error)

    res.json({"message":'created driver'})
  }
  
  module.exports = allowCors(handler)
  