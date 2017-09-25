import React, { Component } from 'react';
import FileReaderInput from 'react-file-reader-input';
import { createHashHistory } from 'history';

class UploadTopics extends Component {
    handleChange = (e, results) => {
        results.forEach(result => {
            const [e, file] = result;
            const reader = new FileReader();
            reader.onload = () => {
                fetch('/api/upload-topics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `data=${encodeURIComponent(e.currentTarget.result)}`
                })
                    .then(res => {
                        if (res.status !== 200) {
                            throw res.json();
                        }
                        return res;
                    })
                    .then(resp => {
                        createHashHistory().push('/topic-list');
                        window.location.reload();
                        alert('Topics have been uploaded!');
                    })
                    .catch(resp => resp.then(err => {
                        if (err.code) {
                            console.log(err); // csv file contains duplicates
                        } else {
                            const msg = err.map(e => e.message).join('\n');
                            alert('Malformed csv: ' + msg);
                        }
                    }));

                createHashHistory().push('/topic-list');
            };
            reader.readAsText(file);
        });
    }

    render() {
        return (
            <form>
                <h3 htmlFor="my-file-input">Upload topics as csv file.</h3>
                <h4>Format example:</h4>
                <pre>
                    topic;altName1;altName2;altName3
                </pre>
                <pre>
                    room;room;chamber;apartment<br />
                    hotel;hotel;property;lodge;resort<br />
                    staff;staff;service;personnel;crew;he;she<br />
                    location;location;spot<br />
                    breakfast;breakfast<br />
                    bed;bed;"sleep quality";mattresses;linens<br />
                    food;food;dinner;lunch<br />
                    restaurant;restaurant<br />
                    pool;pool;spa;wellness<br />
                    bar;bar<br />
                    cost;price;bill<br />
                    bathroom;bathroom;shower;lavatory;toilet
                </pre>
                <FileReaderInput as="text" id="my-file-input"
                    onChange={this.handleChange}>
                    <button>Select a file!</button>
                </FileReaderInput>
            </form>
        );
    }
}

export default UploadTopics;