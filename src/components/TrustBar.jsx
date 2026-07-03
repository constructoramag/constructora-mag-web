import { useSiteContent } from '../hooks/useSiteContent';
import './TrustBar.css';

function TrustBar() {
    const { stats } = useSiteContent();

    const statItems = [
        { value: stats?.years ?? '+10', label: 'Años de experiencia' },
        { value: stats?.projects ?? '+150', label: 'Proyectos realizados' },
        { value: stats?.satisfaction ?? '100%', label: 'Clientes satisfechos' },
        { value: stats?.coverage ?? 'RM', label: 'Región Metropolitana' },
    ];

    return (
        <div className="trust-bar container">
            <div className="trust-bar__grid">
                {statItems.map((stat) => (
                    <div key={stat.label} className="trust-bar__item">
                        <span className="trust-bar__value">{stat.value}</span>
                        <span className="trust-bar__label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrustBar;
