import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import axios from 'axios'

const update = require('immutability-helper');


class App extends Component {

  constructor() {
    super()
    this.state = {
      cards: []
    }
  }

  componentDidMount(){
    axios.get('http://www.splashbase.co/api/v1/images/search?query=cars')
    .then((resp)=>this.setState({cards: resp.data.images})) 
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
    console.log(this.state.cards)
    return (
      <div className="App">
        <div className="App-intro">

          {this.state.cards.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              id={card.id}
              url={card.url}
              moveCard={this.moveCard}
            />
          ))}

        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
