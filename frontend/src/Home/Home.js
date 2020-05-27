import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: null,
      categories:
      {
        'Applied': { name: 'Applied', items: [] },
        'Phone Screen': { name: 'Phone Screen', items: [] },
        'On Site': { name: 'On Site', items: [] },
        'Offered': { name: 'Offered', items: [] },
        'Accepted': { name: 'Accepted', items: [] },
        'Rejected': { name: 'Rejected', items: [] },
      }
    };
  }

  async componentDidMount() {
    const candidates = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      candidates,
      categories: {
        ...this.state.categories, 
        'Applied': { ...this.state.categories['Applied'], items: candidates }
      }
    });
  }

  onDragEnd(result, columns) {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(columns[source.droppableId].name);
    console.log(columns[destination.droppableId].name);
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = this.state.categories[source.droppableId];
      const destColumn = this.state.categories[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log(sourceItems);
      console.log(destItems);
      this.setState({
        categories: {
          ...this.state.categories,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        }

      })
    } else {
      const column = this.state.categories[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      this.setState({
        categories: {
          ...this.state.categories,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        }

      });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={result => this.onDragEnd(result, this.state.categories)}>
          {Object.entries(this.state.categories).map(([id, column]) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div {...provided.droppableProps} ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "#78C2AD" : 'lightgrey', padding: 4, width: 250, minHeight: 500
                          }}>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <Link to={`/candidate/${item.id}`}>
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none', padding: 16, margin: '0 0 8px 0', minHeight: '50px', backgroundColor: snapshot.isDragging ? '#517559' : '#69b56a',
                                        color: 'white', ...provided.draggableProps.style
                                      }}>
                                      
                                        {item.name}
                                      
                                    </div>
                                    </Link>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    )
  }
}

export default Home;