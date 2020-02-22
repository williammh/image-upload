import React, { Component } from 'react';
import Axios from 'axios';

export class ImageUpload extends Component {
    getAxios = () => {
        Axios.get("https://jsonplaceholder.typicode.com/todos/1")
            .then(response => {console.log(response)});
    }
    getFetch = () => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(response => response.json())
            .then(data => console.log(data));
    }
    AJAXSubmit = async (oFormElement) => {
        console.log("fire away");
        console.log(oFormElement);
        var resultElement = oFormElement.elements.namedItem("result");
        const formData = new FormData(oFormElement);

        try {
            const response = await fetch(oFormElement.action, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                window.location.href = '/';
            }
            resultElement.value = 'Result: ' + response.status + ' ' + 
            response.statusText;
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    render() {
        return (
            <div>
                <h1>my component</h1>
                <button onClick={this.getFetch}>get with Fetch</button>
                <button onClick={this.getAxios}>get with Axios</button>
                {/* 

                    copied from
                    https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-3.1
                
                */}
                <form
                    action="BufferedSingleFileUploadPhysical/?handler=Upload" 
                    encType="multipart/form-data"
                    onSubmit={() => {this.AJAXSubmit(this)}} 
                    method="post"
                >
                    <dl>
                        <dt>
                            <label for="FileUpload_FormFile">File</label>
                        </dt>
                        <dd>
                            <input id="FileUpload_FormFile" type="file" 
                                name="FileUpload.FormFile" />
                        </dd>
                    </dl>

                    <input class="btn" type="submit" value="Upload" />

                    <div style={{marginTop:"15px"}}>
                        <output name="result"></output>
                    </div>
                </form>
            </div>
        )
    }
}