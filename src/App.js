import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');

class App extends Component {
  state = {
    cards: [
      {
        id: 1,
        text: '1',
      },
      {
        id: 2,
        text: '2',
      },
      {
        id: 3,
        text: '3',
      },
      {
        id: 4,
        text: '4',
      },
      {
        id: 5,
        text:'5',
      },
      {
        id: 6,
        text: '6',
      },
      {
        id: 7,
        text: '7',
      },
    ],
  }


  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">

            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              />
            ))}

        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
