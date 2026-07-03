import { motion } from 'framer-motion';
import './WorkProcessSection.css';

const processSteps = [
    {
        number: '01',
        title: 'Evaluación y Presupuesto',
        description: 'Visitamos el lugar, escuchamos tus necesidades y elaboramos un presupuesto detallado, sin costos ocultos.'
    },
    {
        number: '02',
        title: 'Diseño y Planificación',
        description: 'Definimos los plazos, seleccionamos materiales de calidad y estructuramos un cronograma claro de trabajo.'
    },
    {
        number: '03',
        title: 'Ejecución Profesional',
        description: 'Nuestro equipo especializado realiza la obra manteniendo el orden, la limpieza y la supervisión constante.'
    },
    {
        number: '04',
        title: 'Entrega Garantizada',
        description: 'Revisamos cada detalle contigo. Entregamos la obra en la fecha acordada y con nuestra garantía de calidad.'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

function WorkProcessSection() {
    return (
        <section id="proceso" className="work-process section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Sin Improvisaciones</span>
                    <h2 className="section-title">Nuestro Proceso de Trabajo</h2>
                    <p className="section-subtitle">
                        Una metodología comprobada para que tu proyecto fluya sin estrés, cumpliendo plazos y superando expectativas.
                    </p>
                </div>

                <motion.div 
                    className="process-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {processSteps.map((step, index) => (
                        <motion.div variants={itemVariants} key={step.number} className="process-card">
                            <div className="process-number">{step.number}</div>
                            <h3 className="process-title">{step.title}</h3>
                            <p className="process-desc">{step.description}</p>
                            
                            {/* Conector visual (flecha) excepto en el último */}
                            {index !== processSteps.length - 1 && (
                                <div className="process-connector">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default WorkProcessSection;
