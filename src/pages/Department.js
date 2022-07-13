import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import PaintingCard from '../components/PaintingCard';
import { Link, useNavigate } from 'react-router-dom'



function Department() {

  const [randomPainting, setRandomPainting] = useState({})
  const [error, setError] = useState()

  const history = useNavigate()
  const id = useParams().id

  useEffect(()=>{
      fetchRandomPaintingFromDepartment(id)
  },[history])

  const fetchRandomPaintingFromDepartment = async (id) => {
      const randomPaintingResponse = await fetch(`http://localhost:3000/departments/${id}`)
      const randomPaintingBody = await randomPaintingResponse.json()
      if(Object.hasOwn(randomPaintingBody,'error')){
        setError(randomPaintingBody.error)
      }else{
        setRandomPainting(randomPaintingBody)
      }
  }


  return(
    <Container>
    <Row className="d-flex justify-content-md-around pt-5">
      {Object.keys(randomPainting).length > 0 ?
      <>
      <h2 className="text-center">
        A random painting from the <Link to={`/department/${randomPainting.department.departmentId}`}>{randomPainting.department.displayName}</Link> department
      </h2>
     <PaintingCard painting={randomPainting?.painting}/>
     </>
      : <h2 className="text-center">
        {error}
      </h2> }
    </Row>
  </Container>

  )


  

}

export default Department;
