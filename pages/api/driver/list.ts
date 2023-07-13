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

    if(requestQuery.driverid){
      console.log(req.query ,"exists")
      try {
        const {data,error} = await supabase
        .from('driver')
        .select()
        .eq("id",requestQuery.driverid)
        res.json({data})

        if(error) throw error
    } catch (error) {
        res.json({message:error})
        console.error(error)
    }
  
    }else{
      try {
          const {data,error} = await supabase
          .from('driver')
          .select()
          .order('created_at')

          // const {data} = await supabase.from()
  
          res.json({data})
  
          if(error) throw error
      } catch (error) {
          res.json({message:error})
          console.error(error)
      }
    }
  }
  
  module.exports = allowCors(handler)
  