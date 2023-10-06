import { useState } from 'react'
import './App.css'
import Grid from './components/grid/grid'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Image } from './components/grid/types'
import Modal from './components/ui/modal/modal'
import DroppableOptions from './components/droppable-options/droppable-options'
import DraggableOptions from './components/draggable-options/draggable-options'

interface Selected {
  index: number;
  type: "droppable" | "draggable";
}

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
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Selected | null>(null);

  const handleClick = (index: number, type: "droppable" | "draggable") => {
    setSelected({
      index,
      type
    });
  }

  return (
    <DndProvider
      backend={HTML5Backend}
    >
      <aside>
        {selected !== null && selected.type === "droppable" && <DroppableOptions />}
        {selected !== null && selected.type === "draggable" && <DraggableOptions />}
      </aside>
      <main>
      <Grid 
        onClick={handleClick}
        onSwap={(images) => setImages(images)}
        images={images}
        selected={selected?.index}
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
              },
              {
                position: {
                  x: 0,
                  y: 6
                },
                size: {
                  x: 8,
                  y: 10
                }
              }
            ] 
          }
        }
        />
      </main>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        Hola mundo
      </Modal>
    </DndProvider>
  )
}

export default App
