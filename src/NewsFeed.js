import React, { useState } from 'react'
import content from "./content.js";
import { Card, Button } from 'react-bootstrap'
import { InputGroup, FormControl, Form } from 'react-bootstrap'

// Dropdown filter
const NewsFeed = () => {
    const [contentList, setContentList] = useState(content);
    const [source, setSource] = useState();

    const handleDropList = (e) => {
        setSource(e.target.value);
        if (e.target.value === 'all') {
            setContentList(content)
        } else {
            const contentLists = content.filter(function (item) {
                return item.source.id === e.target.value;
            });
            setContentList(contentLists)
        }
    }
    // Search filter
    const handleSearch = (e) => {
        if (e.target.value !== '') {
            if (source === 'all') {

                const serachData = content.filter(function (item) {
                    return item.title.toLowerCase().includes(e.target.value)
                });
                setContentList(serachData);
            } else {
                const sourceFilter = content.filter(function (item) {
                    return item.source.id === source;
                });
                const serachData = sourceFilter.filter(function (item) {
                    return item.title.toLowerCase().includes(e.target.value)
                });
                setContentList(serachData);
            }
        }

    }

    return (
        <div className="row" style={styles.div}>
            <div className="col-sm-12" style={styles.divs}>
                <InputGroup style={styles.texts}>
                    <FormControl
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        style={styles.selec}
                        onChange={handleSearch}
                    />
                    <Form.Group>
                        <Form.Control onChange={handleDropList} size="md" as="select">
                            <option value="all">Select Source</option>
                            <option value="bloomberg">Bloomberg</option>
                            <option value="reuters">Reuters</option>
                            <option value="cnbc">CNBC</option>
                        </Form.Control>
                    </Form.Group>

                </InputGroup>

            </div>

            {
                contentList.length > 0 ? (
                    contentList.map((item) => {
                        return (
                            <div className="col-sm-3" style={{ padding: '20px' }}>
                                <Card style={styles.card}>
                                    <Card.Img variant="top" src={item.imageUrl} style={{ width: '286px', height: '150px' }} />
                                    <Card.Body>
                                        <Card.Title className="sortdest">{item.title}</Card.Title>
                                        <Card.Text className="sortdes">
                                            {item.description}
                                        </Card.Text>
                                        <Button variant="primary" href={item.url}>Read More</Button>
                                    </Card.Body>
                                </Card>
                            </div>

                        )
                    })) : <div className="w-100"> <p style={styles.fnd}> Data not found </p> </div>
            }

        </div >
    )
}

const styles = {
    texts: {
        width: '415px',
        height: '30px',
        float: 'right',
        padding: '15px',
        marginLeft: '-2px'
    },
    divs: {
        backgroundColor: '#e8e8e8',
        height: '80px'
    },
    fnd: {
        fontSize: '40px',
        textAlign: 'center',
        marginTop: '50px'
    },
    card: {
        width: '18rem',
        height: '365px'
    },
    div: {
        marginRight: '0px'
    },
    selec: {
        borderLeftWidth: '0px',
        float: 'right',
    }
}

export default NewsFeed
