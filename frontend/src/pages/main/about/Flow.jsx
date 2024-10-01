import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 250, y: 0 }, 
    data: { label: 'Home Page' }, 
    style: { 
      width: 150,
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '2', 
    position: { x: 0, y: 100 }, 
    data: { label: 'Forum' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '3', 
    position: { x: 175, y: 100 }, 
    data: { label: 'Learning Bar' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '4', 
    position: { x: 350, y: 100 }, 
    data: { label: 'Newsletter' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '5', 
    position: { x: 525, y: 100 }, 
    data: { label: 'Quiz Calendar' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '6', 
    position: { x: 175, y: 200 }, 
    data: { label: 'Learning Path' }, 
    style: { 
      width: 150,
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '7', 
    position: { x: 175, y: 300 }, 
    data: { label: 'Tools' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #4682B4',
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '8', 
    position: { x: 350, y: 300 }, 
    data: { label: 'Simulation' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #4682B4',
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '9', 
    position: { x: 0, y: 300 }, 
    data: { label: 'News Section' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #4682B4',
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
  { 
    id: '10', 
    position: { x: 525, y: 300 }, 
    data: { label: 'Case Studies' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #4682B4',
      padding: '10px', 
      backgroundColor: 'rgba(173, 216, 230, 0.2)',
      color: '#000'
    }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e1-5', source: '1', target: '5', animated: true },
  { id: 'e3-6', source: '3', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e6-8', source: '6', target: '8', animated: true },
  { id: 'e1-9', source: '1', target: '9', animated: true },
  { id: 'e1-10', source: '1', target: '10', animated: true },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .react-flow__controls,
      .react-flow__logo,
      .react-flow__background {
        display: none !important;
      }
      .react-flow__node {
        background-color: rgba(173, 216, 230, 0.2) !important;
        color: #000 !important;
      }
      .react-flow__edge {
        stroke: #4682B4;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <h1 style={{ paddingLeft: '20px', color: '#4682B4', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Website Flow</h1>
      <div style={{ height: '600px', width: '100%', backgroundColor: '#E6F3FF', position: 'relative', overflow: 'auto' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          panOnScroll={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          elementsSelectable={false}
          nodesDraggable={false}
          interactable={false}
        >
          <Background color="#4682B4" />
        </ReactFlow>
      </div>
    </>
  );
}

export default Flow;