import React from "react";
import { Modal} from "@material-ui/core";

import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App extends React.Component {
  state = { images: [],openModal:false,randomImage:'' };

  onSearchSubmit = async (term) => {
    const res = await unsplash.get("/search/photos", {
      params: { query: term , per_page: 20 },
    });
    this.setState({ images: res.data.results });
  };
  onSearchRandom = async () => {
    const res = await unsplash.get("/photos/random");
    this.setState({randomImage:res.data.urls.small, openModal:true});
    console.log(this.state.randomImage)
  };

  render() {
    return (
      <div>
        <button className="ui right floated button" style={{marginRight:'10%',backgroundColor:'#00171F',color:'white'}} onClick={this.onSearchRandom}>or get a random image</button>
      <div className="ui container" style={{ marginTop: 10 }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images}/>
      </div>
      <Modal 
      
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
        >
          <div
            className="ui middle aligned center aligned grid"
            style={{marginTop:'10%',marginLeft:'40%',outline:'none', height:500,width:500}}
          >
            <img style={{height:800,width:800}} src={this.state.randomImage}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
