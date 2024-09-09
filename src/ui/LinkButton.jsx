import { Link, useNavigate } from "react-router-dom"

const LinkButton = ({children, to}) => {
    const navigate = useNavigate()
    if(to === '-1'){
        return <Link onClick={()=>navigate(-1)} className="text-blue-500 text-sm hover:text-blue-600 hover:underline">{children}</Link>
    }
  return (
    <Link to="/menu" className='text-blue-500 text-sm hover:text-blue-600 hover:underline' >{children}</Link>
  )
}

export default LinkButton
