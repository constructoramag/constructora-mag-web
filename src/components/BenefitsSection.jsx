import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './BenefitsSection.css';

const benefits = [
    {
        icon: 'request_quote',
        title: 'Presupuestos transparentes',
        description: 'Sin costos ocultos ni sorpresas de última hora. Claridad desde el día uno.'
    },
    {
        icon: 'schedule',
        title: 'Cumplimiento de plazos',
        description: 'Sabemos que tu tiempo es oro. Entregamos las obras en la fecha acordada.'
    },
    {
        icon: 'support_agent',
        title: 'Atención personalizada',
        description: 'Te acompañamos y asesoramos en cada paso de tu proyecto, de principio a fin.'
    },
    {
        icon: 'diamond',
        title: 'Materiales de calidad',
        description: 'Solo trabajamos con insumos y proveedores de primera línea para asegurar durabilidad.'
    },
    {
        icon: 'engineering',
        title: 'Equipo especializado',
        description: 'Maestros calificados y profesionales apasionados por la excelencia.'
    },
    {
        icon: 'verified_user',
        title: 'Garantía de trabajos',
        description: 'Respaldamos nuestra mano de obra. Tu tranquilidad es nuestro principal objetivo.'
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

function BenefitsSection() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    // Mapear el progreso del scroll a través de la sección
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 65%", "end 35%"] // Empieza cuando el top de la sección llega al 65% del viewport
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest <= 0 || latest >= 1) {
            setActiveIndex(-1); // Apagar si está fuera de la zona de enfoque
        } else {
            // Dividir el progreso entre la cantidad de tarjetas
            const index = Math.floor(latest * benefits.length);
            setActiveIndex(Math.min(benefits.length - 1, Math.max(0, index)));
        }
    });

    return (
        <section ref={sectionRef} id="beneficios" className="benefits section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Nuestro Compromiso</span>
                    <h2 className="section-title">Por qué elegir MAG</h2>
                    <p className="section-subtitle">
                        Construimos confianza basada en hechos y profesionalismo. 
                        Nuestra metodología asegura el éxito de tu proyecto.
                    </p>
                </div>

                <motion.div 
                    className="benefits-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {benefits.map((benefit, i) => {
                        const isActive = i === activeIndex;

                        return (
                            <motion.div 
                                variants={itemVariants} 
                                key={i} 
                                className={`benefit-card ${isActive ? 'benefit-card--active' : ''}`}
                            >
                                <div className="benefit-icon">
                                    <span className="material-symbols-outlined">{benefit.icon}</span>
                                </div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-desc">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default BenefitsSection;
