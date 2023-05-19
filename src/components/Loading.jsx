import { SpinnerDotted } from 'spinners-react';

export const Loading = () => {
    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <SpinnerDotted size={100} />
        </div>
    )
}
