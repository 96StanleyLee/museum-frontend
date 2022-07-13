import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import PaintingCard from '../components/PaintingCard';
import { Link, useNavigate } from 'react-router-dom'



function Department() {

  const [randomPainting, setRandomPainting] = useState({})
  const [error, setError] = useState({})

  const history = useNavigate()
  const id = useParams().id

  useEffect(()=>{
      setRandomPainting({})
      fetchRandomPaintingFromDepartment(id)
  },[history])

  const fetchRandomPaintingFromDepartment = async (id) => {
      const randomPaintingResponse = await fetch(`http://localhost:3000/departments/${id}`)
      const randomPaintingBody = await randomPaintingResponse.json()
      if(Object.hasOwn(randomPaintingBody,'error')){
        setError(randomPaintingBody)
      }else{
        setRandomPainting(randomPaintingBody)
      }
  }


  return(
    <Container>
    <Row className="d-flex justify-content-md-around pt-5">
      {Object.keys(error).length == 0 ?
      <>
      <h2 className="text-center">
        A random painting from the <b>{randomPainting?.department?.displayName}</b> department
      </h2>
     <PaintingCard painting={randomPainting?.painting}/>
     </>
      : <h2 className="text-center">
        {error.error}
      </h2> }
    </Row>
  </Container>

  )


  

}

export default Department;
