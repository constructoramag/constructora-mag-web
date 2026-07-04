import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';
import './TrustBar.css';

// Componente para animar el contador numérico progresivamente
function AnimatedCounter({ value }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (!isInView) return;
        
        const numericMatch = value.match(/\d+/);
        if (!numericMatch) {
            setDisplayValue(value);
            return;
        }

        const targetNumber = parseInt(numericMatch[0], 10);
        const prefix = value.startsWith('+') ? '+' : '';
        const suffix = value.endsWith('%') ? '%' : '';
        
        const controls = animate(0, targetNumber, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(currentValue) {
                setDisplayValue(prefix + Math.round(currentValue) + suffix);
            }
        });

        return () => controls.stop();
    }, [isInView, value]);

    return <span ref={ref}>{displayValue}</span>;
}

function TrustBar() {
    const { stats } = useSiteContent();

    const statItems = [
        { value: stats?.years ?? '+10', label: 'Años de Experiencia' },
        { value: stats?.projects ?? '+250', label: 'Proyectos Entregados' },
        { value: stats?.satisfaction ?? '98%', label: 'Clientes Satisfechos' },
        { value: stats?.guarantee ?? '100%', label: 'Trabajos Garantizados' },
    ];

    return (
        <div className="trust-bar container">
            <div className="trust-bar__grid">
                {statItems.map((stat, index) => (
                    <motion.div 
                        key={stat.label} 
                        className="trust-bar__item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="trust-bar__value">
                            <AnimatedCounter value={stat.value} />
                        </span>
                        <span className="trust-bar__label">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default TrustBar;
