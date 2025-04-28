import { useEffect } from 'react';
import BackButton from '../components/BackButton';
import PlanCard from '../components/PlanCard';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { GetPlans } from '../features/plans/PlansSlice';

const ViewPlans = () => {
    const { user } = useSelector((state) => state.Auth);
    const { Plans, isLoading, isError, message } = useSelector((state) => state.Plan);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(GetPlans(user.id));
        }
        if (isError && message) {
            toast.error(message);
        }
    }, [user, isError, message]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-[90vh] p-10">
            <BackButton url="/" />
            <h1 className="text-center text-2xl font-bold my-5 text-white">
                All Your Fitness Plans
            </h1>
            <div className="border p-5 rounded-md grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Map through plans */}
                {Plans && Plans.length > 0 ? (
                    Plans.map((plan) => <PlanCard key={plan._id} plan={plan} />)
                ) : (
                    <p className="text-center text-white">No Plans Found</p>
                )}
            </div>
        </div>
    );
};

export default ViewPlans;
