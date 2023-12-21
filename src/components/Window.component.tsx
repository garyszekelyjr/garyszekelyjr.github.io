import { PropsWithChildren, MutableRefObject, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion'

interface Props extends PropsWithChildren {
    window: string
    constraints: MutableRefObject<null>,
    closeApplication: (name: string) => void
}

function Window({ window, constraints, closeApplication, children }: Props) {
    const [fullscreen, setFullscreen] = useState(false);

    const animationControls = useAnimationControls();

    return (
        <motion.div drag dragConstraints={constraints} dragElastic={false} dragMomentum={false} animate={animationControls} className="position-absolute d-flex flex-column bg-dark border z-2" style={fullscreen ? { width: '100%', height: '100%' } : { width: '50%', height: '75%' }}>
            <div className='navbar bg-body-secondary'>
                <div className='container-fluid'>
                    <span className='display-6'>{window}</span>
                    <div>
                        <button className='btn btn-success me-1'>
                            <i className='bi bi-dash' />
                        </button>
                        <button onClick={() => {
                            animationControls.set({ x: 0, y: 0 });
                            setFullscreen(!fullscreen);
                        }} className='btn btn-warning me-1'>
                            <i className={`bi bi-${fullscreen ? 'fullscreen-exit' : 'fullscreen'}`} />
                        </button>
                        <button onClick={() => { closeApplication(window); }} className='btn btn-danger'>
                            <i className='bi bi-x' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-fill container-fluid overflow-auto'>
                {children}
            </div>
        </motion.div>
    );
}

export default Window;