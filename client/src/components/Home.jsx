import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/usePropContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/PropertyDetails'
import WorkoutForm from '../components/PropertyForm'

const Home = () => {
  const {workouts, dispatch} = usePropertiesContext()
  const {user} = useAuthContext()

  useEffect(() => {
   
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home