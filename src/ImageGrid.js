import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-grid-gallery';
import Popup from 'reactjs-popup';
import images from './data';
import { Picture } from 'react-responsive-picture';


class ImageGrid extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images.map((item) => {
                return {
                    src: process.env.PUBLIC_URL + item.src,
                    thumbnail: item.thumbnail,
                    thumbnailWidth: item.thumbnailWidth,
                    thumbnailHeight: item.thumbnailHeight,
                    caption: item.caption,
                    itemType: item.itemType,
                }
            }),
            itemTypeImage: null,
            showModal: false,
            searchValue: '',
        };
        this.onClickImg = this.onClickImg.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.searchTextChange = this.searchTextChange.bind(this);
    }

    onClickImg(imgNo) {
        // console.log(this.state.images[imgNo]);
        // console.log(this.state.images[imgNo].itemType);
        if(this.state.images[imgNo].itemType === 'T'){
            this.setState({
                showModal: true,
                itemTypeImage: '/images/trash.jpg'
            });
        } else if(this.state.images[imgNo].itemType === 'C'){
            this.setState({
                showModal: true,
                itemTypeImage: '/images/compost.jpg'
            });
        } else if(this.state.images[imgNo].itemType === 'R'){
            this.setState({
                showModal: true,
                itemTypeImage: '/images/recycle.jpg'
            });
        }else if(this.state.images[imgNo].itemType === 'S'){
            this.setState({
                showModal: true,
                itemTypeImage: '/images/shrug-smiley.png'
            });
        }
    }

    onClickOutside(){
        if(this.state.showModal) this.setState({showModal: false,});
    }

    searchTextChange(event){
        console.log(event.target.value);
        this.setState({searchValue: event.target.value});
    }

    render () {
        let filteredImages = this.state.images.filter( (item) => {
           return item.caption.toLowerCase().includes(this.state.searchValue.toLowerCase());
        });
        let content = (<div></div>);
        if(filteredImages.length > 0){
            content = (
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                    <Gallery
                        images={filteredImages}
                        enableLightbox={false}
                        onClickThumbnail={this.onClickImg}
                        enableImageSelection={false} />
                </div>
            );
        } else {
            content = (
              <div>
                  Not found what you are looking for? Ask the
                  <a href="https://thousandeyes.slack.com/messages/CKERSD7TP">Green Man</a>
              </div>
            );
        }
        return (
            <div onClick={this.onClickOutside}>
                <input type='text' value={this.state.searchValue} onChange={this.searchTextChange}/>
                <div>
                    {content}
                </div>
                <Popup open={this.state.showModal}>
                    <div style={{
                        display: 'block'
                    }}>
                        <img src={this.state.itemTypeImage} alt={'Image goes here'} width={"480"} height={"270"}/>
                    </div>
                </Popup>
            </div>
        );
    }
}

ImageGrid.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.string,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

ImageGrid.defaultProps = {
    images: images
};


export default ImageGrid;