import React from "react";

class Meme extends React.Component {
  constructor(){
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes[0])
            this.setState({ allMemeImgs: memes })
        })
}

  handleChange = (event) => {
    const {name,value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randomMemeImg = this.state.allMemeImgs[randNum].url
    this.setState({
      randomImg: randomMemeImg
    })
  }

  render(){
    return (
      <div>
        <form className ="meme-form" onSubmit={this.handleSubmit}>
          <input 
            text="text"
            name="topText"
            placeholder="Top Text"
            value= {this.state.topText}
            onChange= {this.handleChange}
            />
            <input 
            text="text"
            name="bottomText"
            placeholder="Bottom Text"
            value= {this.state.bottomText}
            onChange= {this.handleChange}
            />
            <button>Gen</button>
        </form>
        <div className= "meme">
          <img src={this.state.randomImg} alt=""/>
    <h2 className="top">{this.state.topText}</h2>
    <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}
export default Meme;