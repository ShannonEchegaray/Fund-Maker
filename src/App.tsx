import { useState } from 'react'
import './App.css'
import Grid from './components/grid/grid'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Image } from './components/grid/types'

function App() {

  const [images, setImages] = useState<Image[]>([
    {
      src: "Hola",
      text: "eaea"
    },
    {
      src: "Adios",
      text: "aeae"
    }
  ])

  const handleDoubleClick = (index: number) => {
    console.log("The content clicked is:", index);
  }

  return (
    <DndProvider
      backend={HTML5Backend}
    >
      <Grid 
        onContainerDoubleClick = {handleDoubleClick}
        onSwap={(images) => setImages(images)}
        images={images} 
        layout={
          { 
            size: {x: 8, y: 16},
            content: [
              {
                position: {
                  x: 0,
                  y: 0
                },
                size: {
                  x: 2,
                  y: 2
                }
              },
              {
                position: {
                  x: 0,
                  y: 4
                },
                size: {
                  x: 2,
                  y: 2
                }
              },
              {
                position: {
                  x: 0,
                  y: 2
                },
                size: {
                  x: 2,
                  y: 2
                }
              },
              {
                position: {
                  x: 2,
                  y: 0
                },
                size: {
                  x: 6,
                  y: 6
                }
              }
            ] 
          }
        }
      />
    </DndProvider>
  )
}

export default App
