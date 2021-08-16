import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityDetail from '../Details/ActivityDetail'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


 const ActivityDashboard = () => {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetail />
                }
                {editMode &&
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
};
export default observer (ActivityDashboard);


/*

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectActivity: (id: string) => void;
    handleCancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
 */
