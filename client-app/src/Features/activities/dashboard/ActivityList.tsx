import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    handleSelectedActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityList = ({ activities, handleSelectedActivity, deleteActivity, submitting }: Props) => {

    const [target, setTarget] = useState('');

    const handleButtonDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {
                    activities.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>

                                <Item.Extra>
                                    <Button
                                        onClick={() => handleSelectedActivity(activity.id)}
                                        floated='right'
                                        content='View'
                                        color='blue'
                                    />
                                    <Button
                                        name={activity.id}
                                        loading={submitting && target === activity.id}
                                        onClick={(e) => handleButtonDelete(e, activity.id)}
                                        floated='right'
                                        content='Delete'
                                        color='red'
                                    />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>
        </Segment>
    )
}

export default ActivityList;