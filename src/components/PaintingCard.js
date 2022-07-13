import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

function PaintingCard({painting}) {

  const checkPainting = (painting) => {
    return (painting !== undefined) && (Object.keys(painting).length > 0)
  }

  const checkPaintingImage = (src) => {
    return src === ''
  }


  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body className='d-flex flex-column'>
      {checkPainting(painting) ? 
        <>
        {checkPaintingImage(painting.primaryImage) ? 
        <h2>No image available</h2> :
        <Card.Img variant="top" src={painting.primaryImage} />
        }
        <Card.Title>{painting.title}</Card.Title>
          <Card.Text>
            {painting.artistDisplayName}
          </Card.Text>
        </> :       
        <Spinner className='align-self-center' animation='border' size='lg'/>
      }
      </Card.Body>
    </Card>
  );
}

export default PaintingCard;