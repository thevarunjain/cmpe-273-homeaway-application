import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';
import axios from "axios";



class AddPhotos extends Component{


    constructor(props) {
        super(props);

        this.state = {
            files: [],
        };

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave = (e) =>
    {
        this.props.setPhotos(this.state.files);
    }

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    }

    onChoose = (e) => {
        this.setState({
            files: this.state.files.concat(e.target.files[0]),
        });
    }

    render() {
        const previewStyle = {
            display: 'inline',
            width: 10,
            height: 10,
        };



        return (
            <div className="app">
                <Dropzone accept="image/*" onDrop={this.onPreviewDrop} name="propPhotos">
                    Drop an image, get a preview!
                </Dropzone>
                <input type="file" className="form-control-file" name="selectedFile" onChange={this.onChoose} />
                {this.state.files.length > 0 &&
                <Fragment> 
                    <h3>Previews</h3>
                    {this.state.files.map((file) => (
                        <img
                            alt="Preview"
                            key={file.preview}
                            src={file.preview}
                            style={previewStyle}
                        />
                    ))}
                </Fragment>
                }

                <button type="button" className="btn btn-primary" onClick={ (e) => this.handleSave(e)}>Save</button>
            </div>
        );
    }

}

export default AddPhotos;