import { useSiteContent } from '../hooks/useSiteContent';
import './TrustBar.css';

function TrustBar() {
    const { stats } = useSiteContent();

    const statItems = [
        { value: stats?.years ?? '+10', label: 'Años' },
        { value: stats?.projects ?? '+250', label: 'Proyectos' },
        { value: stats?.satisfaction ?? '98%', label: 'Clientes satisfechos' },
        { value: stats?.guarantee ?? '100%', label: 'Garantía' },
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
