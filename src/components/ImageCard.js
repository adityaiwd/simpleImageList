import React from "react";
import { Modal} from "@material-ui/core";
import unsplash from "../api/unsplash";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const top = 50 + rand();
const left = 50 + rand();
class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  state = {
    spans: 0,
    openModal: false,
    imageModal: ''
  };

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans });
  };

  handleOpen = async (id) => {
    const res = await unsplash.get(`/photos/${id}`, {
      params: {id:id},
    });
      this.setState({ openModal:true,imageModal: res.data.urls.regular});
  };
  

  

  render() {
    const { description, urls, id } = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img
          ref={this.imageRef}
          alt={description}
          src={urls.regular}
          onClick={() => this.setState(this.handleOpen(id))}
        />
        <Modal
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
        >
          <div
            className="ui middle aligned center aligned grid"
            style={{marginTop:'10%',marginLeft:'40%',outline:'none', height:500,width:500}}
          >
            <img style={{height:800,width:800}} src={this.state.imageModal}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ImageCard;
