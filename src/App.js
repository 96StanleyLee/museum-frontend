import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'
import PaintingCard from './components/PaintingCard';


function App() {

  const [originalPainting, setOriginalPainting] = useState({})
  const [randomPainting, setRandomPainting] = useState({})

  useEffect(()=>{
    fetchPrimaryPainting()
    fetchRandomPainting()

  },[])

  const fetchPrimaryPainting = async () => {
      const primaryPaintingResponse = await fetch('http://localhost:3000/index')
      const primaryPainting = await primaryPaintingResponse.json()
      setOriginalPainting(primaryPainting)
  }

  const fetchRandomPainting = async () => {
      const randomPaintingResponse = await fetch('http://localhost:3000/random')
      const randomPaintingBody = await randomPaintingResponse.json()
      setRandomPainting(randomPaintingBody)
  }
  
  return(
   <Container>
     <Row className="d-flex justify-content-md-around pt-5">
       <h2 className="text-center">Painting of the century</h2>
      <PaintingCard painting={originalPainting}/>
     </Row>
     <Row className="d-flex justify-content-md-around pt-5">
       {Object.keys(randomPainting).length > 0 ?
       <h2 className="text-center">
         A random painting from the <Link to={`/department/${randomPainting.department.departmentId}`}>{randomPainting.department.displayName}</Link> department
         </h2>
       : '' }
      <PaintingCard painting={randomPainting?.painting}/>
     </Row>
   </Container>
  )


}

export default App;
