import React from "react";

const GALLERY_API = 'https://jsonplaceholder.typicode.com/photos';

class GalleryBlock extends React.Component{

    constructor(props) {
        super(props);
        this.galleryBlock = React.createRef();
        this.state = {
            error: null,
            isLoaded: false,
            gallery: [],
            galleryShow: [],
        };
    }

    componentDidMount() {
        fetch(GALLERY_API)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        gallery: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    galleryOut(galleryArg) {
        let showLength = this.state.galleryShow.length;
        for (let i = showLength; i < showLength + 12; i++) {
            this.state.galleryShow.push(galleryArg[i]);
        }
    }


    render() {
        const {error, isLoaded, gallery, galleryShow} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        }

        else if (!isLoaded) {
            return (
                <div>Loading...</div>
            )
        }

        else {
            this.galleryOut(gallery);

            return (
                galleryShow.map(galleryItem => (
                    <div ref={this.galleryBlock} className={'gallery-block'}>
                        <div className="image-block-lg">
                            <img src={galleryItem.url} alt="Image Description" width={''} height={''}/>
                        </div>
                        <div className="image-block-sm">
                            <img src={galleryItem.thumbnailUrl} alt="Image Description" width={''} height={''}/>
                            <img src={galleryItem.thumbnailUrl} alt="Image Description" width={''} height={''}/>
                        </div>
                    </div>
                ))
            );
        }
    }
}

export default GalleryBlock;