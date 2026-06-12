import React from 'react';
import { useTeam } from '../hooks/useTeam';
import { motion } from 'framer-motion';
import './TeamSection.css';

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
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

const TeamSection = () => {
    const { team, loading } = useTeam();

    if (loading) {
        return (
            <section className="section team-section" id="equipo">
                <div className="container">
                    <div className="section-header">
                        <span className="section-eyebrow">Nuestro Equipo</span>
                        <h2 className="section-title">El Grupo Familiar</h2>
                    </div>
                    <div className="team-grid">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="team-card skeleton" style={{height: '350px'}}></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!team || team.length === 0) return null;

    return (
        <section className="section team-section" id="equipo">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Nuestro Equipo</span>
                    <h2 className="section-title">El Grupo Familiar</h2>
                    <p className="section-subtitle">
                        Conoce a los profesionales apasionados detrás de cada proyecto, asegurando calidad y confianza en cada obra que realizamos.
                    </p>
                </div>

                <motion.div 
                    className="team-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {team.map((member) => (
                        <motion.div variants={itemVariants} key={member._id} className="team-card">
                            <div className="team-image-wrapper">
                                <img src={member.imageUrl} alt={member.name} className="team-image" />
                                <div className="team-overlay"></div>
                            </div>
                            <div className="team-info">
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                {member.bio && <p className="team-bio">{member.bio}</p>}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;
