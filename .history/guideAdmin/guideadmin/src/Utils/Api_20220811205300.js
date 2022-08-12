import { resolveComponentProps } from "@mui/base"
import api from "./request.js"

export const getArticleList = () =>{
  api.get('/api/article', {'word':'', 'page':1}).then((res)=>{
    resolveComponentProps() res.data
  })
}

