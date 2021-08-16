import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard />
      </Container>
    </ >
  );
}
export default observer(App);




/*
Loading list of activities

agent.Activities.list().then(response => {
      let activities: Activity[] = [];

      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })


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


    const [SelectedActivity, setSelectedActitity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);

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
  }

    const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }
*/