import { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../Features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [SelectedActivity, setSelectedActitity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];

      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActitity(activities.find(x => x.id === id));
  }

  //handle cancellation for form process
  const handleCancelActivity = () => {
    setSelectedActitity(undefined);
  }

  //handle form Open
  const handleForOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditmode(true);
  }

  //handle formclose
  const handleFormClose = () => {
    setEditmode(false);
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditmode(false);
        setSelectedActitity(activity);
        setSubmitting(false);
      })
    } else {

      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditmode(false);
        setSelectedActitity(activity);
        setSubmitting(false);
      })
    }

    /*
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditmode(false);
    setSelectedActitity(activity);
    */
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar formOpen={handleForOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={SelectedActivity}
          handleSelectActivity={handleSelectActivity}
          handleCancelActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleForOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </ >
  );
}
export default App;
